const sequelize = require('../db/db_cocktails')
const { Cocktail, CocktailIngredient, Amount, CategoryCocktail, Ingredient } = require('../models/cocktails')
const uuid = require('uuid')
const path = require('path')

class CocktailController {
  async createCocktail(req, res) {
    const { name, amount, category_cocktail_name_id, description } = req.body

    let fileName = 'cocktail.svg'
    if (req.files?.img) {
      fileName = uuid.v4() + '.svg'
      req.files.img.mv(path.resolve(__dirname, '..', 'static', fileName))
    }

    const cocktail = await Cocktail.create({ name, description, category_cocktail_name_id, img: fileName })

    CategoryCocktail.create({
      cocktailId: cocktail.id,
      categoryCocktailNameId: category_cocktail_name_id,
    })

    amount.forEach(({ ingredientId, value, unit }) => {
      CocktailIngredient.create({ cocktailId: cocktail.id, ingredientId })
      Amount.create({ value, unit, cocktailId: cocktail.id, ingredientId })
    })

    res.json(cocktail)
  }

  async getCocktails(req, res) {
    const { page, substring, type, ingredients, cocktails } = req.query
    const limit = 8
    const offset = (page || 1) * limit - limit
    const result = {
      cocktails: [],
      destination: '',
    }

    if (type && ingredients) {
      result.destination = 'byIngredients'
      if (type === 'consist') {
        result.cocktails = await sequelize.query(
          'SELECT cocktail.* FROM cocktail INNER JOIN cocktail_ingredient ON cocktail.id = cocktail_ingredient."cocktailId" LEFT JOIN ingredient ON cocktail_ingredient."ingredientId" = ingredient.id AND ingredient.id NOT IN(:ingredients) GROUP BY cocktail.id HAVING EVERY(ingredient.id IS NULL);',
          {
            replacements: { ingredients: ingredients.split(',') },
            model: Cocktail,
          },
        )
      } else {
        result.cocktails = await Cocktail.findAll({
          include: [
            {
              model: CocktailIngredient,
              where: { ingredientId: ingredients.split(',') },
              attributes: {
                exclude: ['description'],
              },
            },
          ],
        })
      }
    } else if (substring) {
      result.destination = 'bySubstring'
      result.cocktails = await Cocktail.findAndCountAll({
        limit,
        offset,
        where: {
          name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${substring.toLowerCase()}%`),
        },
        attributes: {
          exclude: ['description'],
        },
      })
    } else if (cocktails) {
      result.destination = 'byFavorites'
      result.cocktails = await Cocktail.findAndCountAll({
        where: { id: cocktails.split(',') },
        attributes: {
          exclude: ['description'],
        },
      })
    } else {
      result.cocktails = await Cocktail.findAndCountAll({
        limit,
        offset,
        attributes: {
          exclude: ['description'],
        },
      })
    }

    res.json(result)
  }

  async getOneCocktail(req, res) {
    const { id } = req.params
    const cocktail = await Cocktail.findOne({
      where: { id },
      include: [
        {
          model: Amount,
          as: 'amount',
          include: [
            {
              model: Ingredient,
              attributes: ['name'],
            },
          ],
          attributes: ['id', 'value', 'unit'],
        },
      ],
      attributes: {
        exclude: ['category_cocktail_name_id'],
      },
    })

    res.json(cocktail)
  }

  async updateCocktail(req, res) {
    const { id, name, amount, description } = req.body
    let fileName = path.resolve(__dirname, '..', 'static', 'cocktail.svg')
    if (req.files?.img) {
      fileName = uuid.v4() + '.svg'
      req.files.img.mv(path.resolve(__dirname, '..', 'static', fileName))
    }

    const cocktail = await Cocktail.update({ name, description, img: fileName }, { where: { id } })

    if (amount)
      amount.forEach(({ ingredientId, value, unit }) => {
        CocktailIngredient.update({ cocktailId: cocktail.id, ingredientId }, { where: { cocktailId: id } })
        Amount.update({ value, unit, cocktailId: cocktail.id, ingredientId }, { where: { cocktailId: id } })
      })

    res.json(cocktail)
  }

  async deleteCocktail(req, res) {
    const id = req.params.id
    const cocktail = await Cocktail.destroy({ where: { id } })
    res.json(cocktail)
  }
}

module.exports = new CocktailController()

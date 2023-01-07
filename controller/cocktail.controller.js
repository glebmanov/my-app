const sequelize = require('../db/db_cocktails')
const { Cocktail, CocktailIngredient, Amount, CategoryCocktail } = require('../models/cocktails')
const uuid = require('uuid')
const path = require('path')

class CocktailController {
  async findOrCreateCocktail(req, res) {
    const { name, amount, category_cocktail_name_id, description, type, ingredients, cocktails } = req.body
    const result = {
      cocktails: [],
      action: '',
    }

    if (name) {
      let fileName = 'cocktail.svg'
      if (req.files?.img) {
        fileName = uuid.v4() + '.svg'
        req.files.img.mv(path.resolve(__dirname, '..', 'static', fileName))
      }

      result.action = 'create'
      result.cocktails.push(await Cocktail.create({ name, description, category_cocktail_name_id, img: fileName }))

      CategoryCocktail.create({
        cocktailId: result.cocktails[0].id,
        categoryCocktailNameId: category_cocktail_name_id,
      })

      amount.forEach(({ ingredientId, value, unit }) => {
        CocktailIngredient.create({ cocktailId: result.cocktails[0].id, ingredientId })
        Amount.create({ value, unit, cocktailId: result.cocktails[0].id, ingredientId })
      })
    }

    if (type && ingredients) {
      result.action = 'find'
      if (type === 'consist') {
        result.cocktails = await sequelize.query(
          'SELECT cocktail.* FROM cocktail INNER JOIN cocktail_ingredient ON cocktail.id = cocktail_ingredient."cocktailId" LEFT JOIN ingredient ON cocktail_ingredient."ingredientId" = ingredient.id AND ingredient.id NOT IN(:ingredients) GROUP BY cocktail.id HAVING EVERY(ingredient.id IS NULL);',
          {
            replacements: { ingredients },
            model: Cocktail,
          },
        )
      } else {
        result.cocktails = await Cocktail.findAll({
          include: [
            {
              model: CocktailIngredient,
              where: { ingredientId: ingredients },
            },
          ],
        })
      }
    }

    if (cocktails) {
      result.action = 'get'
      result.cocktails = await Cocktail.findAll({ where: { id: cocktails } })
    }

    res.json(result)
  }

  async getCocktails(req, res) {
    const { page, substring } = req.query
    const limit = 8
    const offset = (page || 1) * limit - limit
    const result = {
      cocktails: [],
      action: '',
    }

    if (substring) {
      result.action = 'searched'
      result.cocktails = await Cocktail.findAndCountAll({
        limit,
        offset,
        where: {
          name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${substring.toLowerCase()}%`),
        },
      })
    } else {
      result.cocktails = await Cocktail.findAndCountAll({
        limit,
        offset,
      })
    }

    res.json(result)
  }

  async getOneCocktail(req, res) {
    const { id } = req.params
    const cocktail = await Cocktail.findOne({
      where: { id },
      include: [{ model: Amount, as: 'amount' }],
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

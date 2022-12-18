const { Op } = require('sequelize')
const { Sequelize } = require('../db/db_cocktails')
const { Cocktail, CocktailIngredient, Amount, Ingredient } = require('../models/cocktails')
const uuid = require('uuid')
const path = require('path')

class CocktailController {
  async findOrCreateCocktail(req, res) {
    const { name, amount, description, type, ingredients } = req.body
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
      result.cocktails = await Cocktail.create({ name, description, img: fileName })

      amount.forEach(({ ingredientId, value, unit }) => {
        CocktailIngredient.create({ cocktailId: result.id, ingredientId })
        Amount.create({ value, unit, cocktailId: result.id, ingredientId })
      })
    }

    if (type && ingredients) {
      let cocktails

      if (type === 'consist') {
      } else {
        const cocktailIngredients = await CocktailIngredient.findAll({ where: { ingredientId: ingredients } })
        cocktails = cocktailIngredients.map(({ cocktailId }) => cocktailId)
      }

      result.action = 'find'
      result.cocktails = await Cocktail.findAndCountAll({
        where: { id: cocktails },
      })
    }

    res.json(result)
  }

  async getCocktails(req, res) {
    const { page, substring } = req.query
    const limit = 8
    const offset = (page || 1) * limit - limit
    let cocktails

    if (substring) {
      cocktails = await Cocktail.findAndCountAll({
        limit,
        offset,
        where: {
          name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${substring.toLowerCase()}%`),
        },
      })
    } else {
      cocktails = await Cocktail.findAndCountAll({
        limit,
        offset,
      })
    }

    res.json(cocktails)
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

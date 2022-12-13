const { Cocktail, CocktailIngredient, Amount } = require('../models/cocktails')
const uuid = require('uuid')
const path = require('path')

class CocktailController {
  async createCocktail(req, res) {
    const { name, amount, description } = req.body
    let fileName = 'cocktail.svg'
    if (req.files?.img) {
      fileName = uuid.v4() + '.svg'
      req.files.img.mv(path.resolve(__dirname, '..', 'static', fileName))
    }

    const cocktail = await Cocktail.create({ name, description, img: fileName })

    if (amount)
      amount.forEach(({ ingredientId, value, unit }) => {
        CocktailIngredient.create({ cocktailId: cocktail.id, ingredientId })
        Amount.create({ value, unit, cocktailId: cocktail.id, ingredientId })
      })

    res.json(cocktail)
  }

  async getCocktails(_, res) {
    const cocktails = await Cocktail.findAll({
      include: [{ model: Amount, as: 'amount' }],
    })
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

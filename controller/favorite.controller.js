const { FavoriteCocktail } = require('../models/users')

class FavoriteController {
  async getCocktails(req, res) {
    const { userId } = req.query
    const cocktails = await FavoriteCocktail.findAll({ where: { userId } })
    res.json(cocktails.map(cocktail => cocktail.cocktailId))
  }

  async addCocktail(req, res) {
    const { cocktailId, userId } = req.body
    const cocktail = await FavoriteCocktail.create({ cocktailId, userId })
    res.json(cocktail.cocktailId)
  }

  async deleteCocktail(req, res) {
    const { cocktailId, userId } = req.query
    await FavoriteCocktail.destroy({ where: { cocktailId, userId } })
    res.json(Number(cocktailId))
  }
}

module.exports = new FavoriteController()

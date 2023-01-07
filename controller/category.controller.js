const {
  CategoryIngredientName,
  CategoryIngredient,
  CategoryCocktailName,
  CategoryCocktail,
} = require('../models/cocktails')

class CategoryController {
  async createIngredientCategory(req, res) {
    const { name } = req.body
    const category = await CategoryIngredientName.create({ name })
    res.json(category)
  }

  async getIngredientCategories(_, res) {
    const categories = await CategoryIngredientName.findAll()
    const resultCategories = categories.map(({ id, name }) => ({ id, name, ingredients: [] }))

    const categoryIngredients = await CategoryIngredient.findAll()
    categoryIngredients.forEach(({ categoryIngredientNameId, ingredientId }) => {
      resultCategories.find(category => category.id === categoryIngredientNameId).ingredients.push(ingredientId)
    })
    res.json(resultCategories)
  }

  async deleteIngredientCategory(req, res) {
    const id = req.params.id
    const category = await CategoryIngredientName.destroy({ where: { id } })
    res.json(category)
  }

  async createCocktailCategory(req, res) {
    const { name } = req.body
    const category = await CategoryCocktailName.create({ name })
    res.json(category)
  }

  async getCocktailCategories(_, res) {
    const categories = await CategoryCocktailName.findAll()
    const resultCategories = categories.map(({ id, name }) => ({ id, name, cocktails: [] }))

    const categoryCocktails = await CategoryCocktail.findAll()
    categoryCocktails.forEach(({ categoryCocktailNameId, cocktailId }) => {
      resultCategories.find(category => category.id === categoryCocktailNameId).cocktails.push(cocktailId)
    })
    res.json(resultCategories)
  }

  async deleteCocktailCategory(req, res) {
    const id = req.params.id
    const category = await CategoryCocktailName.destroy({ where: { id } })
    res.json(category)
  }
}

module.exports = new CategoryController()

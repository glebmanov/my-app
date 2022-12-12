const { Category, CategoryIngredient } = require('../models/cocktails')

class CategoryController {
  async createCategory(req, res) {
    const { name } = req.body
    const category = await Category.create({ name })
    res.json(category)
  }

  async getCategories(_, res) {
    const categories = await Category.findAll()
    const resultCategories = categories.map(({ id, name }) => ({ id, name, ingredients: [] }))

    const categoryIngredients = await CategoryIngredient.findAll()
    categoryIngredients.forEach(({ categoryId, ingredientId }) => {
      resultCategories.find(category => category.id === categoryId).ingredients.push(ingredientId)
    })
    res.json(resultCategories)
  }

  async deleteCategory(req, res) {
    const id = req.params.id
    const category = await Category.destroy({ where: { id } })
    res.json(category)
  }
}

module.exports = new CategoryController()

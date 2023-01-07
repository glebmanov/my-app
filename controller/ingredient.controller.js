const { Ingredient, CategoryIngredient } = require('../models/cocktails')

class IngredientController {
  async createIngredient(req, res) {
    const { name, category_ingredient_name_id } = req.body
    const ingredient = await Ingredient.create({ name, category_ingredient_name_id })
    CategoryIngredient.create({ ingredientId: ingredient.id, categoryIngredientNameId: category_ingredient_name_id })
    res.json(ingredient)
  }

  async getIngredients(req, res) {
    const ingredients = await Ingredient.findAll()
    res.json(ingredients)
  }
}

module.exports = new IngredientController()

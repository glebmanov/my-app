const db_cocktails = require('../db_cocktails')

class IngredientController {
  async createIngredient(req, res) {
    const { name, category_id } = req.body
    const newIngredient = await db_cocktails.query(
      `INSERT INTO ingredient (name, category_id) values ($1, $2) RETURNING *`,
      [name, category_id],
    )
    res.json(newIngredient.rows[0])
  }

  async getIngredients(_, res) {
    const ingredients = await db_cocktails.query('SELECT * FROM ingredient')
    res.json(ingredients.rows)
  }

  async getOneIngredient(req, res) {
    const id = req.params.id
    const ingredient = await db_cocktails.query('SELECT * FROM ingredient where id = $1', [id])
    res.json(ingredient.rows[0])
  }

  async updateIngredient(req, res) {
    const { id, name, category } = req.body
    const ingredient = await db_cocktails.query(
      'UPDATE ingredient set name = $2, category = $3 where id = $1 RETURNING *',
      [id, name, category],
    )
    res.json(ingredient.rows[0])
  }

  async deleteIngredient(req, res) {
    const id = req.params.id
    const ingredient = await db_cocktails.query('DELETE FROM ingredient where id = $1', [id])
    res.json(ingredient.rows[0])
  }
}

module.exports = new IngredientController()

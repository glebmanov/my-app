const db_cocktails = require('../db_cocktails')

class CategoryController {
  async createCategory(req, res) {
    const { name } = req.body
    const newCategory = await db_cocktails.query(`INSERT INTO category (name) values ($1) RETURNING *`, [name])
    res.json(newCategory.rows[0])
  }

  async getCategories(_, res) {
    const categories = await db_cocktails.query('SELECT * FROM category')
    res.json(categories.rows)
  }
}

module.exports = new CategoryController()

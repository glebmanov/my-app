const db_cocktails = require('../db_cocktails')

class CocktailController {
  async createCocktail(req, res) {
    const { name, ingredients } = req.body
    const cocktail = await db_cocktails.query(`INSERT INTO cocktail (name, ingredients) values ($1, $2) RETURNING *`, [
      name,
      ingredients,
    ])
    res.json(cocktail.rows[0])
  }

  async getCocktails(_, res) {
    const cocktails = await db_cocktails.query('SELECT * FROM cocktail')
    res.json(cocktails.rows)
  }

  async getOneCocktail(req, res) {
    const id = req.params.id
    const cocktail = await db_cocktails.query('SELECT * FROM cocktail where id = $1', [id])
    res.json(cocktail.rows[0])
  }

  async updateCocktail(req, res) {
    const { id, name, ingredients, amount } = req.body
    const cocktail = await db_cocktails.query(
      'UPDATE cocktail set name = $2, ingredients = $3, amount = $4 where id = $1 RETURNING *',
      [id, name, ingredients, amount],
    )
    res.json(cocktail.rows[0])
  }

  async deleteCocktail(req, res) {
    const id = req.params.id
    const cocktail = await db_cocktails.query('DELETE FROM cocktail where id = $1', [id])
    res.json(cocktail.rows[0])
  }
}

module.exports = new CocktailController()

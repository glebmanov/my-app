const db_cocktails = require('../db_cocktails')

class AmountController {
  async createAmount(req, res) {
    const { cocktail_id, ingredient_id, value } = req.body
    const newAmount = await db_cocktails.query(
      `INSERT INTO amount (cocktail_id, ingredient_id, value) values ($1, $2, $3) RETURNING *`,
      [cocktail_id, ingredient_id, value],
    )
    res.json(newAmount.rows[0])
  }

  async getAmount(_, res) {
    const amount = await db_cocktails.query('SELECT * FROM amount')
    res.json(amount.rows)
  }
}

module.exports = new AmountController()

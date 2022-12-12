const { Amount } = require('../models/cocktails')

class AmountController {
  async createAmount(req, res) {
    const { value, unit } = req.body
    res.json()
  }

  async getAmount(_, res) {
    res.json()
  }
}

module.exports = new AmountController()

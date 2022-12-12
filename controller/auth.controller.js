const db_users = require('../db/db_users')
const { validationResult } = require('express-validator')

class AuthController {
  async registration(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: 'registration error', errors })
    const { name, email, password } = req.body

    res.json()
  }

  async login(req, res) {
    const { email, password } = req.body

    res.json()
  }

  async getUsers(req, res) {
    const {} = req.body

    res.json()
  }
}

module.exports = new AuthController()

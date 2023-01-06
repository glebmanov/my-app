const { User } = require('../models/users')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, name, email, role) => {
  return jwt.sign({ id, name, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class AuthController {
  async registration(req, res) {
    const { name, email, password, role } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: 'registration error', errors })
    const candidateName = await User.findOne({ where: { name } })
    if (candidateName) return res.status(404).json({ message: 'user with the same name already exists' })
    const candidateEmail = await User.findOne({ where: { email } })
    if (candidateEmail) return res.status(404).json({ message: 'user with the same email already exists' })

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ name, email, password: hashPassword, role })
    const token = generateJwt(user.id, name, email, user.role)

    res.json({ token })
  }

  async login(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(404).json({ message: 'user is not found' })
    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) return res.status(404).json({ message: 'incorrect password specified' })

    const token = generateJwt(user.id, user.name, email, user.role)

    res.json({ token })
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.role)

    res.json({ token })
  }
}

module.exports = new AuthController()

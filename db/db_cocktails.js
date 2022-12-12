const { Sequelize } = require('sequelize')
require('dotenv').config()

module.exports = new Sequelize(process.env.COCKTAILS_DB, process.env.USER_DB, process.env.PASSWORD_DB, {
  dialect: 'postgres',
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
})

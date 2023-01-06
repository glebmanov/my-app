const sequelize = require('../db/db_users')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
  'user',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'user' },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const FavoriteCocktail = sequelize.define(
  'favorite_cocktail',
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    cocktailId: { type: DataTypes.INTEGER, unique: true },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

module.exports = {
  User,
  FavoriteCocktail,
}

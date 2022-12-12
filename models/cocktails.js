const sequelize = require('../db/db_cocktails')
const { DataTypes } = require('sequelize')

const Cocktail = sequelize.define('cocktail', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  discription: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
})

const Ingredient = sequelize.define('ingredient', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  category_id: { type: DataTypes.INTEGER },
})

const CocktailIngredient = sequelize.define('cocktail_ingredient')

const Amount = sequelize.define('amount', {
  value: { type: DataTypes.INTEGER },
  unit: { type: DataTypes.STRING },
})

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
})

const CategoryIngredient = sequelize.define('category_ingredient')

Cocktail.hasMany(CocktailIngredient)
CocktailIngredient.belongsTo(Cocktail)

Cocktail.hasMany(Amount, { as: 'amount' })
Amount.belongsTo(Cocktail)

Ingredient.hasMany(CocktailIngredient)
CocktailIngredient.belongsTo(Ingredient)

Ingredient.hasOne(Amount)
Amount.belongsTo(Ingredient)

Ingredient.hasOne(CategoryIngredient)
CategoryIngredient.belongsTo(Ingredient)

Category.hasMany(CategoryIngredient)
CategoryIngredient.belongsTo(Category)

module.exports = {
  Cocktail,
  Ingredient,
  CocktailIngredient,
  Amount,
  Category,
  CategoryIngredient,
}

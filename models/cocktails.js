const sequelize = require('../db/db_cocktails')
const { DataTypes } = require('sequelize')

const Cocktail = sequelize.define(
  'cocktail',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    description: { type: DataTypes.STRING(255), unique: false },
    category_cocktail_name_id: { type: DataTypes.INTEGER },
    img: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const Ingredient = sequelize.define(
  'ingredient',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    category_ingredient_name_id: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const CocktailIngredient = sequelize.define(
  'cocktail_ingredient',
  {},
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const Amount = sequelize.define(
  'amount',
  {
    value: { type: DataTypes.INTEGER },
    unit: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const CategoryIngredientName = sequelize.define(
  'category_ingredient_name',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const CategoryIngredient = sequelize.define(
  'category_ingredient',
  {},
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const CategoryCocktailName = sequelize.define(
  'category_cocktail_name',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const CategoryCocktail = sequelize.define(
  'category_cocktail',
  {},
  {
    timestamps: false,
    freezeTableName: true,
  },
)

Cocktail.hasMany(CocktailIngredient)
CocktailIngredient.belongsTo(Cocktail)

Cocktail.hasMany(Amount, { as: 'amount' })
Amount.belongsTo(Cocktail)

Cocktail.hasMany(CocktailIngredient, { as: 'ingredients' })
CocktailIngredient.belongsTo(Cocktail)

Ingredient.hasMany(CocktailIngredient)
CocktailIngredient.belongsTo(Ingredient)

Ingredient.hasOne(Amount)
Amount.belongsTo(Ingredient)

Ingredient.hasOne(CategoryIngredient)
CategoryIngredient.belongsTo(Ingredient)

CategoryIngredientName.hasMany(CategoryIngredient)
CategoryIngredient.belongsTo(CategoryIngredientName)

Cocktail.hasOne(CategoryCocktail)
CategoryCocktail.belongsTo(Cocktail)

CategoryCocktailName.hasMany(CategoryCocktail)
CategoryCocktail.belongsTo(CategoryCocktailName)

module.exports = {
  Cocktail,
  Ingredient,
  CocktailIngredient,
  Amount,
  CategoryIngredientName,
  CategoryIngredient,
  CategoryCocktailName,
  CategoryCocktail,
}

const sequelize = require('../db/db_weather')
const { DataTypes } = require('sequelize')

const Location = sequelize.define(
  'location',
  {
    lat: { type: DataTypes.STRING },
    lon: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const Spot = sequelize.define(
  'spot',
  {
    name: { type: DataTypes.STRING, unique: true },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

Spot.belongsTo(Location, { as: 'location' })

module.exports = {
  Spot,
  Location,
}

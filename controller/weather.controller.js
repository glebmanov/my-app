const { Spot, Location } = require('../models/weather')

class WeatherController {
  async createSpots(req, res) {
    const { name, location } = req.body
    const { lat, lon } = location
    const newLocation = await Location.create({ lat, lon })
    const newSpot = await Spot.create({ name, locationId: newLocation.id })
    res.json(newSpot)
  }

  async getSpots(_, res) {
    const spots = await Spot.findAll({
      include: [{ model: Location, as: 'location', attributes: ['lat', 'lon'] }],
      attributes: ['id', 'name'],
    })
    res.json(spots)
  }

  async getSpotWeather(req, res) {
    const { endpoint, lat, lon } = req.query
    const searchParams = new URLSearchParams({ lat, lon, units: 'metric' }).toString()

    await fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/${endpoint}?${searchParams}`, {
      headers: {
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => res.json(data))
      .catch(e => res.status(500).json({ message: e.message }))
  }
}

module.exports = new WeatherController()

const { Router } = require('express')
const axios = require('axios')
require('dotenv').config()

const router = Router()

router.get('/weather', async (req, res) => {
  try {
    const { endpoint, lat, lon } = req.query
    const response = await axios.get(`https://weatherbit-v1-mashape.p.rapidapi.com/${endpoint}`, {
      params: { lat, lon, units: 'metric' },
      headers: {
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.API_KEY,
      },
    })
    res.json(response.data)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

module.exports = router

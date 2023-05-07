const { Router } = require('express')
const router = Router()
const weatherController = require('../controller/weather.controller')

router.get('/spots', weatherController.getSpots)
router.post('/spots', weatherController.createSpots)
router.get('/', weatherController.getSpotWeather)

module.exports = router

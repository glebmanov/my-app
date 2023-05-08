const { Router } = require('express')
const router = Router()
const weatherController = require('../controller/weather.controller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/spots', weatherController.getSpots)
router.post('/spots', checkRole('admin'), weatherController.createSpots)
router.get('/', weatherController.getSpotWeather)

module.exports = router

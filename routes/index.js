const { Router } = require('express')
const router = new Router()

router.use('/auth', require('./auth.routes'))
router.use('/weather', require('./weather.routes'))
router.use('/cocktail', require('./cocktail.routes'))
router.use('/ingredient', require('./ingredient.routes'))
router.use('/amount', require('./amount.routes'))
router.use('/category', require('./category.routes'))

module.exports = router

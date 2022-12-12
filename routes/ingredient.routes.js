const { Router } = require('express')
const router = Router()
const ingredientController = require('../controller/ingredient.controller')

router.post('/', ingredientController.createIngredient)
router.get('/', ingredientController.getIngredients)

module.exports = router

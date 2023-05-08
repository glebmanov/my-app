const { Router } = require('express')
const router = Router()
const ingredientController = require('../controller/ingredient.controller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('admin'), ingredientController.createIngredient)
router.get('/', ingredientController.getIngredients)

module.exports = router

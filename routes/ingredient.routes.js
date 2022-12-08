const { Router } = require('express')
const router = Router()
const ingredientController = require('../controller/ingredient.controller')

router.post('/ingredient', ingredientController.createIngredient)
router.get('/ingredient', ingredientController.getIngredients)
router.get('/ingredient/:id', ingredientController.getOneIngredient)
router.put('/ingredient', ingredientController.updateIngredient)
router.delete('/ingredient/:id', ingredientController.deleteIngredient)

module.exports = router

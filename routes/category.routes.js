const { Router } = require('express')
const router = Router()
const categoryController = require('../controller/category.controller')

router.post('/ingredient', categoryController.createIngredientCategory)
router.get('/ingredient', categoryController.getIngredientCategories)
router.delete('/ingredient/:id', categoryController.deleteIngredientCategory)

router.post('/cocktail', categoryController.createCocktailCategory)
router.get('/cocktail', categoryController.getCocktailCategories)
router.delete('/cocktail/:id', categoryController.deleteCocktailCategory)

module.exports = router

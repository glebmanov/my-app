const { Router } = require('express')
const router = Router()
const favoriteController = require('../controller/favorite.controller')

router.get('/cocktail', favoriteController.getCocktails)
router.post('/cocktail', favoriteController.addCocktail)
router.delete('/cocktail', favoriteController.deleteCocktail)

module.exports = router

const { Router } = require('express')
const router = Router()
const cocktailController = require('../controller/cocktail.controller')

router.post('/cocktail', cocktailController.createCocktail)
router.get('/cocktail', cocktailController.getCocktails)
router.get('/cocktail/:id', cocktailController.getOneCocktail)
router.put('/cocktail', cocktailController.updateCocktail)
router.delete('/cocktail/:id', cocktailController.deleteCocktail)

module.exports = router

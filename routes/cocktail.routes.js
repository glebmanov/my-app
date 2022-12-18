const { Router } = require('express')
const router = Router()
const cocktailController = require('../controller/cocktail.controller')

router.post('/', cocktailController.findOrCreateCocktail)
router.get('/', cocktailController.getCocktails)
router.get('/:id', cocktailController.getOneCocktail)
router.put('/', cocktailController.updateCocktail)
router.delete('/:id', cocktailController.deleteCocktail)

module.exports = router

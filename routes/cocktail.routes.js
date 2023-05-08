const { Router } = require('express')
const router = Router()
const cocktailController = require('../controller/cocktail.controller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('admin'), cocktailController.createCocktail)
router.get('/', cocktailController.getCocktails)
router.get('/:id', cocktailController.getOneCocktail)
router.put('/', checkRole('admin'), cocktailController.updateCocktail)
router.delete('/:id', checkRole('admin'), cocktailController.deleteCocktail)

module.exports = router

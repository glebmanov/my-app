const { Router } = require('express')
const router = Router()
const categoryController = require('../controller/category.controller')

router.post('/', categoryController.createCategory)
router.get('/', categoryController.getCategories)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router

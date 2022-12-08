const { Router } = require('express')
const router = Router()
const categoryController = require('../controller/category.controller')

router.post('/category', categoryController.createCategory)
router.get('/category', categoryController.getCategories)

module.exports = router

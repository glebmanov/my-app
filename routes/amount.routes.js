const { Router } = require('express')
const router = Router()
const amountController = require('../controller/amount.controller')

router.post('/amount', amountController.createAmount)
router.get('/amount', amountController.getAmount)

module.exports = router

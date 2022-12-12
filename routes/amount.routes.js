const { Router } = require('express')
const router = Router()
const amountController = require('../controller/amount.controller')

router.post('/', amountController.createAmount)
router.get('/', amountController.getAmount)

module.exports = router

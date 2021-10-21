const express = require('express')
const orderController = require('../controllers/orderController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/').post(authController.protect, authController.checkRole('user'), orderController.createOrder)
router.route('/:id').get(orderController.findOrder).patch(authController.protect, authController.checkRole('checker handler'), orderController.updateOrder)
module.exports = router
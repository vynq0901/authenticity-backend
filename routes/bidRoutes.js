const express = require('express')
const bidController = require('../controllers/bidController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/').post(authController.protect, authController.checkRole('user'), bidController.createBid)
router.route('/delete/:id').delete(bidController.deleteBid)
router.route('/:productId').get(bidController.getProductBids)
router.route('/:productId/:size').get(bidController.getSizeBids)

module.exports = router
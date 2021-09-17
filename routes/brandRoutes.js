const express = require('express')
const brandController = require('../controllers/brandController')

const router = express.Router()

router.route('/').get(brandController.getAllBrands).post(brandController.createBrand)

module.exports = router
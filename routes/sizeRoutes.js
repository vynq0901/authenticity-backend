const express = require('express')
const sizeController = require('../controllers/sizeController')

const router = express.Router()

router.route('/')
    .get(sizeController.getAllSizes)
    .post(sizeController.createSize)

module.exports = router
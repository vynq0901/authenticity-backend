const Brand = require('../models/brandModel')

exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find()
        res.status(200).json({
            status: 'success',
            data: {
                brands
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error
        })
    }
}

exports.createBrand = async (req, res) => {
    try {
        const newBrand = new Brand(req.body)
        await newBrand.save()
        res.status(201).json({
            status: 'success',
            message: 'Brand created!',
            data: {
                brand: newBrand
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error
        })
    }
}
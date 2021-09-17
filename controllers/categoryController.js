const Category = require('../models/categoryModel')

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()

        res.status(200).json({
            status: 'success',
            data: {
                categories: categories
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Internal error'
        })
    }
}

exports.createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body)
        await newCategory.save()
        res.status(201).json({
            status: 'success',
            message: 'Category created',
            data: {
                category: newCategory
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Internal error'
        })
    }
}
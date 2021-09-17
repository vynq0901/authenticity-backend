const Product = require('./../models/productModel')

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('brand').populate('categoryProduct')

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(201).json({
            status: 'success',
            message: 'Product created !',
            data: {
                product: newProduct
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error
        })
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        console.log(product)
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.status(200).json({
            status: 'success',
            data: {
                product: updatedProduct
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete(req.params.id)
        if (!deletedProduct) {
            res.status(401).json({
                status: "failed",
                message: "Product not found"
            })
        }
        res.status(204).json({
            status: "success",
            data: {
                product: deletedProduct
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
}
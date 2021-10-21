const Size = require('../models/sizeModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllSizes = catchAsync(async (req, res) => {
    const sizes = await Size.find()
    res.status(200).json({
        status: 'success',
        data: {
            sizes
        }
    })
})

exports.createSize = catchAsync(async (req, res) => {
    const size = new Size(req.body)
    await size.save()
    res.status(201).json({
        status: 'success',
        data: {
            size
        }
    })
})
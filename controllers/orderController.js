const Order = require('../models/orderModel')
const Bid = require('../models/bidModel')
const Ask = require('../models/askModel')
const ShippingInfo = require('../models/shippingInfoModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.createOrder = catchAsync(async (req, res) => {
    let bid, ask
    //CHECK CREATE ORDER BY BUYING
    if (!req.body.bid) {
        //GET SHIPPING INFO BY USER
        const { address, phoneNumber, province, district, ward } = req.body.shippingInfo
        const shippingInfo = await ShippingInfo.findOneAndUpdate({
            user: req.user,
        },
            {
                address,
                phoneNumber,
                province,
                district,
                ward
            },
            {
                new: true,
                upsert: true
            }
        )

        bid = await Bid.create({
            user: req.user,
            product: req.body.product,
            productSize: req.body.productSize,
            price: req.body.price,
            totalPrice: req.body.totalPrice,
            isMatched: true,
            shippingInfo: shippingInfo
        })
        ask = await Ask.findByIdAndUpdate(req.body.ask, { isMatched: true }, { new: true })
    }
    //CHECK CREATE ORDER BY SELLING
    if (!req.body.ask) {
        ask = await Ask.create({
            user: req.user,
            product: req.body.product,
            productSize: req.body.productSize,
            price: req.body.price,
            totalPrice: req.body.totalPrice,
            isMatched: true
        })
        bid = await Bid.findByIdAndUpdate(req.body.bid, { isMatched: true }, { new: true })
    }

    const order = new Order({
        ask,
        bid,
        product: req.body.product,
        productSize: req.body.productSize,
        salePrice: bid.price
    })
    order.save()
    res.status(201).json({
        status: 'success',
        message: 'Order Created!',
        order: {
            ...order,
            orderNumber: `${bid._id.toString().slice(-6)}-${ask._id.toString().slice(-6)}`.toUpperCase()
        }
    })
})

exports.findOrder = catchAsync(async (req, res) => {
    const order = await Order.findById(req.params.id)
    res.status(200).json({
        status: 'success',
        data: {
            order
        }
    })
})

exports.updateOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status, updatedAt: Date.now() }, { new: true })
    if (!order) {
        return next(new AppError('Order not found', 404))
    }
    res.status(200).json({
        status: 'success',
        message: 'Order Updated',
        order
    })
})
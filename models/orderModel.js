const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    bid: {
        type: Schema.Types.ObjectId,
        ref: 'Bid'
    },
    ask: {
        type: Schema.Types.ObjectId,
        ref: 'Ask'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    productSize: {
        type: String
    },
    salePrice: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    orderNumber: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Người bán đang gửi hàng', 'Đang xử lý', 'Đã gửi hàng', 'Hoàn thành', 'Đã hủy'],
        default: 'Người bán đang gửi hàng'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
    }
})
orderSchema.pre('save', function (next) {
    this.orderNumber = `${this.bid._id.toString().slice(-6)}-${this.ask._id.toString().slice(-6)}`.toUpperCase()

    next()
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'brand'
    },
    productCategory: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    colorway: {
        type: String
    },
    condition: {
        type: String,
        default: 'New'
    },
    description: {
        type: String
    },
    gender: {
        type: String
    },
    media: {
        type: Object
    },
    hidden: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
    },
    releaseDate: {
        type: Date,
    },
    retailPrice: {
        type: Number
    },
    shoe: {
        type: String
    },
    shortDescription: {
        type: String
    },
    styleId: {
        type: String
    },
    title: {
        type: String
    },
    year: {
        type: Number
    },
    tags: {
        type: Array
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
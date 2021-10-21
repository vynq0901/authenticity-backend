const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sizeSchema = new Schema({
    name: {
        type: String,
        unique: true
    }
})

const Size = mongoose.model("Size", sizeSchema)
module.exports = Size
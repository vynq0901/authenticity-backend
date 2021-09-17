const express = require('express')
const morgan = require('morgan')
const productRouter = require('./routes/productRoutes')
const brandRouter = require('./routes/brandRoutes')
const categoryRouter = require("./routes/categoryRoutes")

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/brands', brandRouter)
app.use('/api/categories', categoryRouter)

module.exports = app
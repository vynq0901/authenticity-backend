const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() => console.log('DB connection successful'))

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log(`App running on port ${port}`)
    console.log(process.env.NODE_ENV)
})

//handle rejection ex: connect db failed (wrong password)
process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('UNHANDLER REJECTION! shutting down...')
    server.close(() => {
        process.exit(1)
    })
})
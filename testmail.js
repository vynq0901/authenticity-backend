const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

let transporter = nodemailer.createTransport({
    service: 'gmail.com',
    secure: false,
    auth: {
        user: process.env.EMAIL || 'nqvy0901@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'fireblood1'
    }
})
transporter.use('compile', hbs({
    viewEngine:  {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "emailViews"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "emailViews"),
    extName: ".handlebars"
}))
let mailOptions = {
    from: 'nqvy0901@gmail.com',
    to: 'cmtry0901@gmail.com',
    subject: 'THIS IS TESTTT',
    template: 'index',
    context: {
        imgpath: 'https://res.cloudinary.com/vydepchai/image/upload/v1635252930/gmzkcxgwcztczxslbmxi.webp'
    }

}
transporter.sendMail(mailOptions).then((res) => console.log(res)).catch(err => console.log(err))

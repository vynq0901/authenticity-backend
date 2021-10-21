const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const { default: validator } = require('validator')



const userSchema = new Schema({
    username: {
        type: String,
        unique: [true, 'Tài khoản đã tồn tại'],
        minlength: [8, 'Tài khoản phải có ít nhất 8 kí tự'],
        required: [true, 'Tài khoản không được để trống']
    },
    name: {
        type: String,
        required: [true, 'Họ và tên không được để trống']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email không được để trống',
        validate: [validator.isEmail, 'Email không hợp lệ']
    },
    shoeSize: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'checker', 'handler', 'supporter', 'admin'],
        default: 'user'
    },
    level: {
        type: Number,
        enum: [1, 2, 3],
        default: 1,
    },
    password: {
        type: String,
        required: [true, 'Mật khẩu không được để trống'],
        minlength: [8, 'Mật khẩu phải có ít nhất 8 kí tự'],
        select: false
    },
    passwordConfirm: {
        type: String,
        validate: {
            //only work on CREATE and on Save
            validator: function (el) {
                return el === this.password
            },
            message: 'Mật khẩu không trùng khớp'
        }
    },
    followingProducts: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            size: {
                type: String
            }
        }
    ]
}, {
    toObject:
        { virtuals: true },
    toJSON:
        { virtuals: true }
})

// userSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'followingProducts',
//         populate: {
//             path: product,
//             model 
//         }
//     })
//     next()
// })

userSchema.pre('save', async function (next) {
    // run only when password is modified
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

//check password in log in
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}



const User = mongoose.model('User', userSchema)

module.exports = User
import mongoose from 'mongoose'

const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: new Date()
    },
    favoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products'}],
    otp: {
        type: String,
        default: null
    },
    otpExpiresAt: {
        type: Date,
        default: null
    },
    orders: [{
        productId: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Products',
          required: true,
        }],
        amount: {
          type: Number,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      }],
})

const Auth = mongoose.model('Users', AuthSchema)

export default Auth
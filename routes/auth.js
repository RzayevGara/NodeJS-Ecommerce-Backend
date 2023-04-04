import express from 'express'
import {register, login, refreshToken, forgotPassword, checkOTP, resetPassword, getUser}  from '../controllers/auth.js'
import checkJwt from '../middleware/auth.js'

const router = express.Router()

//register
router.post('/register', register)

//login
router.post('/login', login)

//check JWT
router.post('/check-token', checkJwt, getUser)

//check refresh token
router.post('/refresh-token', refreshToken)


//forgot password
router.post('/forgot-password', forgotPassword)


//check otp
router.post('/check-otp', checkOTP)


// reset password
router.post('/reset-password', resetPassword)

export default router
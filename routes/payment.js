import express from 'express'
import {checkout}  from '../controllers/payment.js'
import checkJwt from '../middleware/auth.js'

const router = express.Router()

//post

router.post('/payment', checkJwt, checkout)



export default router
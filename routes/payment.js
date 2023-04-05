import express from 'express'
import {checkout, getOrder}  from '../controllers/payment.js'
import checkJwt from '../middleware/auth.js'

const router = express.Router()

//post
router.post('/payment', checkJwt, checkout)


// get orders
router.get('/order', checkJwt, getOrder)


export default router
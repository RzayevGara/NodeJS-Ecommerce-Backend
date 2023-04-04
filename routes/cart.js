import express from 'express'
import {addToCart, getCart} from '../controllers/cart.js'

const router = express.Router()


// get cart
router.get('/cart', getCart)


//add to cart
router.post('/cart', addToCart)

export default router
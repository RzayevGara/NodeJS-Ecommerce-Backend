import express from 'express'
import {addToCart, getCart, deleteFromCart} from '../controllers/cart.js'

const router = express.Router()


// get cart
router.get('/cart', getCart)


//add to cart
router.post('/cart', addToCart)


// delete from cart
router.delete('/cart', deleteFromCart)

export default router
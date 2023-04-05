import express from 'express'
import {addToCart, getCart, deleteFromCart, updateQuantity} from '../controllers/cart.js'

const router = express.Router()


// get cart
router.get('/cart', getCart)


//add to cart
router.post('/cart', addToCart)


// delete from cart
router.delete('/cart', deleteFromCart)


// change quantity
router.patch('/cart', updateQuantity)

export default router
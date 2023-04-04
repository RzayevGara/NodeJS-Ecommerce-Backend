import express from 'express'
import {createProduct, getProducts, getProductByID} from '../controllers/products.js'

const router = express.Router()


//create product
router.post('/create-product', createProduct)


// get products
router.get('/products', getProducts)


//get product by id
router.get('/get_product/:productID', getProductByID)

export default router

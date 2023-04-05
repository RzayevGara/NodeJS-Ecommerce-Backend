import express from 'express'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './config/database.js'
import Favorite from './routes/favorite.js'
import Auth from './routes/auth.js'
import Product from './routes/products.js'
import Cart from './routes/cart.js'
import Payment from './routes/payment.js'

import ProductSchema from './models/products.js'
import AuthSchema from './models/auth.js'


dotenv.config()

const app = express()

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  })


app.use(cors())
app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))


// /register
app.use('/', Auth)
app.use('/', Product)
app.use('/', Cart)
app.use('/', Favorite)
app.use('/', Payment)


app.get('/', (req,res)=>{
    res.json({message: 'Server Running'})
})

const PORT = process.env.PORT || 3000

db()

const admin = new AdminJS({
    resources: [ProductSchema, AuthSchema]
})
const adminRouter = AdminJSExpress.buildRouter(admin)
app.use(admin.options.rootPath, adminRouter)


app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`); 
})
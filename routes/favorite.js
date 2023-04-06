import express from 'express'
import {getFavorite, addFavorite, deleteFavorite}  from '../controllers/favorite.js'
import checkJwt from '../middleware/auth.js'

const router = express.Router()

//get favorite
router.get('/favorites', checkJwt, getFavorite)


//add favorite
router.post('/favorites', checkJwt, addFavorite)


//delete favorite
router.delete('/favorites', checkJwt, deleteFavorite)


export default router
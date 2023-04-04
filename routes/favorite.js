import express from 'express'
import {getFavorite, addFavorite, deleteFavorite}  from '../controllers/favorite.js'
import checkJwt from '../middleware/auth.js'

const router = express.Router()

//post, get, update, delete
router.get('/favorites', checkJwt, getFavorite)

router.post('/favorites', checkJwt, addFavorite)

router.delete('/favorites', checkJwt, deleteFavorite)


export default router
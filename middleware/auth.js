import jwt from 'jsonwebtoken'
import Auth from '../models/auth.js'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]  //"bearer token" => token
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
        const user =await Auth.findById(decodedToken.id).select(['-favoriteProducts', '-otpExpiresAt', '-otp', '-orders'])
        req.auth = user.id;
        next()
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

export default auth
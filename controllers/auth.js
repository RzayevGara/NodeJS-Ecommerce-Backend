import Auth from '../models/auth.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'


export const register = async(req, res)=>{
    try{
        const {username, email, password} = req.body
        const user = await Auth.findOne({email}).select('-favoriteProducts')

        if(user){
            return res.status(500).json({message: "User already exists"})
        }

        if(password.length < 6){
            return res.status(500).json({message: "your password must be at least 6 characters"})
        }

        const passwordHash = await bcrypt.hash(password, 12)

        await Auth.create({username, email, password: passwordHash})

        res.status(201).json({
            status: "OK",
            message: "User created"
        })
    }
    catch(err){
        return res.status(404).json({message: err.message})
    }
}


export const login = async(req, res)=>{
    try{
        const {email, password} = req.body
        const user = await Auth.findOne({email}).select(['-favoriteProducts', '-otpExpiresAt', '-otp', '-orders'])

        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }

        const comparePassword = bcrypt.compare(password, user.password)

        if(!comparePassword){
            return res.status(404).json({
                message: "your password incorrect"
            })
        }

        const token = jwt.sign({id: user.id}, process.env.SECRET_TOKEN, {expiresIn: "2h"})
        const refreshToken = jwt.sign({id: user.id}, process.env.REFRESH_TOKEN)

        res.status(200).json({
            status: "OK",
            user,
            token,
            refreshToken
        })
    }
    catch(err){
        if(!user){
            return res.status(404).json({
                message: err.message
            })
        }
    }
}


export const getUser = async (req,res)=>{
    try {
        const userID = req.auth
        const user =await Auth.findById(userID).select(['-favoriteProducts', '-otpExpiresAt', '-otp', '-orders'])

        res.status(200).json({
            status: "OK",
            user
        })
    } catch (error) {
        
    }
}

export const refreshToken = async(req, res)=>{
    try {
        const {refreshToken} = req.body
        if (!refreshToken) return req.status(401).json({message: "refresh token not found"})

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async(err, data)=>{
            if(err) return res.status(400).json(err)

            const token = jwt.sign({id: data.id}, process.env.SECRET_TOKEN, {expiresIn: "15m"})
            const refreshToken = jwt.sign({id: data.id}, process.env.REFRESH_TOKEN)

            const user = await Auth.findById(data.id).select(['-favoriteProducts', '-otpExpiresAt', '-otp', '-orders'])
            
            res.status(200).json({
                status: "OK",
                user,
                token,
                refreshToken
            })
        })
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}



export const forgotPassword = async(req, res)=>{
    try {
        const { email } = req.body;

        // check email
        const user = await Auth.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
      
        // create OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
        // save OTP and expires 5 minute
        user.otp = otp;
        user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.NODEMAILER_USERNAME,
              pass: process.env.NODEMAILER_PASS
            }
          });

          const mailOptions = {
            from: process.env.NODEMAILER_USERNAME,
            to: email,
            subject: 'Password Reset Request',
            text: `Use the verification code below to reset your password: ${otp}`
          };

          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              return res.status(500).send('An error occurred while sending the verification code.');
            } else {
                  res.status(200).json({
                  status: "OK",
                  message: "verification code send successfully to your email address"
              })
            }
          });
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}


export const checkOTP = async(req, res)=>{
    try {
        const { otp, email } = req.body;

        const user  = await Auth.findOne({email})

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
        
        if (user.otp !== otp) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }
    
        if (user.otpExpiresAt < new Date()) {
            return res.status(401).json({ message: 'OTP has expired' });
        }

        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        res.status(200).json({
            status: "OK",
            message: `OTP is valid`, 
        })
        
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}


export const resetPassword = async(req, res)=>{
    try {
        const {email, password } = req.body;

        const user  = await Auth.findOne({email})

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = password;

        await user.save();

        res.status(200).json({
            status: "OK",
            message: `password updated`, 
        })
        
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}


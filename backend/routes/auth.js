const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

const User = require('../models/User')


router.post('/register', async (req,res) => {
    const {username, password} = req.body

    //Simple Validation
    if(!username || !password)
    return res.status(400).json({sucess: false, message:'Missing username or password'})

    try {
        const user = await User.findOne({username})
        if(user)
            return res.status(400).json({sucess: false, message:'Username already taken'})
        
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({username, password: hashedPassword})
        await newUser.save()
        
        //return Token
        const accessToken = jwt.sign({UserId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

        res.status(200).json({sucess: true, message:"User created successfully", accessToken})

    } catch (error) {
        console.log(error)
        res.status(500).json({sucess: false, message:'Interval error'})

    }
})


//Login

router.post('/login', async(req,res) => {
    const {username, password} = req.body
    if(!username || !password)
    return res.status(400).json({sucess: false, message:'Missing username or password'})

    try {
        const user = await User.findOne({username})
        if(!user)
        return res.status(400).json({sucess: false, message:'Incorrect username or password'})
        
        //user Found
        const validPassword = await argon2.verify(user.password, password)
        if(!validPassword)
        return res.status(400).json({sucess: false, message:'Incorrect username or password'})

        const accessToken = jwt.sign({UserId: user._id}, process.env.ACCESS_TOKEN_SECRET)

        res.status(200).json({sucess: true, message:"Login successfully", accessToken})


    } catch (error) {
        console.log(error)
        res.status(500).json({sucess: false, message:'Interval error'})
    }

})

module.exports = router
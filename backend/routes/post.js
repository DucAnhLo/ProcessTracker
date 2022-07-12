const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const verfifyToken = require('../middleware/auth')

const Post = require('../models/Post')

//Get all post, user must log in

router.get('/',verfifyToken, async(req,res) => {
    try {
        const posts = await Post.find({user: req.UserId})
        res.status(200).json({success: true, posts})
    } catch (error) {
        console.log(error)
        res.status(500).json({sucess: false, message:'Interval error'})
    }
})




router.post('/',verfifyToken, async(req,res) => {
    const {title, description, url, status} = req.body

    //Simple Validation
    if(!title)
    return res.status(400).json({success: false, message:"Title is required"})

    try {
        const newPost = new Post({
            title,
            description,
            url,
            status: status || "TO LEARN",
            user: req.UserId
        })
        await newPost.save()
        res.status(200).json({success: true, message:'Happy learning!', post: newPost})

    } catch (error) {
        console.log(error)
        res.status(500).json({sucess: false, message:'Interval error'})
    }


})


module.exports = router
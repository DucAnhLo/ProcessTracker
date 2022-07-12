const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const verfifyToken = require('../middleware/auth')

const Post = require('../models/Post')

//Get all post, user must log in

router.get('/',verfifyToken, async(req,res) => {
    try {
        const posts = await Post.find({user: req.UserId}).populate('user', [
			'username'
		])
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


//Update
router.put('/:id',verfifyToken, async(req,res) => {
    const {title, description, url, status, user} = req.body
    if(!title)
    return res.status(400).json({success: false, message:"Title is required"})

    try {
        let updatedPost = {
            title,
            description: description || '',
            url: url || '',
            status: status || 'TO LEARN'
        }

        const updateCondition = {_id: req.params.id, user: req.UserId}

        updatedPost = await Post.findByIdAndUpdate(updateCondition, updatedPost, {new: true})

        //Unauthorized user try to update or post not found 
        if(!updateCondition)
        return res.status(401).json({success: false, message:"User unauthorized to update post or post not found"})

        res.status(200).json({success: true, message:"Update post successfully", post: updatedPost})


    } catch (error) {
        console.log(error)
        res.status(500).json({sucess: false, message:'Interval error'})
    }

})

//Delete Post

router.delete('/:id', verfifyToken, async(req,res) => {
    try {
        const deleteCondition = {_id: req.params.id, user:req.UserId}
        const deletedPost = await Post.findByIdAndDelete(deleteCondition)

        if(!deletedPost)
        return res.status(401).json({success: false, message:"User unauthorized to update post or post not found"})

        res.status(200).json({success: true, message:"Delete post successfully", post: deletedPost})


    } catch (error) {
        console.log(error)
        res.status(500).json({sucess: false, message:'Interval error'})
    }
})



module.exports = router
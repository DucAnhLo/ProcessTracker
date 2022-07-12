const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
require('dotenv').config()

app.use(express.json())
app.use('/api/v1/auth', authRouter )
app.use('/api/v1/posts', postRouter)
const connectDB = async () => {
    try {
       await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kszwffl.mongodb.net/?retryWrites=true&w=majority`) 
       console.log('DB connected')
    } catch (error) {
        console.log('error')
        process.exit(1)
    }
}

connectDB()


//Connect DB




const PORT = 5010
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server live at port ${PORT}`)
})
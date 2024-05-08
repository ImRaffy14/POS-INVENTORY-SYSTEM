require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')

// express app
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/users', userRoutes)


//db connection
mongoose.connect(process.env.MONGGO_URI)
.then((result) => {
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening to the port', process.env.PORT)
    })
})
.catch((err) => {
    console.log(err)
})
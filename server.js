const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

const PORT = process.env.PORT || 8000

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
require('dotenv').config()
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(allowCrossDomain)
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)

mongoose.connect('mongodb+srv://oleksandr:oleksandr1@authapp.3wxyv.mongodb.net/oleksandr?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB connected')
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log('server is running')
})

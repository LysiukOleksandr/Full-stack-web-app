const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const articleRoutes = require('./routes/articleRoutes')
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
app.use('/article', articleRoutes)

mongoose.connect(process.env.MONGODB, {
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

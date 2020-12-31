const {Schema, model} = require('mongoose')

const articleSchema = new Schema({
    image: {
        type: String,
        required:true
    },
    title: {
        required: true,
        type: String,
    },
    description:{
        required: true,
        type:String
    }
})

module.exports = model('Article', articleSchema)
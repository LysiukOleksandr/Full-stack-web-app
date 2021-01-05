const {Schema, model} = require('mongoose')

const articleSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    languages: {
        eng: {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            }
        },
        ru: {
            title: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            }
        },
        ua: {
            title: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            }
        }
    }
})

module.exports = model('Article', articleSchema)
const Article = require('../models/ArticleModel')
const translate = require('google-translate-free');

module.exports.uploadArticle = async (req, res) => {
    try {
        const article = new Article({
            image: req.file.path,
            title: req.body.articleTitle,
            description: req.body.articleDescription,
            content: req.body.articleContent
        })

        await article.save()

        res.status(201).json({
            message: 'The article was successfully created'
        })

    } catch (e) {
        res.status(400).json({
            message: "Something went wrong. Please, try again."
        })
    }
}

module.exports.getArticles = async (req, res) => {
    try {
        const limit = Number(req.query.limit)
        const offset = Number(req.query.offset)
        const articles = await Article.find().limit(limit).skip(offset)
        const count = await Article.find().countDocuments()
        res.status(200).json({
            articles,
            count
        })
    } catch (e) {
        res.status(400).json({
            message: "Something went wrong. Please, try again."
        })
    }
}

module.exports.getArticleDetails = async (req, res) => {
    try {
        const id = req.params.id
        const article = await Article.findById(id)
        res.status(200).json({
            article
        })

    } catch (e) {
        res.status(400).json({
            message: "Something went wrong. Please reload page."
        })
    }
}

module.exports.searchArticles = async (req, res) => {
    try {
        const articles = await Article.find({title: {$regex: req.query.value, $options: "i"}})
        const count = await Article.find({title: {$regex: req.query.value, $options: "i"}}).countDocuments()
        res.status(200).json({
            articles,
            count
        })
    } catch (e) {
        res.status(400).json({
            message: "Something went wrong. Please, try again."
        })
    }
}
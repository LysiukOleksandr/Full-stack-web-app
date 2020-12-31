const Article = require('../models/ArticleModel')

module.exports.uploadArticle = async (req, res) => {
    try {
        const article = new Article({
            image: req.file.path,
            title: req.body.articleTitle,
            description: req.body.articleDescription
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
        res.status(200).json({
            articles
        })

    } catch (e) {
        res.status(400).json({
            message: "Something went wrong. Please, try again."
        })
    }
}
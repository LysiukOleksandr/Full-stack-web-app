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


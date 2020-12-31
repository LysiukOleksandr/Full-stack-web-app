const express = require('express')
const articleController = require('../controllers/articleController')
const authController = require('../controllers/authController')
const multer = require("multer");

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/article')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)

    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter
})

router.post('/', authController.protect, upload.single('articleImage'), articleController.uploadArticle)
router.get('/', authController.protect, articleController.getArticles)
module.exports = router

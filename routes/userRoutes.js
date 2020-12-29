const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
})

const articleStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/article/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const articleUpload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
})

const router = express.Router()

router.get('/', authController.protect, userController.getUser)
router.post('/change', authController.protect, userController.changeUserData)
router.post('/change/userPhoto', authController.protect, upload.single('userPhoto'), userController.changeUserPhoto)
router.post('/change/userResume', authController.protect, upload.single('userResume'), userController.changeUserResume)
router.get('/change/downloadResume', authController.protect, userController.downloadUserResume)
module.exports = router
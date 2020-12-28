const User = require('../models/UserModel')

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.headers.id}).select('email name surname birthday userPhoto userResume')
        res.status(200).json({
            user
        })
    } catch (e) {
        res.status(401).json({
            message: 'Something went wrong. Please, try again.'
        })
    }
}

module.exports.changeUserData = async (req, res) => {
    try {
        const id = req.headers.id
        const user = await User.findOneAndUpdate({_id: id}, req.body.user).select('email name surname birthday userPhoto userResume')
        res.status(200).json({
            message: 'User information has been successfully updated.',
            user
        })
    } catch (e) {
        res.status(400).json({
            message: 'Something went wrong. Please, try again.'
        })
    }
}

module.exports.changeUserPhoto = async (req, res) => {
    try {
        const id = req.headers.id
        const photoPath = req.file.path
        const user = await User.findOneAndUpdate({_id: id}, {userPhoto: photoPath}).select('email name surname birthday userPhoto userResume')
        res.status(200).json({
            message: 'User photo has been successfully updated.',
            user
        })
    } catch (e) {
        res.status(400).json({
            message: 'Something went wrong. Please, try again.'
        })
    }
}

module.exports.changeUserResume = async (req, res) => {
    try {
        const id = req.headers.id
        let resumePath = req.file.path
        resumePath = resumePath.split('')
        resumePath.splice(7, 1, '//')
        resumePath = resumePath.join('')

        const user = await User.findOneAndUpdate({_id: id}, {userResume: resumePath}).select('email name surname birthday userPhoto userResume')
        res.status(200).json({
            message: 'User resume has been successfully updated.',
            user
        })
    } catch (e) {
        res.status(400).json({
            message: 'Something went wrong. Please, try again.'
        })
    }
}

module.exports.downloadUserResume = async (req, res) => {
    try {
        const id = req.headers.id
        const {userResume} = await User.findOne({_id: id}).select('userResume')
            res.download(String(userResume))


    } catch (e) {
        res.status(400).json({
            message: 'Something went wrong. Please, try again.'
        })
    }
}
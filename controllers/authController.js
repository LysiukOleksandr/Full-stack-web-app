const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

module.exports.login = async (req, res) => {
    try {
        const candidate = await User.findOne({email: req.body.email})
        if (candidate) {

            if(!candidate.isVerified){

                res.status(409).json({
                    message: 'Access is denied. Please, confirm your email.'
                })
            }

            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
            if (passwordResult) {
                const token = signToken(candidate._id)
                res.status(200).json({
                    message: 'You are successfully logged in',
                    token: `Bearer ${token}`,
                    user: {
                        id: candidate._id,
                        email: candidate.email,
                        isAuth: true
                    }
                })
            } else {
                res.status(401).json({
                    message: 'Passwords does not match. Please, try again.'
                })
            }
        } else {
            res.status(404).json({
                message: `User with this email ${req.body.email} does not found.`
            })
        }
    } catch (e) {
        res.status(400).json({
            message: "Something went wrong. Please, try again."
        })
    }
}

module.exports.register = async (req, res) => {
    try {
        const candidate = await User.findOne({email: req.body.email})
        if (candidate) {
            res.status(409).json({
                message: `User with email ${req.body.email} already exists.`
            })
        } else {
            const hashPassword = await bcrypt.hash(req.body.password, 8)
            const user = new User({
                email: req.body.email,
                password: hashPassword
            })
            await user.save()

            res.status(201).json({
                message: 'Account was successfully created.'
            })
            const token = signToken(user._id)
            const url = `http://localhost:8000/auth/verify?id=${token}`

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'edgarstone.official@gmail.com',
                    pass: 'edgar1212'
                }
            })

            let info = await transporter.sendMail({
                from: 'EdgarStore.corp',
                to: user.email,
                subject: 'Click the button, if you want to verify your account.',
                html: `
        <h3>Click the button below:</h3>
        <a href="${url}" target="_blank">Verify</a>
        `
            }, (err) => {
                if (error) {
                    console.log(err)
                }
                console.log('Email has been sent')
                // transporter.close()
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({
            message: 'Something went wrong. Please, try again.'
        })
    }
}

module.exports.verifyPassword = (req, res) => {
    const token = req.query.id;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    console.log(err)
                } else {
                    const id = decoded.id;
                    await User.findOne({_id: id}).updateOne({isVerified: true})
                    res.send(`
                        <h4>Email verified</h4>
                        <script>setTimeout(()=>{
                           window.close()
                        },3000)</script>
                    `
                    )
                }
            })
        } catch (err) {
            res.status(403).json({
                message: 'Failed to verify your email. Please, try again.'
            })
        }
    } else {
        res.status(403).json({
            messsage: 'Something went wrong. Please, try again.'
        })
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        const candidate = await User.findOne({email: req.body.email}).select('email')

        if (!candidate) {
            res.status(400).json({
                message: `User with email ${req.body.email} not found.`
            })
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const url = `http://localhost:3000/reset/${resetToken}`

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'edgarstone.official@gmail.com',
                pass: 'edgar1212'
            }
        })

        let info = await transporter.sendMail({
            from: 'EdgarStore.corp',
            to: req.body.email,
            subject: 'Click the button, if you want reset your password.',
            html: `
        <h3>Click the link below:</h3>
        <a href="${url}" target="_blank">Reset</a>
        `
        }, (err) => {
            if (error) {
                console.log(err)
            } else {
                res.status(200).json({
                    message: 'Email has been sent. Please, check your email.'
                })
            }
            // transporter.close()
        })

        await User.findOne({email: req.body.email}).updateOne({passwordResetToken: resetToken}).select('passwordResetToken')
        res.status(200).json({
            message: 'Email with reset link has been sent'
        })

    } catch (e) {
        res.status(400).json({
            message: 'Something went wrong. Please, try again.'
        })
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        const candidate = await User.findOne({passwordResetToken: req.headers.token})
        if (!candidate) {
            res.status(400).json({
                message: 'Incorrect link'
            })
        } else {
            const hashPassword = await bcrypt.hash(req.body.password, 8)
            await User.findOneAndUpdate({email: candidate.email}, {password: hashPassword, passwordResetToken: ''})
            res.status(200).json({
                message: "Password was changed successfully"
            })

        }
    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong. Please, try again.'
        })
    }
}
module.exports.protect = async (req, res, next) => {
    try {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        message: 'Unauthorized.'
                    })
                } else {
                    req.headers['id'] = decoded.id
                    next()
                }
            })
        }
    } catch (e) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
}


const User = require("../models/users")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utilities/jwt.js")

const registerUser = asyncHandler(async (req, res) => {
    const { myName, email, password } = req.body
    const userExists = await User.findOne({ email })
    const saltRounds = 10
    if (userExists) {
        res.status(400).json({message: "User already exists"})
    } else {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, password) {
                // Store hash in your password DB.

                const user = new User({
                    myName,
                    email,
                    password,
                })

                user.save()
                    .then((result) => {
                        res.json({
                            myName: myName,
                            email: email,
                            id: result.id,
                            userType: "Costumer",
                            token: generateToken(result.id),
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(400).json({message: err})
                    })
            })
        })
    }
})

const loginUser = asyncHandler(async (req, res) => {
    console.log("User Login")

    const { email, password } = req.body
    console.log(email)
    const user = await User.findOne({ email })
    console.log(user)
    flag = false
    if (user) {
        const flag = await bcrypt.compare(password, user.password)

        if (flag) {
            res.json({
                myName: user.myName,
                email: user.email,
                id: user.id,
                userType: "Costumer",
                token: generateToken(user.id),
            })
        } else {
            res.status(400).json({
                message: "Provided password is not correct.",
            })
        }
    } else {
        res.status(400).json({ message: "No account with this email exists." })
    }
})

const allUsers = asyncHandler(async (req, res) => {
    User.find({}).then(function (users) {
        console.log(users.length)
        res.send(users)
    })
})

module.exports = { registerUser, loginUser, allUsers }

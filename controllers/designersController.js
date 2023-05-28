const Designer = require("../models/designer")
const Shop = require("../models/shop")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utilities/jwt.js")

const registerDesigner = asyncHandler(async (req, res) => {
    const { myName, email, password, accountName, bankName, accountNo } =
        req.body
    const designerExists = await Designer.findOne({ email })
    const saltRounds = 10
    if (designerExists) {
        res.status(400).json({ message: "Designer already exist." })
    } else {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, password) {
                // Store hash in your password DB.

                const designer = new Designer({
                    myName,
                    email,
                    password,
                    accountName,
                    bankName,
                    accountNo,
                })

                designer
                    .save()
                    .then((result) => {
                        res.json({
                            id: result.id,
                            myName: myName,
                            email: email,
                            accountName: accountName,
                            bankName: bankName,
                            accountNo: accountNo,
                            userType: "Designer",
                            token: generateToken(result.id),
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(400).json({ messaeg: err })
                    })
            })
        })
    }
})

const loginDesigner = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log("Designer Login")
    const desiner = await Designer.findOne({ email })
    flag = false
    if (desiner) {
        const flag = await bcrypt.compare(password, desiner.password)

        if (flag) {
            res.json({
                id: desiner.id,
                name: desiner.myName,
                email: desiner.email,
                accountName: desiner.accountName,
                bankName: desiner.bankName,
                accountNo: desiner.accountNo,
                userType: "Designer",
                token: generateToken(result.id),
            })
        } else {
            res.status(400).json({ message: "Invalid Password" })
        }
    } else {
        res.status(400).json({ message: "Invalid Email" })
    }
})

const highestRating = asyncHandler(async (req, res) => {
    console.log("hello")

    const designer = await Designer.find({})
        .sort({ avgRatingOfProducts: -1 })
        .limit(3)

    return designer
})

const highestSales = asyncHandler(async (req, res) => {
    console.log("hello")

    const designer = await Designer.find({}).sort({ totalSales: -1 }).limit(3)

    return designer
})

const highestProducts = asyncHandler(async (req, res) => {
    console.log("hello")

    const designer = await Designer.find({})
        .sort({ totalNoOfOrders: -1 })
        .limit(3)

    return designer
})

const topRatedDesigners = asyncHandler(async (req, res) => {
    try {
        const maxRatingDesigner = await highestRating()
        const maxSalesDesigner = await highestSales()
        const maxProductSalesDesigner = await highestProducts()

        res.json({
            maxRatingDesigner: maxRatingDesigner,
            maxSalesDesigner: maxSalesDesigner,
            maxProductSalesDesigner: maxProductSalesDesigner,
        })
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

//AllProducts
const allProductofDesigners = asyncHandler(async (req, res) => {
    const id = req.params.id
    const shop = await Shop.find({ designer: id })
    if (shop) {
        const allProducts = shop.products

        res.json({
            allProducts,
        })
    } else {
        res.status(400).json({ message: "Unable to get the products" })
    }
})

module.exports = {
    registerDesigner,
    loginDesigner,
    allProductofDesigners,
    topRatedDesigners,
}

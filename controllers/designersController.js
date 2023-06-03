const Designer = require("../models/designer")
const Shop = require("../models/shop")
const Order = require("../models/order")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utilities/jwt.js")
const jwt = require("jsonwebtoken")

const getDesignerDetails = asyncHandler(async (req, res) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            var token = req.headers.authorization.split(" ")[1]
            var decoded = jwt.verify(token, process.env.SECRETKEY)

            const designer = await Designer.findOne({ _id: decoded.id })

            res.status(200).json({ ...designer._doc, userType: "Designer" })
        } catch (err) {
            res.status(401).json({
                message: err,
            })
        }
    } else {
        res.status(401).json({
            message: "Not logged IN",
        })
    }
})

const registerDesigner = asyncHandler(async (req, res) => {
    const { myName, email, accountName, bankName, accountNo } = req.body
    const designerExists = await Designer.findOne({ email })
    const saltRounds = 10
    if (designerExists) {
        res.status(400).json({ message: "Designer already exist." })
    } else {
        const designer = new Designer({
            myName,
            email,
            accountName,
            bankName,
            accountNo,
        })

        designer
            .save()
            .then((result) => {
                res.json({
                    _id: result.id,
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
    }
})

const loginDesigner = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log("Designer Login")
    const designer = await Designer.findOne({ email })
    flag = false
    if (designer) {
        const flag = await bcrypt.compare(password, desiner.password)

        if (flag) {
            res.json({
                _id: desiner.id,
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
        .limit(1)

    return designer
})

const highestSales = asyncHandler(async (req, res) => {
    console.log("hello")

    const designer = await Designer.find({}).sort({ totalSales: -1 }).limit(1)

    return designer
})

const highestProducts = asyncHandler(async (req, res) => {
    console.log("hello")

    const designer = await Designer.find({})
        .sort({ totalNoOfOrders: -1 })
        .limit(1)

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

const designerMonthlyData = asyncHandler(async (req, res) => {
    const designerID = req.query.id
    const month = req.query.month // Month provided by the user (1-12)
    const year = req.query.year // Year provided by the user

    const designer = await Designer.findById(designerID)

    const startDate = new Date(year, month - 1, 2) // Set the start date to the first day of the provided month and year
    const endDate = new Date(year, month, 1) // Set the end date to the last day of the provided month and year
    //console.log(startDate)
    //console.log(endDate)

    const filter = {}
    filter.createdAt = { $gte: startDate }
    filter.createdAt = { ...filter.createdAt, $lte: endDate }

    const orders = await Order.find(filter)
    //console.log(orders)

    let totalSales = 0
    let totalNoOfProductsSales = 0
    if (orders) {
        for (var order of orders) {
            for (var data of order.designerProducts) {
                if (data.designerID === designerID) {
                    for (var product of data.products) {
                        totalSales =
                            totalSales + product.price * product.quantity
                        totalNoOfProductsSales =
                            totalNoOfProductsSales + product.quantity
                    }
                }
            }
        }
        res.json({
            designer: {
                _id: designer._id,
                myName: designer.myName,
                totalNoOfProductsSales: totalNoOfProductsSales,
                totalSales: totalSales,
            },
        })
    } else {
        res.status(400).json({ message: "Unable to get the orders" })
    }
})

module.exports = {
    registerDesigner,
    loginDesigner,
    getDesignerDetails,
    allProductofDesigners,
    topRatedDesigners,
    designerMonthlyData,
}

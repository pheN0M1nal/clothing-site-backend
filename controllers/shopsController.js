const Designer = require("../models/designer")
const Shop = require("../models/shop")
const asyncHandler = require("express-async-handler")

//createShop
const createShop = asyncHandler(async (req, res) => {
    const { shopName, description } = req.body
    const designerID = req.params.designerID
    const designer = await Designer.findById(designerID)
    if (designer) {
        const _shop = Shop.findOne({ shopName: shopName })
        if (_shop) {
            res.status(400).json({ message: "Shop name already exists" })
        } else {
            const shop = new Shop({
                designerID: designerID,
                shopName: shopName,
                description: description,
            })

            try {
                await shop.save()
                res.json({
                    Shop: shop,
                })
            } catch (err) {
                res.status(400).json({ message: err })
            }
        }
    } else {
        res.status(400).json({ message: "Designer not found" })
    }
})

module.exports = { createShop }

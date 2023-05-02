const Shop = require('../models/shop')
const asyncHandler = require('express-async-handler')


//createShop
const createShop = asyncHandler(async (req, res) => {

    const {designerID, shopName, shopDescription} = req.body
    const designer = await Designer.findById(designerID)
    if(designer){

        const shop = new Shop({
            designerID: designerID,
            shopName: shopName,
            shopDescription: shopDescription
        })

        try{
            await shop.save()
            res.json({
                "Shop": shop
            })
        }
        catch(err){
    
            res.status(400).json({message: err})
    
        }
    
    }

})

module.exports = {createShop}
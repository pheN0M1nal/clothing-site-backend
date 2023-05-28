const asyncHandler = require("express-async-handler")
const Product = require('../models/products').schema


const checkout =  asyncHandler(async (req, res) => {
    const products = req.body.cartItems
    for(product in products){
        const id = porduct._id
        const _product = await Product.findById(id)
        if(product.size == 'S'){
            if (_product.quantity[0] > product.quatity){
                _product.quantity[0] = _product.quantity[0] - product.quatity
                await _product.save()
                next()
            }
            else{
                res.json({
                    message: product.productName + " is not avalaible"
                })
            }
        }
        else if(product.size == 'M'){
            if (_product.quantity[1] > product.quatity){
                _product.quantity[1] = _product.quantity[1] - product.quatity
                await _product.save()
                next()
            }
            else{
                res.json({
                    message: product.productName + " is not avaaible"
                })
            }
        }
        else if(product.size == 'L'){
            if (_product.quantity[2] > product.quatity){
                _product.quantity[2] = _product.quantity[2] - product.quatity
                await _product.save()
                next()
            }
            else{
                res.json({
                    message: product.productName + " is not avaaible"
                })
            }
        }
    }
})

module.exports = {checkout}
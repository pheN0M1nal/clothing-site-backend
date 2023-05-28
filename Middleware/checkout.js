const asyncHandler = require("express-async-handler")
const Product = require('../models/products')


const checkout =  asyncHandler(async (req, res) => {
    const products = req.body.cartItems
    for(product in products){
        const id = product._id
        const _product = await Product.findById(id)
        if(product.size === 'S'){
            if (_product.quantity[0] > product.quatity){
                _product.quantity[0] = _product.quantity[0] - product.quatity
                await _product.save()
                next()
            }
            else{
                res.json({
                    message: product.productName + " is not available"
                })
            }
        }
        else if(product.size ==='M'){
            if (_product.quantity[1] > product.quatity){
                _product.quantity[1] = _product.quantity[1] - product.quatity
                await _product.save()
                next()
            }
            else{
                res.json({
                    message: product.productName + " is not available"
                })
            }
        }
        else if(product.size === 'L'){
            if (_product.quantity[2] > product.quatity){
                _product.quantity[2] = _product.quantity[2] - product.quatity
                await _product.save()
                next()
            }
            else{
                res.json({
                    message: product.productName + " is not available"
                })
            }
        }
        else{
            res.json({
                message: "Wronge size information"
            })

        }
    }
})

module.exports = {checkout}
const asyncHandler = require("express-async-handler")
const Product = require('../models/products')


const checkout =  asyncHandler(async (req, res, next) => {
    const products = req.body.cartItems
    console.log(products)

    for(var product of products){

        let id = product._id
        const _product = await Product.findById(id)
        console.log(_product)


        if(product.size === 'S'){
            if (_product.quantity[0] > product.quantity){
                next()
            }
            else{
                res.json({
                    message: product.productName + " is not available"
                })
            }
        }
        else if(product.size === 'M'){
            if (_product.quantity[1] > product.quantity){
                next()
            }
            else{
                res.json({
                    message: product.productName + " is not available"
                })
            }
        }
        else if(product.size === 'L'){
            if (_product.quantity[2] > product.quantity){

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
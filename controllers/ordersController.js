const asyncHandler = require('express-async-handler')
const Order = require('../models/order')
const Product = require('../models/products')
const Designer = require('../models/designer')
const mongoose = require('mongoose')


const placeOrder = asyncHandler(async (req, res) => {
    const products = req.body.cartItems
    const userID = req.body.userID
    const fullName = req.body.fullName
    const postalCode = req.body.postalCode
    const address = req.body.address




    // updating data database
    for(var product of products){

        const productID = product._id
        const _product = await Product.findById(productID)
        const designerID = product.designerID
        const designer = await Designer.findById(designerID)

            
        // updating data of products in database 

        if(product.size === 'S'){
            _product.quantity[0] = _product.quantity[0] - product.quantity
            await _product.save()
        }
        else if(product.size ==='M'){
            _product.quantity[1] = _product.quantity[1] - product.quantity
            await _product.save()
        }
        else if(product.size === 'L'){
            _product.quantity[2] = _product.quantity[2] - product.quantity
            await _product.save()
        }
        else{
            res.json({
                message: "Wronge size information"
            })
        }
        
        
        // updating data of products in database 
        console.log(designer)
        designer.totalNoOfOrders = designer.totalNoOfOrders + product.quantity
        designer.totalSales = designer.totalSales + (product.price * product.quantity)
        await designer.save()




    }

    // creating product object array

    var _products = req.body.cartItems.map(product => {
        return {

            designerID: product.designerID,
            productID: product._id,
            productName: product.productName,
            image: product.image,
            size: product.size,
            price: product.price,
            quantity: product.quantity

        }
    })


    // Creating product array with index/key of designer ID

    const productsByDesigner = _products.reduce((acc, product) => {

        if (acc[product.designerID]) {
          acc[product.designerID].push(product);
        } else {
          acc[product.designerID] = [product];
        }
        return acc;
      }, {});

    // console.log(productsByDesigner)

    // array of designerID and Products arrays
    _designerProducts = []

    for (id in productsByDesigner){
        const designerID = id
        const products = productsByDesigner[id]

        _designerProducts.push({
            designerID,
            products
        })
    }

    // creating order
    const order = new Order({
        customerID: userID,
        designerProducts: _designerProducts,
        fullName: fullName,
        postalCode: postalCode,
        address: address

    })

    // console.log(order)
    try{
        await order.save()
        res.json(order)

    }
    catch(err){
        res.status(400).json({
            message: err
        })
    }





}) 

module.exports = {placeOrder}
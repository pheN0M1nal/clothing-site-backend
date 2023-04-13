const Product = require('../models/products')
const asyncHandler = require('express-async-handler')
const multiparty = require('multiparty')
const path = require('path')



const createProduct = asyncHandler (async (req, res) => {

    console.log('Creating product')
    console.log(process.env.IMAGE_UPLOAD_DIR)
    const path_ = path.join(path.resolve(), '/backend/uploads/images')
    console.log('Path :', path_)
    let form = new multiparty.Form({
        autoFiles: true,
        uploadDir: path_
    })
    
    form.parse(req, async function(err, fields, files){
        if(err) return res.send({error: err.message})

        console.log('fields = ' + JSON.stringify(fields, null, 2))
        console.log('files = ' + JSON.stringify(files, null, 2))
        
        var img_ = []
        for (img in files.image){
            
            const imagePath = files.image[0].path
            const fileName = imagePath.slice(imagePath.lastIndexOf("/") + 1)
            img_.push("http://localhost:5000/images/" + fileName)
        
        }

        const product = Product({
            productName: fields.productName[0], 
            image: img_, 
            category: fields.category[0], 
            price: fields.price[0], 
            description: fields.description[0], 
            quantity: fields.quantity, 
            size: fields.size,
            reviews: [],
            avgRating: 0,
            noOfReviews: 0,
            noOfSales: 0

        })
    
        await product.save()
        .then((result) => {
            res.json({
                "product": product 
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({
                "Error": err 
            })
    
            throw new Error('err')
        })
    

    })
    // console.log(req.body)
    // const {designerID, productName, image, category, price, description, quantity, size} = req.body
})


const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product removed.' })
    } 
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})


const updateProduct = asyncHandler(async (req, res) => {
  
    const {designerID, productName, image, category, price, description, quantity, size} = req.body
    console.log(req.params.id)
    const product = await Product.findById(req.params.id)
    console.log(product)

    if(product){

        product.designerID = designerID,
        product.productName = productName,
        product.image = image,
        product.category = category,
        product.price = price,
        product.description = description,
        product.quantity = quantity,
        product.size = size

        try{
            await product.save()
            res.json({
                "product": product
            })
        }
        catch(err){
            res.status(400).json({
                "err": err
            })
            
        }

    }
    else {

        res.status(404)
        throw new Error('Product not found')

    }

    

})


const getProductsByDesinerID = asyncHandler(async (req, res) => {
    const id = req.params.id
    const products = await Product.find({designerID: id})
    if(products){
        res.json({
            products
        })
    }
    else{
        res.status(400)
        throw new Error('Unable to get the products')
    }
})

const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id
    console.log(id)
    const product = await Product.findById(id)
    console.log(product)
    if(product){
        res.json({
            product
        })
    }
    else{
        res.status(400)
        throw new Error('Unable to get the products')
    }
})


const getProductByCategory = asyncHandler(async (req, res) => {
    const category = req.params.category
    const products = await Product.find({category: category})
    if(products){
        res.json({
            products
        })
    }
    else{
        res.status(400)
        throw new Error('Unable to get the products')
    }
})

const getAllProducts = asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1

    var skip = (page - 1) * limit
    
    await Product.find({}).limit(limit).skip(skip).then(function (products) {
        
        res.send(products);
        
    })
})

const placeRating = asyncHandler(async (req,res) => {
    const {avgRating, noOfReviews} = req.body
    console.log(req.params.id)
    const product = await Product.findById(req.params.id)
    console.log(product)

    if(product){
        product.noOfReviews = noOfReviews + 1
        product.avgRating = (avgRating*noOfReviews + req.params.rating) / (noOfReviews+1)

        try{
            await product.save()
            res.json({
                "product": product
            })
        }
        catch(err){
            res.status(400).json({
                "err": err
            })
            
        }
    }
    else {

        res.status(404)
        throw new Error('Product not found')

    }
})

module.exports = {createProduct, deleteProduct, getProductById, updateProduct,
                    getProductsByDesinerID, getProductByCategory, getAllProducts, placeRating}

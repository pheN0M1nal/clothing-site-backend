const Designer = require('../models/designer')
const Shop = require('../models/shop')
const asyncHandler = require('express-async-handler') 
const bcrypt = require('bcrypt')
const { generateToken } = require('../utilities/jwt.js') 

const registerDesigner = asyncHandler(async (req, res) => {

    const {myName, email, password, accountName, bankName, accountNo}  = req.body
    const designerExists = await Designer.findOne({ email })
    const saltRounds = 10;
    if (designerExists) {

        throw new Error('Designer already exist.')
	}
    else{
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, password) {
                // Store hash in your password DB.

                const designer = new Designer(
                    {
                        myName,
                        email,
                        password,
                        accountName,
                        bankName,
                        accountNo
                    }
                )

                designer.save()
                .then((result) => {
                    res.json({
                        id: result.id,
                        myName: myName,
                        email: email,
                        accountName: accountName,
                        bankName: bankName,
                        accountNo: accountNo,
                        userType: "Designer",
                        token: generateToken(result.id)})
                })
                .catch((err) => {
                    console.log(err)
                    throw new Error(err)
                })
            });
        });
        
    }
})

const loginDesigner = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    console.log("Designer Login")
	const desiner = await Designer.findOne({ email })
    flag = false;
    if (desiner){
        const flag = await bcrypt.compare(password, desiner.password);

        if(flag){
            res.json({
                id: desiner.id,
                name: desiner.myName,
                email: desiner.email,
                accountName: desiner.accountName,
                bankName: desiner.bankName,
                accountNo: desiner.accountNo,
                userType: "Designer",
                token: generateToken(result.id)
            })
        }
        else {

            throw new Error('Invalid Password')
            
        }

    }
	else {

		throw new Error('Invalid Email')
	}
})

//createShop

const createShop = asyncHandler(async (req, res) => {
    const {shopName, shopDescription} = req.body
    const id = req.params.id
    const designer = await Designer.findById(id)
    const shop = new Shop({
        shopName: shopName,
        shopDescription: shopDescription,
        products: [],
        orders: []
    })


    designer.shop = shop

    try{
        await designer.save()
        res.json({
            "designer": designer
        })
    }
    catch(err){

        throw new Error(err)

    }
    

})


//AddProductToShop
const addProductToShop = asyncHandler (async (req, res) => {

    console.log('Creating product')
    console.log(process.env.IMAGE_UPLOAD_DIR)
    const path_ = path.join(path.resolve(), '../uploads/images')
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
    
        await Shop.Product.save(product)
        .then((result) => {
            res.json({
                "product": product 
            })
        })
        .catch((err) => {
            console.log(err)
    
            throw new Error(err)
        })
    

    })
})


//AllProducts
const allProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    const shop = await Shop.find({designer: id})
    if(shop){
        const allProducts = shop.products

        res.json({

            allProducts
        })
    }
    else{

        throw new Error('Unable to get the products')
    }
})

module.exports = {registerDesigner, loginDesigner, createShop, allProduct, addProductToShop}

const Admin = require('../models/admin')
const Designer = require('../models/designer')
const User = require('../models/users')

const asyncHandler = require('express-async-handler') 
const bcrypt = require('bcrypt')
const { generateToken } = require('../utilities/jwt.js') 


const registerAdmin = asyncHandler(async (req, res) => {

    const {myName, email, password}  = req.body
    const adminExists = await Admin.findOne({ email })
    const saltRounds = 10;
    if (adminExists) {
		res.status(400)
		throw new Error('Admin already exist.')
	}
    else{
        
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, password) {
                // Store hash in your password DB.

                const admin = new Admin(
                    {
                        myName,
                        email,
                        password,
                    }
                )

                admin.save()
                .then((result) => {
                    res.json({

                        myName: myName,
                        email: email,
                        id: result.id,
                        token: generateToken(result.id)})
                        
                })
                .catch((err) => {
                    console.log(err)
                    res.status(400)
                    throw new Error(err)
                })
            });
        });
        
    }
})


const loginAdmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body
	const admin = await Admin.findOne({ email })
    flag = false;
    if (admin){
        const flag = await bcrypt.compare(password, admin.password);

        if(flag){
            res.json({
                myName: admin.myName,
                email: admin.email,
                id: admin.id,
                token: generateToken(admin.id)
                
            })
        }
        else {
            res.status(401)
            throw new Error('Invalid Password')
            
        }

    }
	else {
		res.status(401)
		throw new Error('Invalid Email')
	}
})


const deleteAdmin = asyncHandler(async (req, res) => {

    const admin = await Admin.findById(req.params.id)
    if (admin) {
        await admin.remove()
        res.json({ message: 'Admin removed.' })
    } 
    else {
        res.status(404)
        throw new Error('Admin not found')
    }
})

const deleteDesigner = asyncHandler(async (req, res) => {
    const designer = await Designer.findById(req.params.id)
    if (designer) {
        await designer.remove()
        res.json({ message: 'Designer removed.' })
    } 
    else {
        res.status(404)
        throw new Error('Designer not found')
    }
})
  
//All admins
const getAllAdmins = asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1

    var skip = (page - 1) * limit
    
    await Admin.find({}).limit(limit).skip(skip).then(function (admins) {
        
        res.send(admins);
        
    })
})

//All users
const getAllUsers = asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1

    var skip = (page - 1) * limit
    
    await User.find({}).limit(limit).skip(skip).then(function (users) {
        
        res.send(users);
        
    })
})

//All Designers
const getAllDesigners = asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1

    var skip = (page - 1) * limit
    
    await Designer.find({}).limit(limit).skip(skip).then(function (designers) {
        
        res.send(designers);
        
    })
})

module.exports = {registerAdmin, loginAdmin, deleteAdmin, 
    deleteDesigner, getAllAdmins, getAllUsers, getAllDesigners}

const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler') 
const User = require('../models/users.js')


const protected = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try{

            var token = req.headers.authorization.split(" ")[1];
            var decoded = jwt.verify(token, process.env.SECRETKEY);
            console.log("ID : ", decoded)
            const user = await User.findOne( { id: decoded.id } )

            next()
            
        }
        catch(err) {
            res.status(401).json({
                message: err
            })
        }
    }
    else{

        res.status(401).json({
            message: "Not logged IN"
        })

    }

})


module.exports = { protected }
const express = require("express")
const router = express.Router()
const { protected } = require("../Middleware/authMiddleware")
const { protectedForAdmin } = require("../Middleware/adminMiddleware")
const {
    registerUser,
    loginUser,
    allUsers,
    getUserDetails,
} = require("../controllers/userController")

router.post("/registerUser", registerUser)
router.post("/loginUser", loginUser)
router.get("/allUsers", protected, protectedForAdmin, allUsers)

router.get("/", getUserDetails)

module.exports = router

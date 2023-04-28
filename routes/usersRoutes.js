const express = require("express")
const router = express.Router()
const { protected } = require("../Middleware/authMiddleware")
const { protectedForAdmin } = require("../Middleware/adminMiddleware")
const { registerUser, loginUser, allUsers } = require("../controllers/userController")

router.post("/registerUser", registerUser)
router.post("/loginUser", loginUser)
router.get("/allUsers", protected, protectedForAdmin, allUsers)

module.exports = router

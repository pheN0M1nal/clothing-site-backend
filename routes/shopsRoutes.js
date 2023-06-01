const express = require("express")
const router = express.Router()
const { createShop, getShopDetails } = require("../controllers/shopsController")

router.post("/createShop", createShop)
router.get("/", getShopDetails)

module.exports = router

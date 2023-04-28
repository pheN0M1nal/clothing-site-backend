const express = require('express');
const router = express.Router();
const {createShop} = require("../controllers/shopsController")


router.post("/createShop", createShop)


module.exports = router;
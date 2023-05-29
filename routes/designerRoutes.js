const express = require("express")
const router = express.Router()
const {
    registerDesigner,
    loginDesigner,
    allProductofDesigners,
    topRatedDesigners,
    getDesignerDetails,
} = require("../controllers/designersController")

router.post("/registerDesigner", registerDesigner)
router.post("/loginDesigner", loginDesigner)
router.get("/allProduct/:id", allProductofDesigners)
router.get("/topRatedDesigners", topRatedDesigners)
router.get("/", getDesignerDetails)

module.exports = router

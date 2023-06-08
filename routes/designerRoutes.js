const express = require("express")
const router = express.Router()
const {
    registerDesigner,
    getDesignerDetails,
    loginDesigner,
    allProductofDesigners,
    topRatedDesigners,
    designerMonthlyData,
    updateDesigner
} = require("../controllers/designersController")

router.post("/registerDesigner", registerDesigner)
router.post("/loginDesigner", loginDesigner)
router.get("/allProduct/:id", allProductofDesigners)
router.get("/topRatedDesigners", topRatedDesigners)
router.get("/", getDesignerDetails)

router.post("/registerDesigner", registerDesigner)
router.post("/loginDesigner", loginDesigner)
router.get("/allProduct/:id", allProductofDesigners)
router.get("/topRatedDesigners", topRatedDesigners)
router.get("/designerMonthlyData", designerMonthlyData)
router.put("/updateDesigner", updateDesigner)
router.get("/", getDesignerDetails)


module.exports = router

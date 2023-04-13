const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, deleteAdmin, deleteDesigner,
     getAllAdmins, getAllUsers, getAllDesigners } =  require('../controllers/adminController')


router.post('/registerAdmin', registerAdmin)
router.post('/loginAdmin', loginAdmin)
router.delete('/deleteAdmin/:id', deleteAdmin)
router.delete('/deleteDesigner', deleteDesigner)
router.get('/allAdmins', getAllAdmins)
router.get('/allUsers', getAllUsers)
router.get('/allDesigners', getAllDesigners)

module.exports = router;
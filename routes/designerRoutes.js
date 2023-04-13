const express = require('express');
const router = express.Router();
const { registerDesigner } =  require('../controllers/designersController')


router.post('/registerDesigner', registerDesigner)


module.exports = router;
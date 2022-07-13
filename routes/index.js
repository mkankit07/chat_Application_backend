const express=require('express');
const router=express.Router();
const userController = require('../controller/userController')

router.post('/api/auth',userController.newUserAdd)
router.post("/api/login",userController.loginAuth)
router.post("/api/set-avatar/:id",userController.updateUseImage)
router.get("/api/getAllUser/:id",userController.getAllUsers)

module.exports = router
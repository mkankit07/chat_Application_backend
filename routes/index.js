const express=require('express');
const router=express.Router();
const userController = require('../controller/userController')
const messageController = require('../controller/messageController');
router.post('/api/auth',userController.newUserAdd)
router.post("/api/login",userController.loginAuth)
router.post("/api/set-avatar/:id",userController.updateUseImage)
router.get("/api/getAllUser/:id",userController.getAllUsers)
router.post("/api/sendmessage",messageController.SendMsg)
router.post("/api/getmsg",messageController.getMsg)
module.exports = router
const express=require('express');
const { LoginUser } = require('../controllers/login');
const router=express.Router();
router.post('/',LoginUser)
module.exports=router;
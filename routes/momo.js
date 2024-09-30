const express=require('express');
const { MOMO_Payment_Create_User_Id,MOMO_Payment_Get_User_Detail,MOMO_Payment_Create_Api_key,MOMO_callback} = require('../controllers/momo_payment.js');
const router=express.Router();
router.post('/create_user_Id',MOMO_Payment_Create_User_Id)
router.post('/create_apikey',MOMO_Payment_Create_Api_key)
router.get('/get_user_detail',MOMO_Payment_Get_User_Detail)
router.post('/momo_callback',MOMO_callback)
module.exports=router;
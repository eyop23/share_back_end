const express=require('express');
const router=express.Router();
const  {updatepassword,getMe, getBuyer}=require('../controllers/user');
const {protect}=require('../middleware/authMiddelware');
// router.post('/register',protect,isAdmin,registerShareholder)
router.put('/',protect,updatepassword);
router.get('/info',protect,getMe)
module.exports=router;
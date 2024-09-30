const express=require('express');
const { UserContact } = require('../controllers/contactus');
const router=express.Router();
router.post('/',UserContact)
module.exports=router;
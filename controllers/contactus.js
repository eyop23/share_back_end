const asyncHandler = require('express-async-handler');
const contactus = require('../model/contactus');
const UserContact=asyncHandler(async(req,res)=>{
    const{Email,Message,Name}=req.body;
    if(!Email || !Message || !Name ){
      res.status(404);
      throw new Error('add all field');
    
  }
  let contact=new contactus({
    Name:req.body.Name,
    Email:req.body.Email,
    Message:req.body.Message,
  })
  contact.save().then(()=>{
    res.json({
      message:"saved"
    })
  })
  .catch((error)=>{
    res.json({
      error:`${error} error`
    })
  })
})
  module.exports={
    UserContact,
  }
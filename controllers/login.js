const asyncHandler = require('express-async-handler');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Shareholders=require('../model/share');
const LoginUser=asyncHandler(async(req,res)=>{
  console.log(req.body)
    const{email,password}=req.body;
    console.log(email)
    console.log(typeof email)
    if(!email || !password ){
      res.status(404);
      throw new Error('can not create');
    }
    const userExist=await Shareholders.findOne({email:email});
    console.log(userExist)
    if(userExist && (await bcrypt.compare(password,userExist.password))){
      console.log("+++++++++++++++++++")
      res.status(201).json({
        _id:userExist.id,
        email:userExist.email,
        firstname:userExist.firstname,
        lastname:userExist.lastname,
        middlename:userExist.middlename,
        phoneNo:userExist.phoneNo,
        roll:userExist.roll,
        token:generateToken(userExist._id),
        // ok:"userloged"
      })
    }
      else {
        console.log("____________________________")
        res.status(400).json({error:'Invalid Credentials'})
       }
  }
  )
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    })
  }
  module.exports={
    LoginUser,
    generateToken
  }
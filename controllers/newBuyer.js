const asyncHandler = require('express-async-handler');
const bcrypt=require('bcryptjs');
const  mongoose = require('mongoose');
const request = require('request');
const buyers=require('../model/buyshare');
const Shareholders = require('../model/share');

const getNewBuyer=asyncHandler(async (req,res)=>{
    const user=await buyers.find();
    res.json(user);
})
const getBuyerById=asyncHandler(async (req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'no new buyer found'})
      }
      const share=await buyers.findById({_id:id});
      if(share){
       res.json(share);
      }
})
const createNew=asyncHandler(async(req,res)=>{
    const {firstname,middlename,lastname,country,email,city,subcity,wereda,password,houseNo,phoneNo,shareamount}=req.body;
    if( !firstname || !middlename || !lastname  || !country ||!email || !city || !subcity || !password || !wereda || !houseNo || !phoneNo || !shareamount){
      res.status(404);
      throw new Error("please fill all filed");
    }
  const userExist=await buyers.findOne({email});
  if(userExist){
    res.status(404);
    throw new Error("user already exists change your email"); //user on pending status
  }
  const shareExist=await Shareholders.findOne({email});
  if(shareExist){
    res.status(404);
    throw new Error("shareholder already exists change your email"); 
  }
  if(shareamount < 1000){
    res.status(404);
    throw new Error("minimum shareamount should be 1000 birr");
  }
  if(shareamount > 100000){
    res.status(404);
    throw new Error("maximum shareamount should be 100,000 birr");
  }
  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(password,salt);
  let share=new buyers({
    firstname:req.body.firstname,
    middlename:req.body.middlename,
    lastname:req.body.lastname,
    email:req.body.email,
    password:hashedPassword,
    country:req.body.country,
    city:req.body.city,
    subcity:req.body.subcity,
    wereda:req.body.wereda,
    houseNo:req.body.houseNo,
    phoneNo:req.body.phoneNo,
    shareamount:req.body.shareamount,
  })
  if(req.file){
    share.image=req.file.path;
  }
let options = {
  'method': 'POST',
  'url': 'https://api.chapa.co/v1/transaction/initialize',
  'headers': {
    'Authorization': `Bearer ${process.env.Secret_key}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "amount": req.body.shareamount,
    "currency": "ETB",
    "email":req.body.email,
    "first_name": req.body.firstname,
    "last_name": req.body.lastname,
    "phone_number": req.body.phoneNo,
    "tx_ref": share._id,
    "callback_url": "http://localhost:8000/api/transaction",
    "return_url": "http://localhost:3000",
    "customization[title]": "Payment for buying a share",
    "customization[description]": "I love online payments"
  })
};
request(options, async function (err, response) {
    try {
      const result=await JSON.parse(response.body);
      // console.log(result.status)
      if(result.status==='success'){
        await share.save();
      }
   res.json({message:result.data.checkout_url})
  }
   catch (error) {
    // console.log(err)
    res.json({
  error:`something were wrong please cheak ur internet connection...${err}`})
   }
})})
const deleteNewBuyer=asyncHandler(async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'no newbuyer found'})
  }
  const shareholder = await buyers.findById(id)
  if (!shareholder) {
    res.status(400)
    throw new Error('newbuyer not found');
  }
  await shareholder.deleteOne({_id:id})
  res.status(204).json({ id:id })
})

module.exports={
 getNewBuyer,
 createNew,
 getBuyerById,   
 deleteNewBuyer,
}
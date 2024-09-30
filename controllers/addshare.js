const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const request = require('request');
const oldshareholder = require('../model/shareamount');
const increaseShare=asyncHandler(async(req,res)=>{
  const {firstname,email,shareamount,lastname,middlename,phoneNo}=req.body;
  if(!firstname || !middlename || !lastname || !phoneNo|| !email || !shareamount){
    res.status(404);
    throw new Error("please fill all fields");
  }
  let share=new  oldshareholder({
    firstname,
    middlename,
    lastname,
    phoneNo,
    email,
    shareamount,
});
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
  "callback_url": "http://localhost:8000/api/selltransaction",
  "return_url": "http://localhost:3000/shareholder/dashboard",
  "customization[title]": "Payment for my favourite merchant",
  "customization[description]": "I love online payments"
})
};
try {
  request(options, async function (error, response) {
  if (error){
    console.log(error)
    return  res.json({
    error:"something were wrong please cheak ur internet connection"
  });}
   const result=await JSON.parse(response.body);
  res.json({
    message:result.data.checkout_url
  })
  share.save().then(async(response)=>{
    console.log("saved");
  })
    .catch(error=>{
    console.log(error)
    res.json({
      message:"error"
    })
  })
  });
} catch (error) {
  console.log(error)
}
})
const getoldshareholders=asyncHandler(async(req,res)=>{
  const share=await oldshareholder.find();
  if(!share){
    res.status(500)
    throw new Error('no shareholder found')
  }
  res.status(200).json(share);
})
const getShareholderById=asyncHandler(async (req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'no shareholder found'})
      }
      const share=await oldshareholder.findById({_id:id});
      if(share){
       res.json(share);
      }
})
const deleteShare=asyncHandler(async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'no shareholder found'})
  }
  const shareholder = await oldshareholder.findById(id)
  if (!shareholder) {
    res.status(400)
    throw new Error('shareholder not found');
  }
  await oldshareholder.deleteOne({_id:id})
  res.status(200).json({ id:id })
})
module.exports={
    increaseShare,
    getoldshareholders,
    getShareholderById,
    deleteShare
}


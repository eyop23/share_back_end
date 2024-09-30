const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const request = require('request');
const transaction = require('../model/transaction');
const posttransaction=asyncHandler(async(req,res)=>{
    const value=req.query.trx_ref; //chapa unique value to verify the payement
    // console.log(value)
    let options = {
      'method': 'GET',
      'url': `https://api.chapa.co/v1/transaction/verify/${value}`,
      'headers': {
        'Authorization': `Bearer ${process.env.Secret_key}`,
      }
    };
    request(options, async function(error, response) {
      if (error) {
        throw new Error(error);
      }
       const result=await JSON.parse(response.body);
      // console.log(result);
      let payment=new transaction({
        first_name:result.data.first_name,
        last_name:result.data.last_name,
        email:result.data.email,
        currency:result.data.currency,
        amount:result.data.amount,
      })
      payment.save().then(async(response)=>{
        console.log("ok")
        res.json({
          message:"saved"
        })
      }).catch(error=>{
        console.log("failed")
        res.json({
          message:"error"
        })
      })
    });
})
const getTransaction=asyncHandler(async (req,res)=>{
        const {email}=req.params;
      const transactionhistory=await transaction.findOne({email});
      if(!transactionhistory){
        res.status(404);
        throw new Error("'no transaction occured with this email'");
      }
      else{
        res.json(transactionhistory);
      }
})
module.exports={
    posttransaction,
    getTransaction
}


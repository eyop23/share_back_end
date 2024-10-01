const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const request = require("request");
const shareTransaction = require("../model/updatedtransaction");
const postNewtransaction = asyncHandler(async (req, res) => {
  let value = req.params.id;
  console.log("add share transaction id>>>>>>>>>>>>>>>>>>>>>>>"); //chapa unique value to verify the payement
  console.log(value);

  if (!value) {
    return res.status(400).json({
      message: "Transaction ID is missing",
    });
  }
  let options = {
    method: "GET",
    url: `https://api.chapa.co/v1/transaction/verify/${value}`,
    headers: {
      Authorization: `Bearer ${process.env.Secret_key}`,
    },
  };
  request(options, async function (error, response) {
    if (error) {
      throw new Error(error);
    }
    const result = await JSON.parse(response.body);
    console.log(result);
    if (result.data && result.data.status === "success") {
      let payment = new shareTransaction({
        first_name: result.data.first_name,
        last_name: result.data.last_name,
        email: result.data.email,
        currency: result.data.currency,
        amount: result.data.amount,
        tx_ref: result.data.tx_ref,
        status: result.status,
      });
      payment
        .save()
        .then(async (response) => {
          console.log("ok");
          res.json({
            message: "saved",
          });
        })
        .catch((error) => {
          console.log("failed");
          res.json({
            message: "error",
          });
        });
    } else {
      res.status(400).json({
        message: "Transaction verification failed or not successful",
        status: result.data ? result.data.status : "Unknown",
      });
    }
  });
});
const getNewTransaction = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const transactionhistory = await shareTransaction.findOne({ email });
  if (!transactionhistory) {
    res.status(404);
    throw new Error("'no transaction occured with this email'");
  } else {
    res.json(transactionhistory);
  }
});
// const deleteNewTransaction=asyncHandler(async(req,res)=>{
//     const {email}=req.params;
//     const shareholder = await shareTransaction.findOne({email:email})
//     if (!shareholder) {
//       res.status(400)
//       throw new Error('no transaction history found');
//     }
//     await shareTransaction.deleteOne({email:email})
//     res.status(200).json({ email:email ,message:"transaction history deleted"})
//   })
module.exports = {
  postNewtransaction,
  getNewTransaction,
  // deleteNewTransaction
};

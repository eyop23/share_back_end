const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const request = require("request");
const transaction = require("../model/transaction");
// const posttransaction = asyncHandler(async (req, res) => {
//   const value = req.query.trx_ref;
//   console.log("trasn id>>>>>>>>>>>>>>>>>>>>>>>"); //chapa unique value to verify the payement
//   console.log(value);
//   let options = {
//     method: "GET",
//     url: `https://api.chapa.co/v1/transaction/verify/${value}`,
//     headers: {
//       Authorization: `Bearer ${process.env.Secret_key}`,
//     },
//   };
//   request(options, async function (error, response) {
//     if (error) {
//       throw new Error(error);
//     }
//     const result = await JSON.parse(response.body);
//     if (result.data && result.data.status === "success") {
//       let payment = new transaction({
//         first_name: result.data.first_name,
//         last_name: result.data.last_name,
//         email: result.data.email,
//         currency: result.data.currency,
//         amount: result.data.amount,
//         tx_ref: result.data.tx_ref,
//         status: result.status,
//       });
//       payment
//         .save()
//         .then(async (response) => {
//           console.log("ok");
//           res.json({
//             message: "saved",
//           });
//         })
//         .catch((error) => {
//           console.log("failed");
//           res.json({
//             message: "error",
//           });
//         });
//     } else {
//       res.status(400).json({
//         message: "Transaction verification failed or not successful",
//         status: result.data ? result.data.status : "Unknown",
//       });
//     }
//   });
// });
const getTransaction = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const transactionhistory = await transaction.findOne({ email });
  if (!transactionhistory) {
    res.status(404);
    throw new Error("'no transaction occured with this email'");
  } else {
    res.json(transactionhistory);
  }
});
const posttransaction = asyncHandler(async (req, res) => {
  const value = req.query.trx_ref;
  console.log("Transaction ID:", value); // Log the transaction reference

  let options = {
    method: "GET",
    url: `https://api.chapa.co/v1/transaction/verify/${value}`,
    headers: {
      Authorization: `Bearer ${process.env.Secret_key}`,
    },
  };

  try {
    // Make the request to the Chapa API
    const response = await new Promise((resolve, reject) => {
      request(options, (error, response) => {
        if (error) {
          return reject(error); // Reject the promise if there's an error
        }
        resolve(response);
      });
    });

    const result = JSON.parse(response.body);

    // Check if the transaction was successful
    if (result.data && result.data.status === "success") {
      // Create a new payment entry
      let payment = new transaction({
        first_name: result.data.first_name,
        last_name: result.data.last_name,
        email: result.data.email,
        currency: result.data.currency,
        amount: result.data.amount,
        tx_ref: result.data.tx_ref,
        status: result.data.status, // Ensure you get the correct status
      });

      // Save the payment to the database
      await payment.save();
      console.log("Payment saved successfully.");
      return res.json({ message: "Payment saved successfully." });
    } else {
      return res.status(400).json({
        message: "Transaction verification failed or not successful",
        status: result.data ? result.data.status : "Unknown",
      });
    }
  } catch (error) {
    console.error("Error occurred during transaction verification:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = {
  posttransaction,
  getTransaction,
};

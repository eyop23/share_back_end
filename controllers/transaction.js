const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const request = require("request");
const transaction = require("../model/transaction");
const posttransaction = asyncHandler(async (req, res) => {
  let value = req.params.id;
  console.log("trasn id>>>>>>>>>>>>>>>>>>>>>>>"); //chapa unique value to verify the payement
  console.log(value);
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
    if (result.data && result.data.status === "success") {
      let payment = new transaction({
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
// const posttransaction = asyncHandler(async (req, res) => {
// const event = req.body;

// Check if the event indicates a successful charge
// if (event.event === "charge.success") {
//   try {
//     // Create a new transaction record
//     const payment = new transaction({
//       first_name: event.first_name || "", // Default to an empty string if null
//       last_name: event.last_name || "",   // Default to an empty string if null
//       email: event.email || null,          // Can be null
//       currency: event.currency,
//       amount: parseFloat(event.amount),    // Convert string to number
//       status: event.status,
//       tx_ref: event.tx_ref,
//     });

//     // Save the transaction to the database
//     await payment.save();
//     console.log("Payment saved successfully:", payment);

//     // Send a success response
//     return res.status(200).send({ message: "Payment recorded" });
//   } catch (error) {
//     console.error("Error saving payment:", error);
//     // Send an error response
//     return res.status(500).send({ message: "Internal server error" });
//   }
// } else {
//   // If the event is not a successful charge, just respond with a 200 OK
//   return res.status(200).send({ message: "Event received, not a charge success" });
// }

// });

module.exports = {
  posttransaction,
  getTransaction,
};

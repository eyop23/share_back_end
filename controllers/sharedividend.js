const Shareholders=require('../model/share');
// Calculate dividends for all shareholders
async function calculateDividends(req, res) {
  try {
    // Retrieve input data from request body
    const totalShares = +req.body.totalShareAmount;
    const profit=+req.body.totalProfit;
    console.log(totalShares)
    // Retrieve all shareholders from database
    const shareholders = await Shareholders.find();

    // Calculate dividend per share
    const dividendPerShare = profit / totalShares;
    // Calculate and update dividend for each shareholder
    for (let i = 0; i < shareholders.length; i++) {
      const share = shareholders[i];
      const dividend = share.shareamount * dividendPerShare;
      share.shareamount+= dividend;
      share.shareamount.toPrecision(2);
      await share.save();
    }

    res.status(200).json({ message: "Dividends calculated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error calculating dividends." });
  }
}
module.exports={calculateDividends}
































// // Calculate dividends for all shareholders
// const asyncHandler = require('express-async-handler');
// const Shareholders=require('../model/share');
// const calculateDividends=asyncHandler(async (req,res) => {
//   const { totalShares, profit} = req.body;
//   const shareholders = await Shareholders.find();
//  // Calculate dividend per share
//   const dividendPerShare = profit / totalShares;
//   // console.log(shareholders)
//         // Calculate and update dividend for each shareholder
//     for (let i = 0; i < shareholders.length; i++) {
//       const share = shareholders[i];
//       const dividend = share.shareamount * dividendPerShare;
//       console.log(dividend);
//       share.shareamount += dividend;
//       await share.save();
//       res.status(200).json({ message: "Dividends calculated successfully." });
//     }
//     if(!shareholders){
//       console.error(error);
//       res.status(500).json({ message: "Error calculating dividends." });
//     }
// })
// module.exports = { 
//   calculateDividends 
// };
/*-totalShares: Total number of shares outstanding.
- amount: Total amount of dividends to be paid.
- paymentDate: Date of dividend payment.*/
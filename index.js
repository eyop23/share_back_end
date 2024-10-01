const express = require("express");
const cloudinary = require("cloudinary").v2; // Import Cloudinary
// MONGO_URL= "mongodb://localhost:27017/share"
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const port = process.env.PORT || 5000;
const cors = require("cors");
// mongoose.Promise=global.Promise;
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/share", require("./routes/shareapi"));
app.use("/momo", require("./routes/momo")); //momo test

app.use("/api/user", require("./routes/userapi"));
app.use("/api/addshareamount", require("./routes/addshare"));
app.use("/api/login", require("./routes/loginapi"));
app.use("/api/contactus", require("./routes/contactus"));
app.use("/api/adminnews", require("./routes/adminnews"));
app.use("/api/transaction", require("./routes/transaction"));
app.use("/api/selltransaction", require("./routes/selltransaction"));
app.use("/api/calculate-dividend", require("./routes/dividend"));
app.use("/api/buyer", require("./routes/buyers"));
app.use(errorHandler);
app.all("*", (req, res, next) => {
  res.json({ err: "page not found" });
  // console.log("error");
  next();
});
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port, () => {
    console.log(`server is running at port ${port}....`);
  });
});

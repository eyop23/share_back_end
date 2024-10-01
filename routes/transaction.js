const express = require("express");
// const { isAdmin, protect } = require('../middleware/authMiddelware');
const {
  posttransaction,
  getTransaction,
} = require("../controllers/transaction");
const { protect, isAdmin } = require("../middleware/authMiddelware");

const router = express.Router();

router.get("/:id", posttransaction);
// router.post("/", protect, isAdmin, posttransaction);
router.get("/:email", protect, getTransaction);

module.exports = router;

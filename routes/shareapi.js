const express = require("express");
const router = express.Router();
const {
  getShare,
  approveUser,
  updateShareAmount,
  deleteShare,
  getShareById,
} = require("../controllers/shareInfo");
const { protect, isAdmin } = require("../middleware/authMiddelware");
const upload = require("../middleware/upload");
router.get("/", protect, isAdmin, getShare);
// router.get('/edit_shareholder/:id',protect,getShareById);
router.get("/shareholder_details/:id", protect, isAdmin, getShareById);
router.post("/", protect, isAdmin, approveUser);
router.put("/:email", protect, isAdmin, updateShareAmount);
router.delete("/:id", deleteShare);
module.exports = router;

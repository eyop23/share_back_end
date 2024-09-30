const express = require('express');
const { calculateDividends } = require('../controllers/sharedividend');
const { isAdmin, protect } = require('../middleware/authMiddelware');
// const { calculateDividends } = require('../controllers/dividendController');

const router = express.Router();

router.post('/',protect,isAdmin,calculateDividends);
module.exports = router;
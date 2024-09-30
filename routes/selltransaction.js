const express = require('express');
const { posttransaction, getTransaction } = require('../controllers/transaction');
const { protect } = require('../middleware/authMiddelware');
const { postNewtransaction, getNewTransaction, deleteNewTransaction } = require('../controllers/selltransaction');

const router = express.Router();

router.get('/',postNewtransaction);
router.get('/:email',getNewTransaction);
// router.delete('/:email',deleteNewTransaction);

module.exports = router;
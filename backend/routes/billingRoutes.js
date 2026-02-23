const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const billingController = require('../controllers/billingController');

router.post(
  '/create',
  auth,
  role('admin','receptionist'),
  billingController.createBill
);

router.get(
  '/',
  auth,
  role('admin','manager','receptionist'),
  billingController.getBills
);

module.exports = router;
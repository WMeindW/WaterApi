const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// API pro vytvoření zákazníka
router.post('/', customerController.createCustomer);

// API pro získání seznamu zákazníků
router.get('/', customerController.getAllCustomers);

module.exports = router;

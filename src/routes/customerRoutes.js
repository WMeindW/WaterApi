const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Endpoint pro získání všech zákazníků
router.get('/', customerController.getAllCustomers);

// Endpoint pro získání zákazníka podle ID
router.get('/:id', customerController.getCustomerById);

// Endpoint pro vytvoření nového zákazníka
router.post('/', customerController.createCustomer);

// Endpoint pro aktualizaci zákazníka
router.put('/:id', customerController.updateCustomer);

// Endpoint pro smazání zákazníka
router.delete('/:id', customerController.deleteCustomer);

// Endpoint pro blokování zákazníka
router.put('/block/:id', customerController.blockCustomer);

// Endpoint pro aktivaci zákazníka
router.put('/activate/:id', customerController.activateCustomer);

module.exports = router;

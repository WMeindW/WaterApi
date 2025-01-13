const express = require('express');
const router = express.Router();
const triggerController = require('../controllers/triggerController');

// API pro přidání triggeru
router.post('/', triggerController.createTrigger);

// API pro získání triggerů pro zákazníka
router.get('/:customerId', triggerController.getTriggersForCustomer);

module.exports = router;
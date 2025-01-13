const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meterController');

// API pro přidání měřidla
router.post('/', meterController.addMeter);

// API pro získání seznamu měřidel
router.get('/', meterController.getAllMeters);

module.exports = router;

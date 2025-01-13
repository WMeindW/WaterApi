const db = require('../config/database');

// Vytvoření triggeru
exports.createTrigger = (req, res) => {
    const { customer_id, type, threshold_value } = req.body;

    const query = 'INSERT INTO triggers (customer_id, type, threshold_value) VALUES (?, ?, ?)';
    db.query(query, [customer_id, type, threshold_value], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Trigger vytvořen', triggerId: result.insertId });
    });
};

// Získání triggerů pro zákazníka
exports.getTriggersForCustomer = (req, res) => {
    const { customerId } = req.params;

    const query = 'SELECT * FROM triggers WHERE customer_id = ?';
    db.query(query, [customerId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

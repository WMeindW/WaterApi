const db = require('../config/database');

// Přidání měřidla
exports.addMeter = (req, res) => {
    const { property_id, type, unit } = req.body;

    const query = 'INSERT INTO meters (property_id, type, unit) VALUES (?, ?, ?)';
    db.query(query, [property_id, type, unit], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Měřidlo přidáno', meterId: result.insertId });
    });
};

// Získání všech měřidel
exports.getAllMeters = (req, res) => {
    db.query('SELECT * FROM meters', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

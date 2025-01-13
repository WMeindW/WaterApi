const db = require('../config/database');
const bcrypt = require('bcryptjs');

// Vytvoření zákazníka
exports.createCustomer = (req, res) => {
    const { firm_id, name, email, password, address } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: 'Chyba při šifrování hesla' });

        const query = 'INSERT INTO customers (firm_id, name, email, password, address) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [firm_id, name, email, hashedPassword, address], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Zákazník vytvořen', customerId: result.insertId });
        });
    });
};

// Získání všech zákazníků
exports.getAllCustomers = (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};
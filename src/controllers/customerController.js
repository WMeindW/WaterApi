const db = require('../config/database');
const bcrypt = require('bcryptjs');


// Funkce pro získání všech zákazníků
const getAllCustomers = async (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// Funkce pro získání zákazníka podle ID
const getCustomerById = async (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM customers WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(results[0]);
    });
};

// Funkce pro vytvoření nového zákazníka s hashováním hesla
const createCustomer = async (req, res) => {
    const { firm_id, name, email, password, address } = req.body;
    try {
        // Hashování hesla pomocí bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'INSERT INTO customers (firm_id, name, email, password, address, status) VALUES (?, ?, ?, ?, ?, ?)',
            [firm_id, name, email, hashedPassword, address, 'active'],
            (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ id: result.insertId, name, email, address, status: 'active' });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Funkce pro aktualizaci zákazníka s hashováním nového hesla
const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, address, status } = req.body;

    try {
        let hashedPassword = password; // Pokud není nové heslo, použije se původní heslo

        // Pokud je nové heslo, hashujeme ho
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        db.query(
            'UPDATE customers SET name = ?, email = ?, password = ?, address = ?, status = ? WHERE id = ?',
            [name, email, hashedPassword, address, status, id],
            (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'Customer not found' });
                }
                res.status(200).json({ message: 'Customer updated' });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Funkce pro smazání zákazníka
const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM customers WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted' });
    });
};

// Funkce pro blokování zákazníka
const blockCustomer = async (req, res) => {
    const { id } = req.params;
    db.query('UPDATE customers SET status = ? WHERE id = ?', ['blocked', id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer blocked' });
    });
};

// Funkce pro aktivaci zákazníka
const activateCustomer = async (req, res) => {
    const { id } = req.params;
    db.query('UPDATE customers SET status = ? WHERE id = ?', ['active', id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer activated' });
    });
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    blockCustomer,
    activateCustomer,
};

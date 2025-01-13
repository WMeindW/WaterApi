const mysql = require('mysql2');

// Vytvoření připojení k MySQL databázi
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
db.connect((err) => {
    if (err) {
        console.error('Chyba při připojování k databázi: ', err);
    } else {
        console.log('Připojeno k databázi MySQL');
    }
});

module.exports = db;

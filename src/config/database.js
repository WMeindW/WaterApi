const mysql = require('mysql2');

// Vytvoření připojení k MySQL databázi
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Funkce pro testování připojení k databázi
async function testDatabaseConnection() {
    try {
      // Testovací dotaz (jednoduchý SELECT)
      const [rows] = await db.promise().query('SELECT 1');
      console.log('Připojení k mysql je funkční');
    } catch (error) {
      console.error('Chyba při testování připojení k databázi:', error.message);
    }
  }
  
  const SECRET_KEY = process.env.JWT_SECRET

  // Zavolání funkce
  testDatabaseConnection();

module.exports = {db,SECRET_KEY};

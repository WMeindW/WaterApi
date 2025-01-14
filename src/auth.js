const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {db,SECRET_KEY} = require('./config/database.js')


// Funkce pro přihlášení uživatele
async function loginUser(email, password) {
  try {
    // Načtení uživatele z databáze podle e-mailu
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      throw new Error('Uživatel nenalezen.');
    }

    const user = rows[0];

    // Ověření hesla
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Neplatné heslo.');
    }

    // Vytvoření JWT tokenu
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        firm_id: user.firm_id,
        status: user.status
      },
      SECRET_KEY,
      { expiresIn: '1h' } // Token platí 1 hodinu
    );

    console.log(token)
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {loginUser}
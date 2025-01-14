const multer = require('multer');
const path = require('path');

// Nastavení ukládání souborů pomocí Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Soubory se uloží do složky "uploads"
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Vytvoření unikátního názvu souboru
  },
});

// Filtr pro povolené typy souborů
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['text/plain', 'application/json'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Povoleno
  } else {
    cb(new Error('Nepodporovaný typ souboru'), false); // Nepovoleno
  }
};

const upload = multer({ storage, fileFilter });

module.exports = {upload}
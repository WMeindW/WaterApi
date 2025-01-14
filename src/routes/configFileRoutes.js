const express = require('express');
const multer = require('multer');
const router = express.Router();
const {upload} = require('../controllers/configFileController')

// Endpoint pro nahrávání souborů
router.post('/config', upload.single('file'), (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'Soubor nebyl nahrán' });
      }
      res.status(200).json({ message: 'Soubor úspěšně nahrán', file: file });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Middleware pro obsluhu chyb Multeru
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
  } else if (err) {
    res.status(500).json({ error: err.message });
  } else {
    next();
  }
});

module.exports = router;
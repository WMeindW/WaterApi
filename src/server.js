require('dotenv').config({ path: 'src/config/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware pro zpracování JSON těla požadavků
app.use(bodyParser.json());

// Import rout
const customerRoutes = require('./routes/customerRoutes');
const meterRoutes = require('./routes/meterRoutes');
const triggerRoutes = require('./routes/triggerRoutes');

// Použití rout
app.use('/api/customers', customerRoutes);
app.use('/api/meters', meterRoutes);
app.use('/api/triggers', triggerRoutes);

// Start serveru
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server běží na portu ${port}`);
});
require('dotenv').config({ path: 'src/config/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')



// Middleware pro zpracování JSON těla požadavků
app.use(bodyParser.json());

// Import rout
const customerRoutes = require('./routes/customerRoutes');
const meterRoutes = require('./routes/meterRoutes');
const triggerRoutes = require('./routes/triggerRoutes');
const configRoutes = require('./routes/configFileRoutes')

// Použití rout
app.use('/api/customers', customerRoutes);
app.use('/api/meters', meterRoutes);
app.use('/api/triggers', triggerRoutes);
app.use('/api',configRoutes)


app.get('/form',(req,res) => {
    res.sendFile('form.html',{root: path.resolve(__dirname, '..')})
}
)

// Start serveru
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server běží na portu ${port}`);
});
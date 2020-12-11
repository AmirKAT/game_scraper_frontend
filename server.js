const express = require('express');
 
// Getting database connection from db.js
const pool = require('./config/db')
const path = require('path');
const cors = require('cors')
const app = express();
 
app.use(cors())

app.use(express.json({ extended: false }));

// Defining Routes

app.use('/api/products', require('./routes/api/products'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('./config/cors');

// Initializations
const app = express();
require('./config/database');
const port = process.env.PORT || 3000;

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//routes
app.use('/api', require('./routes.js'));

//starting server
app.listen(port, () => {
    console.log(`Server on port: ${port}`);    
});
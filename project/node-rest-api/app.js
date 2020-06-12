const express = require('express');
var cors = require('cors')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();


const basicRoutes = require('./api/routes/basic');
const userRoutes = require('./api/routes/user');
const definitionsRoutes = require('./api/routes/definitions');
const synonymsRoutes = require('./api/routes/synonyms');

app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true
}));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS') {
       res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
       return status(200).json({});
   }
   next();
});       

//routes
app.use('/basic', basicRoutes);
app.use('/users', userRoutes);
app.use('/definitions', definitionsRoutes);
app.use('/synonyms', synonymsRoutes);

//error handeling
app.use((req, res, next) => { 
    const error = new Error('no endpoint fits the request');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500); //other errors
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;
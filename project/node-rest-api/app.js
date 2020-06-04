const express = require('express');
const morgan = require('morgan');
const app = express();

const basicRoutes = require('./api/routes/basic');

app.use(morgan('dev'));

app.use('/basic', basicRoutes);

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
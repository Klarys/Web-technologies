const express = require('express');
const mysql = require('mysql');
const router = express.Router();

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'get endpoint works!'
    });
});

router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: "requested get for parameter " + req.params.id
    });
});

router.get('/sqltest/:id', (req, res, next) => {

var sql = 'SELECT * FROM Test WHERE id = ' + mysql.escape(req.params.id);
con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json({
        message: "requested get for parameter " + req.params.id,
        result: result
    });
  });
    
});

router.post('/', (req, res, next) => {
    const basicObject = {
        id: req.body.id,
        prop: req.body.prop
    }
    res.status(201).json({
        message: "received json object with properties id: " + basicObject.id + " and prop: " + basicObject.prop,
        createdObject: basicObject
    })
});

module.exports = router;
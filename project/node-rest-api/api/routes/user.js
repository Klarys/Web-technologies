const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });


router.post('/signup', (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        }
        else
        {
            var sql = "INSERT INTO `Users` (`Id`, `Login`, `Password`) VALUES (NULL, " + mysql.escape(req.body.login)+ "," + mysql.escape(hash) +");";

            con.query(sql, function (err, result) {
                if (err) {
                    return res.status(409).json({
                        error: "User can't be created"
                    });
                }
                res.status(201).json({
                    message: "pomyslnie utworzono uzytkownika ",
                });
              });
        }
    });
});

router.get('/login', (req, res, next) => {

    con.query('SELECT * FROM `Users` WHERE `Login` = '+mysql.escape(req.body.login), function(err, result) {
        if (err) {
            return res.status(404).json({
                error: "Login failed"
            });
        }
        else
        {
            bcrypt.compare(req.body.password, result[0].Password, (error, passwdCheck) => {
                if(error) {
                    return res.status(401).json({
                        error: "Login failed"
                    });
                }
                if(passwdCheck)
                {
                    const token = jwt.sign({
                        id: result[0].Id,
                        login: result[0].Login
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: "Login successful",
                        token: token
                    });
                }
                return res.status(401).json({
                    error: "Login failed"
                });
            });
        }
    });

});

module.exports = router;
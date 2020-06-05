const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');

var con = mysql.createConnection({
    host: "wwwlab.uci.umk.pl",
    user: "291903_4whad",
    password: "IH68JU0VR-dp",
    database: "291903_4wh"
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
                    result: hash
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
                    return res.status(200).json({
                        message: "Login successful"
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
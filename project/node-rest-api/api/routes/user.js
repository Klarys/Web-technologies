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
            })
        }
        else
        {
            var sql = "INSERT INTO `Users` (`Id`, `Login`, `Password`) VALUES (NULL, " + mysql.escape(req.body.login)+ ",'" + hash +"');";

            con.query(sql, function (err, result) {
                if (err) {
                    return res.status(500).json({
                        error: err.sqlMessage
                    })
                }
                res.status(201).json({
                    message: "pomyslnie utworzono uzytkownika ",
                    result: result
                });
              });
        }
    });
});

module.exports = router;
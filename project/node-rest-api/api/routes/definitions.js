const express = require('express');
const mysql = require('mysql');
const router = express.Router()
const jwt = require('jsonwebtoken');
const auth = require('../authorization/check-auth');

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

router.get('/', auth, (req, res, next) => {
    var token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.decode(token);
    const idUser = decoded.id;

    var sql = "SELECT Definitions.Definition, Definitions.Id, Words.Word FROM Users JOIN Words ON Users.Id = Words.IdUser JOIN Definitions ON Definitions.IdWord = Words.Id WHERE Definitions.IdWord = Words.Id AND Words.IdUser =  " + idUser;
    con.query(sql, function (err, result) {
        if (err) {
            return res.status(500);
        }
        res.status(200).json(
            result
        );
      });
});

router.post('/', auth, (req, res, next) => {
    var token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.decode(token);
    const idUser = decoded.id;
    var sqlDefinition ="";

    
    //check if this word was already saved, if not, insert it
    var sql = "SELECT Words.Id FROM Users JOIN Words ON Users.Id = Words.IdUser WHERE Words.Word = " + mysql.escape(req.body.word) + " AND Words.IdUser = " + idUser;
    
    con.query(sql, (err, result) => {
        if(err) {
            return res.status(500);
        }
        if(result.length == 0)
        {
            var sqlWord = "INSERT INTO `Words` (`Word`, `IdUser`) VALUES (" + mysql.escape(req.body.word) + ", '" + idUser +"');";
            con.query(sqlWord, (errWord, resultWord) => {
                if (errWord) {
                    return res.status(409).json({
                        error: "word couldn't be saved"
                    });
                }
                else
                {
                    sqlDefinition = "INSERT INTO `Definitions` (`Definition`, `IdWord`) VALUES (" + mysql.escape(req.body.definition) + ", '" + resultWord.insertId +"');";
                    con.query(sqlDefinition, (errDefiniton, resultDefinition) => {
                        
                        if(errDefiniton)
                        {
                            return res.status(409).json({
                                error: "definition couldn't be saved"
                            });
                        }
                        res.status(201).json({
                            message: "word and definition saved",
                        });
                    });
                }
              });
        }
        else
        {
            sqlDefinition = "INSERT INTO `Definitions` (`Definition`, `IdWord`) VALUES (" + mysql.escape(req.body.definition) + ", '" + result[0].Id +"');";
            con.query(sqlDefinition, (errDefiniton, resultDefinition) => {
                if(errDefiniton)
                {
                    return res.status(409).json({
                        error:  "definition couldn't be saved"
                    });
                }
                res.status(201).json({
                    message: "word and definition saved",
                });
            });
        }
    });
});

router.delete("/:id", auth, (req, res, next) => {
    
    var token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.decode(token);
    const idUser = decoded.id;

    var sql = "SELECT Definitions.Definition, Words.Word FROM Users JOIN Words ON Users.Id = Words.IdUser JOIN Definitions ON Definitions.IdWord = Words.Id WHERE Definitions.Id = " + mysql.escape(req.params.id) +" AND Words.IdUser =  " + idUser;
    con.query(sql, (err, result) => {
        if(err)
        {
            return res.status(500).json({
                error:  "database error"
            }); 
        }
        if(result.length < 1)
        {
            return res.status(200).json({
                message: "definition deleted or nothing to delete"
            });
        }
        else
        {
            var sqlDelete = "DELETE FROM `Definitions` WHERE `Definitions`.`Id` = " + mysql.escape(req.params.id)
            con.query(sqlDelete, (errDelete, errResult) => {
                if(err)
                {
                    return res.status(500).json({
                        error:  "error while deleting the definition"
                    }); 
                }
                else
                {
                    return res.status(200).json({
                        message: "definition deleted or nothing to delete"
                    });
                }
            });
        }
    });
});

module.exports = router;
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');
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
  
  var sql = "SELECT Synonyms.Synonym, Synonyms.Id, Words.Word FROM Users JOIN Words ON Users.Id = Words.IdUser JOIN Synonyms ON Synonyms.IdWord = Words.Id WHERE Synonyms.IdWord = Words.Id AND Words.IdUser =  " + idUser;
  con.query(sql, function (err, result) {
      if (err) {
          return res.status(500);
      }
      res.status(200).json(result);
    });
});

router.post('/', auth, (req, res, next) => {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwt.decode(token);
  const idUser = decoded.id;
  var sqlSynonym ="";

  
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
                  sqlSynonym = "INSERT INTO `Synonyms` (`Synonym`, `IdWord`) VALUES (" + mysql.escape(req.body.synonym) + ", '" + resultWord.insertId +"');";
                  con.query(sqlSynonym, (errSynonym, resultSynonym) => {
                      
                      if(errSynonym)
                      {
                          return res.status(409).json({
                              error: "word was saved but synonym couldn't be saved"
                          });
                      }
                      res.status(201).json({
                          message: "word and synonym saved",
                      });
                  });
              }
            });
      }
      else
      {
          sqlSynonym = "INSERT INTO `Synonyms` (`Synonym`, `IdWord`) VALUES (" + mysql.escape(req.body.synonym) + ", '" + result[0].Id +"');";
          con.query(sqlSynonym, (errSynonym, resultSynonym) => {
              if(errSynonym)
              {
                  return res.status(409).json({
                      error:  "synonym couldn't be saved"
                  });
              }
              res.status(201).json({
                  message: "word and synonym saved",
              });
          });
      }
  });
});

router.delete("/:id", auth, (req, res, next) => {
    
    var token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.decode(token);
    const idUser = decoded.id;

    var sql = "SELECT Synonyms.Synonym, Words.Word FROM Users JOIN Words ON Users.Id = Words.IdUser JOIN Synonyms ON Synonyms.IdWord = Words.Id WHERE Synonyms.Id = " + mysql.escape(req.params.id) +" AND Words.IdUser =  " + idUser;
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
                message: "Synonym deleted or nothing to delete"
            });
        }
        else
        {
            var sqlDelete = "DELETE FROM `Synonyms` WHERE `Synonyms`.`Id` = " + mysql.escape(req.params.id)
            con.query(sqlDelete, (errDelete, errResult) => {
                if(err)
                {
                    return res.status(500).json({
                        error:  "error while deleting the synonym"
                    }); 
                }
                else
                {
                    return res.status(200).json({
                        message: "synonym deleted or nothing to delete"
                    });
                }
            });
        }
    });
});


module.exports = router;

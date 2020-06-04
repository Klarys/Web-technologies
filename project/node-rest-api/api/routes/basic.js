const express = require('express');
const router = express.Router();

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
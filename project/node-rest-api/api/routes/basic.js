const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'get endpoint works!'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'post endpoint works!'
    });
});

router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: "requested get for parameter " + req.params.id
    });
});

module.exports = router;
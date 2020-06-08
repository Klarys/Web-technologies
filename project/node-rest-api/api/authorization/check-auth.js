const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        var data = jwt.verify(token, process.env.JWT_KEY);
    }
    catch (e)
    {
        return res.status(401).json({
            error: "authorization error"
        });
    }

    next();
};
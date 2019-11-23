const jwt = require('jsonwebtoken')
const role = require('../roles');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (role[verified.role].find(function (url) { return url == req.baseUrl })) {
            req.user = verified;
            next();
        }
        else{
            return res.status(401).send('Access Denied: You dont have correct privilege to perform this operation');
        }
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}
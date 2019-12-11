const jwt = require('jsonwebtoken')
const { addCategoryValidation } = require('../validation');
const { get } = require('../roles');
const { post } = require('../roles');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        let role;
        switch (req.method) {
            case "POST":
                role = post;
                break;
            case "GET":
                role = get;
                break;
        }
        if (role[verified.role].find(function (url) { return url == req.originalUrl })) {
            req.user = verified;
            next();
        }
        else {
            return res.status(401).send('Access Denied: You dont have correct privilege to perform this operation');
        }
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}
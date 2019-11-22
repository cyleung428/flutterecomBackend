const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

const getExpiryDate = () => {
    const exp = Math.floor(Date.now() / 1000) + 60 * 60;
    return exp;
  };
  

router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body);
    let result = {};
    if (error) {
        result.error = error.details[0].message;
        result.result = false;
        return res.status(400).send(result);
    }

    //Check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        result.error = 'Email already exists';
        result.result = false;
        return res.status(400).send(result);
    }

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
    });
    try {
        const savedUser = await user.save();
        result.result = true;
        result.id = user._id;
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ "error": error.details[0].message });
    let result = {};
    //Check if the user is already in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        result.result = false;
        result.error = 'Email or password is wrong';
        return res.status(400).send(result);
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        result.result = false;
        result.error = 'Email or password is wrong';
        return res.status(400).send(result);
    }

    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    result.result = true;
    result.token = token;
    result.id = user._id;
    res.header('auth-token', token).send(result);

});


module.exports = router;
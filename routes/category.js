const router = require('express').Router();
const auth = require('./verifyToken');
const Category = require('../model/Category');
const { addCategoryValidation } = require('../validation');

router.post('/category', auth, async (req, res) => {
    const { error } = addCategoryValidation(req.body);
    let result = {};
    if (error) {
        result.error = error.details[0].message;
        result.result = false;
        return res.status(400).send(result);
    }

    //Check if the user is already in the database
    const nameExist = await Category.findOne({ name: req.body.name });
    if (nameExist) {

        result.error = 'Category name already exists';
        result.result = false;
        return res.status(400).send(result);
    }

    const category = new Category({
        name: req.body.name,
    });
    try {
        const savedCategory = await category.save();
        result.result = true;
        result.id = category._id;
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/category', auth, async (req, res) => {
    let result = {};
    try {
        const categories = await Category.find({});
        result.result = true;
        result.categories = categories;
        return res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
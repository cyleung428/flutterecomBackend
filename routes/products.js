const router = require('express').Router();
const auth = require('./verifyToken');
const Category = require('../model/Category');
const Product = require('../model/Product');
const { addProductValidation } = require('../validation');

//TODO: Add product API
router.post('/addProduct', auth, async (req, res) => {
    const { error } = addProductValidation(req.body);
    let result = {};
    if (error) {
        result.error = error.details[0].message;
        result.result = false;
        return res.status(400).send(result);
    }

    //Check if the user is already in the database
    try {
        const categoryExist = await Category.findOne({ _id: req.body.categoryID });

        const product = new Product({
            categoryID: req.body.categoryID,
            name: req.body.name,
            picture: req.body.picture,
            price: req.body.price,
            pack: req.body.pack,
            quantity: req.body.quantity,
            totalSurfaceArea: req.body.totalSurfaceArea,
            amount: req.body.amount
        });
        const savedProduct = await product.save();
        result.result = true;
        result.product = savedProduct;
        res.send(result);


    } catch (e) {
        result.error = "No such category";
        res.status(400).send(result);
    }
});
module.exports = router;
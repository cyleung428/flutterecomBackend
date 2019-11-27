//VALIDATION
const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        gender: Joi.string()
            .min(1)
            .required()
    });
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
};

const addCategoryValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required(),
    });
    return schema.validate(data);
};
const addProductValidation = data => {
    const schema = Joi.object({
        categoryID: Joi.string()
            .min(10)
            .required(),
        name: Joi.string()
            .min(3)
            .required(),
        picture: Joi.string()
            .min(3),
        price: Joi.number()
            .min(0)
            .required(),
        pack: Joi.number()
            .min(1)
            .required(),
        quantity: Joi.number()
            .min(1)
            .required(),
        totalSurfaceArea: Joi.number()
            .min(0)
            .required(),
        amount: Joi.number()
            .min(1)
            .required(),
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.addCategoryValidation = addCategoryValidation;
module.exports.addProductValidation = addProductValidation;
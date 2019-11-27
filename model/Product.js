const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    categoryID: {
        type: String,
        required: true,
        min:10
    },
    name: {
        type: String,
        required: true,
        min: 3
    },
    picture: {
        type: String,
        'default': null
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    pack:{
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    totalSurfaceArea: {
        type: Number,
        required: true,
        min: 0
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
});


module.exports = mongoose.model('Product',productSchema);
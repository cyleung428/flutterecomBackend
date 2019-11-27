const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
});


module.exports = mongoose.model('Category',categorySchema);
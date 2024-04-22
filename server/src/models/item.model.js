const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    id: {
        type : String,
        unique: true,
        required : true
    },
    name: {
        type : String,
        required : true
    },
    qty: {
        type: Number,
        required : true
    },
    unit_price: {
        type: Number,
        required : true
    },
    Description: {
        type: String,
    },
    inStock: {
        type : Boolean,
    }
});

module.exports = mongoose.model('Item', itemSchema);
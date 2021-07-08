const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//mongoose schema for todo list items
const shopItemSchema = new Schema({
    images: {
        type: [{
            image: {
                type: Buffer,
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
            contentType: {
                type: String,
                required: true
            }
        }],
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    sizes: {
        type: [{
            size: {
                type: String,
                required: true
            },
            numInStock: {
                type: Number,
                required: true
            }
        }],
    },
    description: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});


//create and export model from schema
const ShopItem = mongoose.model('ShopItem', shopItemSchema);
module.exports = ShopItem;

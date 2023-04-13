const mongoose = require('mongoose');
const Product = require('./products').schema;
const Order = require('./order').schema;

const ShopSchema = mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        shopName: {
            type: String,
            default: ""
        },
        shopDescription: {
            type: String,
            default: ""
        },
        products: [Product],
        order: [Order]
    },
    {
        timestamps: true
    }
);


const Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;
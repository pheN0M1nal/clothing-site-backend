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
            required: true, 
            unique: 'The shopName is already taken',
            default: ""
        },
        shopDescription: {
            type: String,
            default: ""
        },
        products: [Product],
        orders: [Order]
    },
    {
        timestamps: true
    }
);


const Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;
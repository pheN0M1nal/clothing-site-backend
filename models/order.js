const mongoose = require('mongoose');


const OrderSchema = mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        designer : {
            type : String,
            required : true
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        products: {
            type: [String],
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered'],
            default: 'pending'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true

    }
);


const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
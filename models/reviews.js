const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        productID : {
            type : String,
            required : true
        },
        userID : {
            type : String,
            required : true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
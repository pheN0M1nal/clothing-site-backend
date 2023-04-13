const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        userID: {
            type: String,
            required: true
        },
        rating: {
            type: String,
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
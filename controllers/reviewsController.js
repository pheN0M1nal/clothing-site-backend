const Review = require('../models/reviews')
const expressAsyncHandler = require('express-async-handler')

const addReview = asyncHandler(async (req, res) => {
    const {productID, userID, rating, comment} = req.body

    const review = new Review({
        productID,
        userID,
        rating,
        comment
    })

})

module.exports = {}
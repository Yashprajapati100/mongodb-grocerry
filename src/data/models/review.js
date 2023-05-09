const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const reviewSchema = new Schema({
        review_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        review_star: {
            type: Number,
            required: false,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }
    }, {
        timestamps: true,
        // _id : false 
    })

    return mongoose.model('Review', reviewSchema, 'review')
}
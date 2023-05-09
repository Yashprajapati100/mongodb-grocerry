const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const wish_listSchema = new Schema({
        wish_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
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

    return mongoose.model('Wish_list', wish_listSchema, 'wish_list')
}  
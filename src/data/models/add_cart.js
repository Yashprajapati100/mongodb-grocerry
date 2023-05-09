const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const add_cartSchema = new Schema({
        cart_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        quantity: {
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
        },
    
    }, { 
        timestamps: true,
        // _id : false   
    })  

    return mongoose.model('Add_cart', add_cartSchema, 'add_cart')
}  
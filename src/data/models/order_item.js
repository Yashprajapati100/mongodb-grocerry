const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const Order_itemSchema = new Schema({
        order_item_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        order_id: {
            type: Schema.Types.ObjectId,
            ref:'Orders'
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref:'Product'
        },
        price: { 
            type: Number,
            required:false
        },
        quantity: {
            type: Number, //1=email,2=google,3=facebook,4=apple_id
            required: false,
        
        },
        discount_price: {
            type: Number,
            required: false

        },
    }, {
        timestamps: true
    });
    return mongoose.model('Order_item', Order_itemSchema, 'order_item')
};

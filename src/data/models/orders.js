const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const OrderSchema = new Schema({
        order_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref:'User'
        },
        address_id: {
            type: Schema.Types.ObjectId,
            ref:'Address'
        },
        payment_type: {
            type: String, //1=email,2=google,3=facebook,4=apple_id
            required: false,
          
        },
        date: {
            type: Date,
            required: false

        },
        grandtotal: {
            type: Number,
            required: false,
        },
        sub_total: {
            type: Number,
            required: false,
        },
        delivery_charge: {
            type: String,
            required: false,
        },
        status: {
            type: Number,
            required: false,
        },
        coupan_id: {
            type: Schema.Types.ObjectId,
            ref:'address'
        }
    }, {
        timestamps: true
    });
    return mongoose.model('Orders', OrderSchema, 'orders')
};

const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const paymentSchema = new Schema({
        payment_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        customer_stripe_id: {
            type: String,
            required: false,
            default: ''
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        card_id: {
            type: String,
            required: false,
            default: ''
        },
        card_Name:{
            type: String,
            required: false,
            default: ''
        },
        card_ExpYear:{
            type: Number,
            required: false,
            default: ''
        },
        card_ExpMonth:{
            type: Number,
            required: false,
            default: ''
        },
        card_Number:{
            type: String,
            required: false,
            default: ''
        },
        card_CVC:{
            type: Number,
            required: false,
            default: ''
        },
        source:{
            type: String,
            required: false,
            default: ''
        }
    }, { 
        timestamps: true,
        // _id : false   
    })  

    return mongoose.model('Payment', paymentSchema, 'payment')
}  
const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const card_chargeSchema = new Schema({
        card_charge_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        card_id: {
            type: String,
            required: false,
            default: ''
        },
        customer_stripe_id: {
            type: String,
            required: false,
            default: ''
        },
        amount:{
            type: Number,
            required: false,
            default: ''
        },
    }, { 
        timestamps: true,
        // _id : false   
    })  

    return mongoose.model('Card_charge', card_chargeSchema, 'card_charge')
}  
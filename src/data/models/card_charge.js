const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const card_chargeSchema = new Schema({
        card_charge_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        charge_id: {
            type: String,
            required: false,
            default: ''
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        amount: {
            type: Number,
            required: false,
            default: ''
        },
        date: {
            type:Date,
            required: false,
            default: ''
        },
        currency: {
            type: String,
            required: false,
            default: ''
        },

    }, {
        timestamps: true,
        // _id : false   
    })

    return mongoose.model('Card_charge', card_chargeSchema, 'card_charge')
}  
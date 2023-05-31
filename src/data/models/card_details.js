const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const card_deatailsSchema = new Schema({
        card_details_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        card_id: {
            type: String,
            required: false
        },
        customer_stripe_id: {
            type: String,
            required: false
        },
        card_Name: {
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
            type: Number,
            required: false,
            default: ''
        },
        card_CVC:{
            type: Number,
            required: false,
            default: ''
        },
        token:{
            type: String,
            required: false,
            default: ''
        },
    }, { 
        timestamps: true,
        // _id : false   
    })  

    return mongoose.model('Card_details', card_deatailsSchema, 'card_details')
}  
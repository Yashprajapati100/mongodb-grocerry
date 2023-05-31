const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const customerSchema = new Schema({
        customer_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            required: false,
            default: ''
        },
        email:{
            type: String,
            required: false,
            default: ''
        },
        decription:{
            type: String,
            required: false,
            default: ''
        },
        customer_stripe_id:{
            type: String,
            required: false,
            default: ''
        }
    
    }, { 
        timestamps: true,
        // _id : false   
    })  

    return mongoose.model('Customer', customerSchema, 'customer')
}  
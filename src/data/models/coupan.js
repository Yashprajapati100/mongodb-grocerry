const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const CoupanSchema = new Schema({
        coupan_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        coupan_name: {
            type: String,
            required: false,
        
        },
        coupan_code: {
            type: String,
            required: false,
            
        },
        min_price: {
            type: Number, //1=email,2=google,3=facebook,4=apple_id
            required: false,
            
        },
        discount_price: {
            type: Number,
            required: false

        },
        start_date: {
            type:Date,
            required: false,
        },
        end_date: {
            type:Date,
            required: false,  
        },
    }, {
        timestamps:true,
    });
    return mongoose.model('Coupan', CoupanSchema, 'coupan_management')
};

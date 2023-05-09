const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const settingSchema = new Schema({
        setting_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId(),
        },
        free_delivery_upto: {
            type: Number,
            required: false,
            default: "",
        },
        delivery_charge: {
            type: Number,
            required: false,
        },
        tax: {
            type:Number, // 0=inactive,1=active
            required: false,   
        }

    }, {
        timestamps: true,
    })

    return mongoose.model('Setting', settingSchema, 'setting')
}
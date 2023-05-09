const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const AddressSchema = new Schema({
        address_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        type: {
            type: Number,
            required: false,
        },
        home_detail: {
            type: String,
            required: false,

        },
        landmark: {
            type: String,
            required: false,

        },
        recipient_name: {
            type: String,
            required: false

        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }

    }, {
        timestamps: true,

    })

    return mongoose.model('Address', AddressSchema, 'address')
}
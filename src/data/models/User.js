const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const UserSchema = new Schema({
        user_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        firstname: {
            type: String,
            required: false,
            default: ''
        },
        lastname: {
            type: String,
            required: false,
            default: ''
        },
        email: {
            type: String, //1=email,2=google,3=facebook,4=apple_id
            required: false,
            default: ''
        },
        mobilenumber: {
            type: String,
            required: false

        },
        status: {
            type: Number,
            required: false,
        },
        device_id: {
            type: Number,
            required: false,
        },
        otp: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        image: {
            type: Number,
            required: false,
        },
        auth_token: {
            type: String, // 0=inactive,1=active
            required: false,
        },
        is_register: {
            type: Number,
            required: false,
        },

    }, {
        timestamps: true
    });
    return mongoose.model('User', UserSchema, 'users')
};

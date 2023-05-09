const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const AdminSchema = new Schema({
        admin_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        name: {
            type: String,
            required: false,
            default: ""
        },
        email: {
            type: String, //1=email,2=google,3=facebook,4=apple_id
            required: false,

        },
        password: {
            type: String,
            required: false
        },
        mobilenumber: {
            type: String,
            required: false,
            default: ''
        },
        status: {
            type: Number,
            required: false,
            default: '1'
        },
        auth_token: {
            type: String,
            required: false,
            default: ''
        }
    }, {
        timestamps: true
    });
    return mongoose.model('Admin', AdminSchema, 'admin')
};

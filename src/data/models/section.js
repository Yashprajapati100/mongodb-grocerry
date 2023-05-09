const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const SectionSchema = new Schema({
        section_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        section_type: {
            type: Number,
            required: false,
        },
        tittle_name: {
            type: String,
            required: false,

        },
        sequence: {
            type: Number,
            required: false,
         
        }
    }, {
        timestamps: true,
        // _id : false 
    })

    return mongoose.model('Section', SectionSchema, 'section')
}
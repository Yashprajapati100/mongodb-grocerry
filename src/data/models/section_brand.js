const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const Section_brandSchema = new Schema({
        section_brand_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },

        brand_id: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',

        },
        section_id: {
            type: Schema.Types.ObjectId,
            ref: 'Section',

        },
    }, {
        timestamps: true,
        // _id : false 
    })

    return mongoose.model('Section_brand', Section_brandSchema, 'section_brand')
}
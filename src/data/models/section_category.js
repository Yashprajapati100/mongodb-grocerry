const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const Section_categorySchema = new Schema({
        section_category_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        offer: {
            type: Number,
            required: false,
        },
        category_id: {
            type: Schema.Types.ObjectId,
            ref: 'Category',

        },
        section_id: {
            type: Schema.Types.ObjectId,
            ref: 'Section',

        },
    }, {
        timestamps: true,
        // _id : false 
    })

    return mongoose.model('Section_category', Section_categorySchema, 'section_category')
}






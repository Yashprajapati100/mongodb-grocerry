const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId

module.exports = (mongoose) => {
    const Section_productSchema = new Schema({
        section_product_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
        section_id: {
            type: Schema.Types.ObjectId,
            ref: 'Section',

        },
    }, {
        timestamps: true,
        // _id : false 
    })

    return mongoose.model('Section_product', Section_productSchema, 'section_product')
}
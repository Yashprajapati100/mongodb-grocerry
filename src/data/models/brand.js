const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId
function image(image){
    return "http://localhost:4000/upload/"+ image
}

module.exports = (mongoose) => {
    const deviceSchema = new Schema({
        brand_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId(),
        },
        image: {
            type: String,
            get:image
        },
        name: {
            type: String,
            required: false,
        },
        status: {
            type: Boolean, // 0=inactive,1=active
            required: false,
            default: 1,
        },
        category_id: {
            type: Schema.Types.ObjectId,
            ref: 'Category',

        },
        subcategory_id: {
            type: Schema.Types.ObjectId,
            ref: 'SubCategory',
        },

    }, {
        timestamps: true,
        
    })
   
    deviceSchema.set('toObject',{getters:true})
    deviceSchema.set('toJSON',{getters:true})
    return mongoose.model('Brand', deviceSchema, 'brand')
}
const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId
function image(image){
    return 'http://localhost:4000/upload/'+ image
  }

module.exports = (mongoose) => {
    const Section_sliderSchema = new Schema({
        section_slider_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        image: {
            type: String,
            get:image
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
    Section_sliderSchema.set('toObject',{getters:true})
    Section_sliderSchema.set('toJSON',{getters:true})
    return mongoose.model('Section_slider', Section_sliderSchema, 'section_slider')
}
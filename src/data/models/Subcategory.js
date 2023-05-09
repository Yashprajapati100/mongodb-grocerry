const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId
function image(image){
    return 'http://localhost:4000/upload/'+ image
  }
module.exports = (mongoose) => {
    const SubCategorySchema = new Schema({
        subcategory_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        image: {
            type: String,
            get:image,
    
        },
        name: {
            type: String,
            required: false,
            default: ''
        },
        status: {
            type: Number,
            required: false,
        },
        category_id: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        }
    }, {
        timestamps: true
    });
    SubCategorySchema.set('toObject',{getters:true})
    SubCategorySchema.set('toJSON',{getters:true})
    return mongoose.model('SubCategory', SubCategorySchema, 'subcategory')
};

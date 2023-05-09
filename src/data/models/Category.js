const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId
function image(image){
  return 'http://localhost:4000/upload/'+ image
}

module.exports = (mongoose) => {
    const CategorySchema = new Schema({
        category_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId(),
        },
        image: {
            type: String,
            get:image
        },
        categoryname: {
            type: String,
            required: false,

        },
        status: {
            type: Number,
            required: false,
            default:"1"
        }
    }, {
        timestamps: true
    });

    CategorySchema.set('toObject',{getters:true})
    CategorySchema.set('toJSON',{getters:true})
    return mongoose.model('Category', CategorySchema, 'category')
};

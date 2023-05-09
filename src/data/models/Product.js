const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId
function image(image){
    return 'http://localhost:4000/upload/'+ image
  }

module.exports = (mongoose) => {
    const ProductSchema = new Schema({
        product_id: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        productname: {
            type: String,
            required: false,
        },
        decription: {
            type: String,
            required: false,
            default: ''
        },
        short_decription: {
            type: String,
            required: false,
            default: ''
        },
        varition: {
            type: String,
            required: false

        },
        price: {
            type: Number,
            required: false,
        },
        discount: {
            type: Number,
            required: false,
        },
        discount_price: {
            type: Number,
            required: true,
        },
        flag: {
            type: Boolean, // 0=inactive,1=active
            required: false,
            default: 0,
        },
        stock: {
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
        brand_id: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',

        },
        image:{
            type:Schema.Types.String,
            get:image
        }
    }, {
        timestamps: true,
        // _id : false 
    })
    ProductSchema.set('toObject',{getters:true})
    ProductSchema.set('toJSON',{getters:true})

    return mongoose.model('Product', ProductSchema, 'product')
}
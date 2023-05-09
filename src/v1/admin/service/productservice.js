const { Product } = require('../../../data/models/index');
const { Schema, default: mongoose } = require('mongoose')

class productService {
  async insert_product(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var insert = await Product.create({
          productname: req.body.productname, image: req.file.filename, category_id: req.body.category_id, subcategory_id: req.body.subcategory_id, brand_id: req.body.brand_id, decription: req.body.decription, short_decription: req.body.short_decription, variation: req.body.variation, price: req.body.price, discount_price: req.body.discount_price, discount: req.body.discount
        })
        return resolve(insert);
      })
    } catch (error) {
      return reject(error);
    }
  }
  async update_product(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var update = await Product.updateOne({ product_id: req.body.product_id }, { $set: { productname: req.body.productname, image: req.file.filename, category_id: req.body.category_id, subcategory_id: req.body.subcategory_id, brand_id: req.body.brand_id, decription: req.body.decription, short_decription: req.body.short_decription, variation: req.body.variation, price: req.body.price, discount_price: req.body.discount_price, discount: req.body.discount } }
        )
        return resolve(update)
      })

    } catch (error) {
      return reject(error);
    }
  }
  async delete_product(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Product.deleteOne({ product_id: req.body.product_id })
        if (data.length > 0) {
          return resolve(data);
        } else {
          var data = { message: "product_id is not available " }
          return reject(data);
        }
      })
    } catch (error) {
      return reject(error);
    }
  }
  async product_list() {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Product.find({})
        return resolve(data);
      })
    } catch (error) {
      return reject(error);
    }
  }
}
module.exports = new productService();
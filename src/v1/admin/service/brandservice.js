const { Brand } = require('../../../data/models/index');
const { Schema, default: mongoose } = require('mongoose')

class brandService {
  async insert_brand(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var insert = await Brand.create({
          name: req.body.name, image: req.file.filename, category_id: req.body.category_id, subcategory_id: req.body.subcategory_id
        })
        return resolve(insert);
      })
    } catch (error) {
      return reject(error);
    }
  }
  async update_brand(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var update = await Brand.updateOne({ brand_id: req.body.brand_id }, { $set: { name: req.body.name, image: req.file.filename, subcategory_id: req.body.subcategory_id, category_id: req.body.category_id } })
        return resolve(update);
      })
    } catch (error) {
      return reject(error);
    }
  }
  async delete_brand(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var delet = await Brand.deleteOne(
          { brand_id: req.body.brand_id })
        if (delet.length > 0) {
          return resolve(delet);
        } else {
          var data = { message: "brand_id is not available " }
          return reject(data);
        }
      })
    } catch (error) {
      return reject(error);
    }
  }
  async brand_list() {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Brand.find({})
        return resolve(data);
      })
    } catch (error) {
      return reject(error);
    }
  }
}
module.exports = new brandService();  
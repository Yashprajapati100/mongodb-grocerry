const { SubCategory } = require('../../../data/models/index');
const { Schema, default: mongoose } = require('mongoose')

class SubcategoryService {
  async insert_subcategory(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var insert = await SubCategory.create({
          category_id: req.body.category_id, image: req.file.filename,
          name: req.body.name
        })
        return resolve(insert);
      })
    } catch (error) {
      return reject(error);
    }
  }
  async update_subcategory(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var update = await SubCategory.updateOne(
          { subcategory_id: req.body.subcategory_id }, { $set: { name: req.body.name, image: req.file.filename, category_id: req.body.category_id } })
        return resolve(update);
      })
    } catch (error) {
      return reject(error);
    }
  }
  async delete_subcategory(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var delet = await SubCategory.deleteOne(
          { subcategory_id: req.body.subcategory_id })
        if (delet.length > 0) {
          return resolve(delet);
        } else {
          var data = { message: "subcategory_id is not available " }
          return reject(data);
        }
      })
    } catch (error) {
      return reject(error);
    }
  }
  async subcategory_list() {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await SubCategory.find({})
        return resolve(data);
      })
    } catch (error) {
      return reject(error);
    }
  }
}
module.exports = new SubcategoryService(); 
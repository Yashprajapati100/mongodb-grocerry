const { Category } = require('../../../data/models/index');
const { Schema, default: mongoose } = require('mongoose');

class CategoryService {
  async insert_category(req, res) {
    try {
      return new Promise(async (resolve, reject) => {
        var insert = await Category.create({
          categoryname: req.body.categoryname, image: req.file.filename
        })
        return resolve(insert);
      })
    } catch (error) {
      return reject(error);
    }
  }
  async update_category(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var update = await Category.updateOne(
          { category_id: req.body.category_id }, { $set: { categoryname: req.body.categoryname, image: req.file.filename } })
        return resolve(update);
      })
    } catch (error) {
      return reject(error);
    }
  }
  async delete_category(req) {
    try {
      return new Promise(async (resolve, reject) => {
        var delet = await Category.deleteOne(
          { category_id: req.body.category_id })
        if (delet.length > 0) {
          return resolve(delet);
        } else {
          var data = { message: "category_id is not available " }
          return reject(data);
        }
      })
    } catch (error) {
      return reject(error);
    }
  }
  async category_list() {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Category.find({})
        return resolve(data);
      })
    } catch (error) {
      return reject(error);
    }
  }
}
module.exports = new CategoryService(); 
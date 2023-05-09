const CategoryService = require('../service/categoryservice')
const responseHelper = require('../resources/respone');
const validation = require('../middleware/validation');

class CategoryController {

  //insert category-data
  async insert_category(req, res) {
    try {
      var data = await CategoryService.insert_category(req)
      return responseHelper.success(data, 'insert data successfully', res);
    } catch (error) {
      console.log("====>", error)
      return responseHelper.error(error, res);
    }
  }

  //update category-data
  async update_category(req, res) {
    try {
      var data = await CategoryService.update_category(req)
      return responseHelper.success(data, 'upadate data successfully', res);
    } catch (error) {
      console.log("====>", error)
      return responseHelper.error(error, res);
    }
  }

  //delete category-data
  async delete_category(req, res) {
    try {
      await validation.deletecategoryvalidation(req.body)
      var data = await CategoryService.delete_category(req)
      return responseHelper.success(data, 'delete data successfully', res);
    } catch (error) {
      console.log("====>", error)
      return responseHelper.error(error, res);
    }
  }

  //category-list
  async category_list(req, res) {
    try {
      var data = await CategoryService.category_list(req.body);
      return responseHelper.success(data, 'category', res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
}
module.exports = new CategoryController();

const subCategoryService = require('../service/subCategory')
const responseHelper = require('../resources/respone');
const validation = require("../middleware/validation");

class SubCategoryController {
  
  async insert_subcategory(req, res) {
    try {
      var data = await subCategoryService.insert_subcategory(req)
      return responseHelper.success(data, 'insert data successfully', res);
    } catch (error) {
      console.log("====>", error)
      return responseHelper.error(error, res);
    }
  }
  async update_subcategory(req, res) {
    try {
      var data = await subCategoryService.update_subcategory(req)
      return responseHelper.success(data, 'upadate data successfully', res);
    } catch (error) {
      console.log("====>", error)
      return responseHelper.error(error, res);
    }
  }
  async delete_subcategory(req, res) {
    try {
      await validation.deletesubcategoryvalidation(req.body);
      var data = await subCategoryService.delete_subcategory(req)
      return responseHelper.success(data, 'delete data successfully', res);
    } catch (error) {
      console.log("====>", error)
      return responseHelper.error(error, res);
    }
  }
  async subcategory_list(req, res) {
    try {
      var data = await subCategoryService.subcategory_list(req.body);
      return responseHelper.success(data, 'subcategory', res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
}
module.exports = new SubCategoryController();

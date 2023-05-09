const brandService = require('../service/brandservice')
const responseHelper = require('../resources/respone');
const validation = require('../middleware/validation');

class brandController {

  //insert brand-data
  async insert_brand(req, res) {
    try {
      var data = await brandService.insert_brand(req)
      return responseHelper.success(data, 'insert data successfully', res);
    } catch (error) {
      console.log("====>", error)
      return responseHelper.error(error, res);
    }
  }

  //update brand-data
  async update_brand(req, res) {
    try {
      var data = await brandService.update_brand(req)
      return responseHelper.success(data, 'upadate data successfully', res);
    } catch (error) {
      console.log("====>", error)
      return responseHelper.error(error, res);
    }
  }

  //delete brand-data
  async delete_brand(req, res) {
    try {
      await validation.deletebrandvalidation(req.body);
      var data = await brandService.delete_brand(req)
      return responseHelper.success(data, 'delete data successfully', res);
    } catch (error) {
      console.log("====>", error)
      return responseHelper.error(error, res);
    }
  }

  //brand-list
  async brand_list(req, res) {
    try {
      var data = await brandService.brand_list(req.body);
      return responseHelper.success(data, 'brand', res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
}
module.exports = new brandController();         
const settingservice = require('../service/settingservice');
const responseHelper = require('../resources/respone');
const validate = require('../middleware/validation');
class settingcontroller {

  async insert_tax_data(req, res) {
    try {
      await validate.inserttaxdatavalidation(req.body);
      var data = await settingservice.insert_tax_data(req)
      return responseHelper.success(data, 'insert data successfully', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async update_tax_data(req, res) {
    try {
      await validate.updatetaxdatavalidation(req.body);
      var data = await settingservice.update_tax_data(req)
      return responseHelper.success(data, 'update data successfully', res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
}
module.exports = new settingcontroller()
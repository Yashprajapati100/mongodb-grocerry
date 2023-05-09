const stockservice = require('../service/stockservice');
const responseHelper = require('../resources/respone');
const validation = require("../middleware/validation");
const validate = require('../middleware/validation');

class stockcontroller {

  async stock_management(req, res) {
    try {
      await validate.stockmanagementvalidation(req.body);
      var data = await stockservice.stock_management(req)
      return responseHelper.success(data, 'stock data', res)
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
}
module.exports = new stockcontroller();
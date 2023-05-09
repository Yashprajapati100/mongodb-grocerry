const orderService = require('../service/orderservice')
const responseHelper = require('../resources/respone');
const validation = require('../middleware/validation')
var jwt = require('jsonwebtoken');
const secretKey = "secretKey";

class ordercontroller {
  async order_list(req, res) {
    try {
      var data = await orderService.orders_list();
      return responseHelper.success(data, 'orderlist', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async orders_details(req, res) {
    try {
      await validation.order_detailsvalidation(req.body);
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var user_id = decodedData.data[0].user_id
      var data = await orderService.orders_details(req, user_id);
      return responseHelper.success(data, 'oders-details', res);
    } catch (error) {
      console.log("======>", error);
      return responseHelper.error(error, res);
    }
  }
}
module.exports = new ordercontroller();

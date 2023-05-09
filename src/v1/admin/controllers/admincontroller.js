const adminservice = require('../service/adminservice');
const responseHelper = require('../resources/respone');
const validation = require("../middleware/validation");
const { Product, Admin, User, Address, Orders } = require('../../../data/models/index')
var jwt = require('jsonwebtoken');
const secretKey = "secretKey";

class admincontroller {
  //admin-login
  async login(req, res) {
    try {
      await validation.loginvalidation(req.body)
      var data = await adminservice.login(req.body)
      console.log("=====>", data)
      if (data) {
        data.auth_token = '';
        var token = jwt.sign({ data }, 'secretkey', { expiresIn: '100d' })
        data.auth_token = token;
        console.log("token=====>", token);
      }
      var update = await Admin.updateOne({ email: data.email }, { $set: { auth_token: token } });
      return responseHelper.success(data, 'login successfully', res)
    } catch (error) {
      console.log("errrrrrrr", error)
      return responseHelper.error(error, res);
    }
  }

  //user-list
  async user_list(req, res) {
    try {
      var data = await adminservice.user_list(req.body)
      return responseHelper.success(data, 'user-list', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }

  //user-details
  async user_details(req, res) {
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var user_id = decodedData.data[0].user_id
      var data = await adminservice.user_details(user_id)
      return responseHelper.success(data, 'user-details', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }

  //password-change
  async change_password(req, res) {
    try {
      await validation.changepasswordvalidation(req.body);
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var email = decodedData.data.email
      var data = await adminservice.change_password(req.body, email);
      return responseHelper.success(data, 'change password successfully', res)
    } catch (error) {
      console.log("=======>", error)
      return responseHelper.error(error, res);
    }
  }

  //password-forget
  async forget_password(req, res) {
    try {
      await validation.forgetpasswordvalidation(req.body);
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var admin_id = decodedData.data.admin_id
      var data = await adminservice.forget_password(req.body,admin_id)
      return responseHelper.success(data, 'password', res)
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
}
module.exports = new admincontroller();
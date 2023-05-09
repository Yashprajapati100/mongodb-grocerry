const productService = require('../service/productservice')
const responseHelper = require('../resources/respone');
const validation = require('../middleware/validation')

class productcontroller {
  async insert_product(req, res) {
    try {
      var data = await productService.insert_product(req);
      return responseHelper.success(data, 'insert data successfully', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async update_product(req, res) {
    try {
      var data = await productService.update_product(req);
      return responseHelper.success(data, 'update data successfully', res)
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async delete_product(req, res) {
    try {
      await validation.deleteproductvalidation(req.body)
      var data = await productService.delete_product(req)
      return responseHelper.success(data, 'delete data successfully', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async product_list(req, res) {
    try {
      var data = await productService.product_list(req.body);
      return responseHelper.success(data, 'product', res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
}
module.exports = new productcontroller();
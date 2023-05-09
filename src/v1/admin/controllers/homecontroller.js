const homeservice = require('../service/homeservice');
const responseHelper = require('../resources/respone');
const validate = require('../middleware/validation');
class homecontroller {

  // insert section_slider
  async add_slider(req, res) {
    try {
      var data = await homeservice.add_slider(req);
      return responseHelper.success(data, 'insert data successfully', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }

  //delete section_slider
  async delete_slider(req, res) {
    try {
      await validate.section_slidersdeletevalidation(req.body);
      var data = await homeservice.delete_slider(req);
      return responseHelper.success(data, 'delete data successfully', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }

  //section_slider-list
  async slider_list(req, res) {
    try {
      var data = await homeservice.slider_list(req)
      return responseHelper.success(data, 'setion_slider list', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }

  //insert section_category
  async add_section_category(req, res) {
    try {
      await validate.addsection_categoryvalidation(req.body);
      var data = await homeservice.add_section_category(req);
      return responseHelper.success(data, 'insert data successfully', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }

  //delete section_category
  async delete_section_category(req, res) {
    try {
      await validate.section_categorydeletevalidation(req.body);
      var data = await homeservice.delete_section_category(req);
      return responseHelper.success(data, 'delete data successfully', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }

  //section_category-list
  async section_category_list(req, res) {
    try {
      var data = await homeservice.Section_category_list()
      return responseHelper.success(data, 'section_category-list', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }

  //insert section-brand
  async add_section_brand(req, res) {
    try {
      await validate.addsection_brandvalidation(req.body)
      var data = await homeservice.add_section_brand(req)
      return responseHelper.success(data, 'add data successfully', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }

  //delete section_brand
  async delete_section_brand(req, res) {
    try {
      await validate.section_branddeletevalidation(req.body);
      var data = await homeservice.delete_section_brand(req)
      return responseHelper.success(data, 'delete data successfully', res)
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }

  //section_brand-list
  async section_brand_list(req, res) {
    try {
      var data = await homeservice.section_brand_list(req)
      return responseHelper.success(data, 'section_brand-list', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async add_section_product(req, res) {
    try {
      await validate.addsection_productvalidation(req.body)
      var data = await homeservice.add_section_product(req)
      return responseHelper.success(data, 'add data successfully', res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async delete_section_product(req, res) {
    try {
      await validate.section_productdeletevalidation(req.body)
      var data = await homeservice.delete_section_product(req);
      return responseHelper.success(data, 'delete data successfully', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async section_product_list(req, res) {
    try {
      var data = await homeservice.Section_product_list(req);
      return responseHelper.success(data, 'section_product-list', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }

}
module.exports = new homecontroller();
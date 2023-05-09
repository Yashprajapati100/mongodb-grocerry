const { Product } = require('../../../data/models/index')

class stockservice {

  //product stock management
  async stock_management(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Product.find({ category_id: req.body.category_id, subcategory_id: req.body.subcategory_id, brand_id: req.body.brand_id }, {
          productname: 1,
          variation: 1,
          price: 1
        })
        resolve(data)
      } catch (error) {
        return reject(error);
      }
    })
  }

}
module.exports = new stockservice()
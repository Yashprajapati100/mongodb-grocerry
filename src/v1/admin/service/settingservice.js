const { Setting } = require('../../../data/models/index');

class settingservice {

  async insert_tax_data(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Setting.create({
          free_delivery_upto: req.body.free_delivery_upto,
          delivery_charge: req.body.delivery_charge,
          tax: req.body.tax
        })
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async update_tax_data(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Setting.updateOne({ setting_id: req.body.setting_id },
          {
            $set: {
              free_delivery_upto: req.body.free_delivery_upto,
              delivery_charge: req.body.delivery_charge,
              tax: req.body.tax
            }
          })
        resolve(data)
      } catch (error) {
        return reject(error)
      }
    })
  }
}
module.exports = new settingservice();
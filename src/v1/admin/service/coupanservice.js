const { Coupan } = require('../../../data/models/index');

class coupanservice {

  async add_coupan(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Coupan.create({
          coupan_name: req.body.coupan_name,
          coupan_code: req.body.coupan_code,
          min_price: req.body.min_price,
          discount_price: req.body.discount_price,
          start_date: req.body.start_date,
          end_date: req.body.end_date
        })
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async update_coupan(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Coupan.updateOne({
          coupan_id: req.body.coupan_id
        },
          {
            $set: {
              coupan_name: req.body.coupan_name,
              coupan_code: req.body.coupan_code,
              min_price: req.body.min_price,
              discount_price: req.body.discount_price,
              start_date: req.body.start_date,
              end_date: req.body.end_date
            }
          })
        return resolve()
      } catch (error) {
        return reject(error);
      }
    })
  }
  async delete_coupan(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Coupan.deleteOne({ coupan_id: req.body.coupan_id });
        return resolve();
      } catch (error) {
        return reject(error);
      }
    })
  }
  async coupan_list() {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Coupan.find({})
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    })
  }
}
module.exports = new coupanservice();
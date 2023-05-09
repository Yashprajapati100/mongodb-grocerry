const coupanService = require('../service/coupanservice')
const responseHelper = require('../resources/respone');
const validate = require('../middleware/validation')

class coupancontroller {

    //add coupan-data
    async add_coupan(req, res) {
        try {
            await validate.addcoupanvalidation(req.body);
            var data = await coupanService.add_coupan(req)
            return responseHelper.success(data, 'coupan add succesfully', res);
        } catch (error) {
            return responseHelper.error(error, res);
        }
    }
    //update coupan-data
    async update_coupan(req, res) {
        try {
            await validate.updatecoupanvalidation(req.body);
            var data = await coupanService.update_coupan(req)
            return responseHelper.success(data, 'coupan data update succesfully', res);
        } catch (error) {
            return responseHelper.error(error, res);
        }
    }

    //delete coupan-data
    async delete_coupan(req, res) {
        try {
            await validate.deletecoupanvalidation(req.body);
            var data = await coupanService.delete_coupan(req);
            return responseHelper.success(data, 'coupan delete succesfully ', res);
        } catch (error) {
            return responseHelper.error(error, res);
        }
    }

    //coupan-list
    async coupan_list(req, res) {
        try {
            var data = await coupanService.coupan_list(req);
            return responseHelper.success(data, 'coupan-list', res);
        } catch (error) {
            return responseHelper.error(error, res);
        }
    }
}
module.exports = new coupancontroller();
const messages = require('../../../../config/constant.json');

class ResponseHelper {
  async success(data, message, res) {
    let responseData = {
      status: 200,
      message: message,
      data: data,
    }
    res.writeHead(responseData.status, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(responseData))
    res.end();
  }
  async error(error, res) {
    let errorCode = error.code || 501;
    let errorMessage = error.message || '';
    console.log('message ====>', error.message);
    res.writeHead(errorCode, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ status: errorCode, message: errorMessage, data: {} }))
    res.end();
  }
}
module.exports = new ResponseHelper();
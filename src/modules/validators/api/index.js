const { reject } = require("bluebird");
const Joi = require("joi");

class validate {

  async sendotpvalidation(mobilenumber) {
    try {
      const Schema = Joi.object({
        mobilenumber: Joi.string().length(10).pattern(/^[0-9]+$/).required()
      });
      const validationResult = Schema.validate({ mobilenumber }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (err) {
      return reject(err);
    }
  }

  async loginvalidation(body) {
    let { mobilenumber, otp } = body
    try {
      const Schema = Joi.object({
        mobilenumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        otp: Joi.required()
      });
      const validationResult = Schema.validate({ mobilenumber, otp }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (err) {
      return reject(err);
    }
  }

  async resendotpvalidation(mobilenumber) {
    try {
      const Schema = Joi.object({
        mobilenumber: Joi.string().length(10).pattern(/^[0-9]+$/).required()
      });
      const validationResult = Schema.validate({ mobilenumber }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (err) {
      return reject(err);
    }
  }
  async updatevalidation(firstname, lastname, email) {
    try {
      const Schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required()
      });
      const validationResult = Schema.validate({ firstname, lastname, email }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (err) {
      return reject(err);
    }
  }
  async productvalidation(subcategory_id) {
    try {
      const Schema = Joi.object({
        subcategory_id: Joi.string().required()
      });
      const validationResult = Schema.validate({ subcategory_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (error) {
      return reject(error);
    }
  }
  async add_cartvalidation(product_id, quantity) {
    try {
      const Schema = Joi.object({
        product_id: Joi.string().required(),
        quantity: Joi.string().required()
      });
      const validationResult = Schema.validate({ product_id, quantity }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (error) {
      return reject(error);
    }
  }
  async delete_cartvalidation(product_id) {
    try {
      const Schema = Joi.object({
        product_id: Joi.string().required()
      });
      const validationResult = Schema.validate({ product_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (error) {
      return reject(error);
    }
  }
  async add_addressvalidation(body) {
    try {
      let { type, home_detail, landmark, recipient_name } = body
      const Schema = Joi.object({
        type: Joi.required(),
        home_detail: Joi.string().required(),
        landmark: Joi.string().required(),
        recipient_name: Joi.string().required(),
      });
      const validationResult = Schema.validate({ type, home_detail, landmark, recipient_name }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (error) {
      return reject(error);
    }
  }

  async delete_addressvalidation(body) {
    try {
      let { address_id } = body
      const Schema = Joi.object({
        address_id: Joi.string().required()
      });
      const validationResult = Schema.validate({ address_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (error) {
      return reject(error);
    }
  }

  async brandsearchvalidation(body) {
    try {
      let { search } = body
      const Schema = Joi.object({
        search: Joi.string().required()
      });
      const validationResult = Schema.validate({ search }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (error) {
      return reject(error);
    }
  }
  async wish_listvalidation(body) {
    try {
      let { product_id } = body
      const Schema = Joi.object({
        product_id: Joi.string().required()
      });
      const validationResult = Schema.validate({ product_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (error) {
      return reject(error);
    }
  }
  async reviewvalidation(body) {
    try {
      let { product_id, review_star } = body
      const Schema = Joi.object({
        product_id: Joi.string().required(),
        review_star: Joi.string().required(),
      });
      const validationResult = Schema.validate({ product_id, review_star }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (error) {
      return reject(error);
    }
  }
  async order_detailsvalidation(body) {
    try {
      let { order_id } = body
      const Schema = Joi.object({
        order_id: Joi.required(),
      });
      const validationResult = Schema.validate({ order_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error);
        // return reject(validationResult.error)    
      }
    } catch (err) {
      return reject(err);
    }
  }
}
module.exports = new validate();













// const joiBase = require('joi');
// const joiDate = require("@joi/date");
// const joi = joiBase.extend(joiDate);
// const custMessages = require('../../../../config/constant.json'); 
// const promise = require('bluebird');
// const lang = 'en';

// const options = {
//     errors: {
//       wrap: {
//         label: ''
//       }
//     }
// };

// class ApiValidation{
//     async validateHeaders (headers){
//         try{
//             const schema = joi.object({
//                 language: joi.string().required(),
//                 authorization: joi.string().required(),
//                 device_token: joi.string().optional(),
//                 device_id: headers.app_version ? joi.string().required() : joi.string().optional(),
//                 device_type: headers.app_version ? joi.number().required() : joi.string().optional(),
//                 web_app_version : headers.web_app_version ? joi.any().required() : joi.any().optional(),
//                 app_version: headers.app_version ? joi.any().required() :  joi.any().optional(),
//                 os: joi.any().required(),
//                 timezone:headers.app_version ? joi.any().required() :  joi.any().optional(),
//             }).unknown();
//             return await schema.validateAsync(body,options)
//         }catch(error){
//             error.code = 400;
//             error.message = error.details[0].message;
//             return promise.reject(error)
//         }
//     }
//     async validateMotherSignUpForm(body){
//         try{
//             const schema = joi.object({
//                 register_type:joi.required().valid('1','2','3','4'),
//                 email:joi.when('register_type',{
//                             is: '1',
//                             then:
//                             joi.string().max(100).regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).trim(true).required()
//                             .messages({ 'string.pattern.base': custMessages[lang]['INVALID_EMAIL'] })
//                         }),
//                 password: joi.when('register_type', {is: '1',then:joi.string().min(6).max(18).required()}),
//                 google_id: joi.when('register_type', {is: '2',then:joi.string().required()}),
//                 facebook_id: joi.when('register_type', {is: '3',then:joi.string().required()}),
//                 apple_id: joi.when('register_type', {is: '4',then:joi.string().required()}),
//                 name:joi.allow('').optional(),
//             });
//             return await schema.validateAsync(body,options);
//         }catch(error){
//             console.log('error ====>',error);
//             error.code = 400;
//             error.message = error.details[0].message;
//             return promise.reject(error)
//         }
//     }
//     async validateSignIn(body){
//         try{
//             const schema = joi.object({
//                 register_type:joi.valid('1','2','3','4').required(),
//                 email:joi.when('register_type',{
//                         is: '1',
//                         then: 
//                         joi.string().max(100).regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).trim(true).required()
//                         .messages({ 'string.pattern.base': custMessages[lang]['INVALID_EMAIL'] })
//                     }),
//                 password: joi.when('register_type', {is: '1',then:joi.string().min(6).max(18).required()}),
//                 google_id: joi.when('register_type', {is: '2',then:joi.string().required()}),
//                 facebook_id: joi.when('register_type', {is: '3',then:joi.string().required()}),
//                 apple_id: joi.when('register_type', {is: '4',then:joi.string().required()}),
//                 name:joi.allow('').optional(),
//             });
//             return await schema.validateAsync(body,options);
//         }catch(error){
//             console.log('error ====>',error);
//             error.code = 400;
//             error.message = error.details[0].message;
//             return promise.reject(error)
//         }
//     }
// }

// module.exports = new ApiValidation()
const validator = require('../../../modules/validators/api/index')
const CommonController = require('./CommonController')
const UserService = require('../services/UserService')
const responseHelper = require('../../api/resources/response');
const { User, conn, UserDeviceToken } = require('../../../data/models/index')
var jwt = require('jsonwebtoken');
const secretKey = "secretKey";

class UserController {
  async send_otp(req, res) {
    try {
      await validator.sendotpvalidation(req.body.mobilenumber);
      var data = await UserService.send_otp(req.body);
      return responseHelper.success(data, "otp sucess", res);
    } catch (error) {
      console.log("========>errrrrr", error)
      return responseHelper.error(error, res);
    }
  }
  async login(req, res) {
    try {
      await validator.loginvalidation(req.body)
      var data = await UserService.login(req.body);
      if (data) {
        data[0].auth_token = ''
        var token = jwt.sign({ data }, 'secretkey', { expiresIn: '100d' })
        data[0].auth_token = token;
        console.log("token=====>", token);
      }
      var data3 = await User.updateOne({
        mobilenumber: data[0].mobilenumber
      }, { $set: { auth_token: token } }
      )
      return responseHelper.success(data, 'login successfully', res);
    } catch (error) {
      console.log("====>", error)
      return responseHelper.error(error, res);
    }
  }
  async resend_otp(req, res) {
    try {
      await validator.resendotpvalidation(req.body.mobilenumber)
      var data = await UserService.resend_otp(req.body);
      return responseHelper.success(data, "resend otp success", res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async update(req, res) {
    try {
      await validator.updatevalidation(req.body.firstname, req.body.lastname, req.body.email)
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var mobilenumber = decodedData.data[0].mobilenumber
      var data = await UserService.update(req.body, mobilenumber);
      return responseHelper.success(data, 'update profile successfully', res)
    } catch (error) {
      console.log("ERRRRRRrr", error)
      return responseHelper.error(error, res);
    }
  }
  async category(req, res) {
    try {
      const data = await UserService.category()
      return responseHelper.success(data, "all category", res);
    } catch (error) {
      console.log("======>ee", error)
      return responseHelper.error(error, res);
    }
  }
  async product(req, res) {
    try {
      await validator.productvalidation(req.body.subcategory_id)
      var data = await UserService.product(req.body);
      return responseHelper.success(data, "subcategory", res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }

  async add_cart(req, res) {
    try {
      await validator.add_cartvalidation(req.body.product_id, req.body.quantity);
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var data = await UserService.add_cart(req.body, user_id);
      return responseHelper.success(data, "add data successfully", res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async delete_cart(req, res) {
    try {
      await validator.delete_cartvalidation(req.body.product_id)
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var data = await UserService.delete_cart(req.body, user_id);
      return responseHelper.success(data, "delete data sucessfully", res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async search_product(req, res) {
    try {
      var data = await UserService.search_product(req.body);
      return responseHelper.success(data, "search", res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async wish_list(req, res) {
    try {
      await validator.wish_listvalidation(req.body);
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var data = await UserService.wish_list(req.body, user_id);
      return responseHelper.success(data, "wish_list ", res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async get_wish_list(req, res) {
    try {
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var data = await UserService.get_wish_list(user_id)
      return responseHelper.success(data, "wish_list", res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async brand_filter(req, res) {
    try {
      var data = await UserService.brand_filter(req.body)
      return responseHelper.success(data, "brand filter", res)
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async brand_search(req, res) {
    try {
      await validator.brandsearchvalidation(req.body);
      var data = await UserService.brand_search(req.body);
      return responseHelper.success(data, "brand-search", res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async discount(req, res) {
    try {
      var data = await UserService.discount()
      return responseHelper.success(data, "discount data", res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async sortby(req, res) {
    try {
      var data = await UserService.sortby()
      return responseHelper.success(data, "sort by data", res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async price_range(req, res) {
    try {
      var data = await UserService.price_range()
      return responseHelper.success(data, "price range", res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async add_address(req, res) {
    try {
      await validator.add_addressvalidation(req.body)
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var data = await UserService.add_address(req.body, user_id);
      return responseHelper.success(data, "add address successfullly", res);
    } catch (error) {
      console.log("======>", error)
      return responseHelper.error(error, res);
    }
  }
  async delete_address(req, res) {
    try {
      await validator.delete_addressvalidation(req.body)
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var user_id = decodedData.data[0].user_id;
      var data = await UserService.delete_address(req.body, user_id)
      return responseHelper.success(data, "delete address successfully", res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async address_list(req, res) {
    try {
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var data = await UserService.address_list(user_id)
      return responseHelper.success(data, 'address list data', res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async home_page(req, res) {
    try {
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var data = await UserService.home_page(user_id)
      return responseHelper.success(data, 'home page', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async add_review(req, res) {
    try {
      await validator.reviewvalidation(req.body)
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var data = await UserService.add_review(req.body, user_id)
      return responseHelper.success(data, 'add review successfully', res)
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async cart_list(req, res) {
    try {
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var data = await UserService.cart_list(req.body, user_id)
      return responseHelper.success(data, 'cart - data', res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async check_out(req, res) {
    try {
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var data = await UserService.check_out(req.body, user_id)
      return responseHelper.success(data, 'checkout', res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async order_list(req, res) {
    try {
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var data = await UserService.order_list(user_id)
      return responseHelper.success(data, 'orders-list', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async order_details(req, res) {
    try {
      await validator.order_detailsvalidation(req.body)
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user = decodedData.data[0].user_id;
      var data = await UserService.order_details(req.body, user);

      return responseHelper.success(data, 'oders-details', res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async add_customer(req, res) {
    try {
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var firstname = decodedData.data[0].firstname;
      var lastname = decodedData.data[0].lastname;
      var email = decodedData.data[0].email;
      var data = await UserService.add_customer(user_id, firstname, lastname, email);
      return responseHelper.success(data, 'add-customer', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async add_card(req, res) {
    try {
      var data = await UserService.add_card(req)
      return responseHelper.success(data, 'add-card', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async create_charge(req, res) {
    try {
      var data = await UserService.create_charge(req)
      return responseHelper.success(data, 'create-charge', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async aadd_customer(req, res) {
    try {
      let token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var user_id = decodedData.data[0].user_id;
      var firstname = decodedData.data[0].firstname;
      var lastname = decodedData.data[0].lastname;
      var email = decodedData.data[0].email;
      var data = await UserService.aadd_customer(user_id, firstname, lastname, email);
      return responseHelper.success(data, 'add-customer', res);
    } catch (error) {
      console.log('------>',error)
      return responseHelper.error(error, res);
    }
  }
  async added_card(req, res) {
    try {
      var data= await UserService.added_card(req);
      return responseHelper.success(data, 'card-add', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async charge(req, res) {
    try {
      var data = await UserService.charge(req)
      return responseHelper.success(data, 'create-charge', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }}
module.exports = new UserController();







/* mother || user signup */
    // async signup(req, res) {
    //     const body = await CommonController.removeEmptyParams(req.body);
    //     req.body = body;
    //     try {
    //         const body = req.body;
    //         await validator.validateMotherSignUpForm(body);
    //         if (req.body.register_type == 1) {
    //             delete req.body.google_id
    //             delete req.body.facebook_id
    //             delete req.body.apple_id
    //             await UserService.signupWithEmail(req);
    //             return responseHelper.success(res, 'EMAIL_VERIFICATION', {});
    //         } else {
    //             const user = await UserService.otherSigninMethod(req);
    //             return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    //         }
    //     } catch (error) {
    //         console.log('error=======>', error)
    //         return responseHelper.error(res, error.message || '', error.code || 500);
    //     }
    // }
    // /* verify email address api */
    // async verifyMail(req, res) {
    //     try {
    //         await UserService.verifyMail(req)
    //         res.render(base_path+'/src/views/html/backend/verify-status', {
    //             status: true
    //         });
    //     } catch (error) {
    //         console.log('error =======>',error)
    //         var message = error;
    //         res.render(base_path+'/src/views/html/backend/verify-status', {
    //             message: message,
    //             status: false
    //         });
    //     }
    // }
    // /* user login api */
    // async signin(req, res) {
    //     let t;
    //     const body = await CommonController.removeEmptyParams(req.body);
    //     req.body = body;
    //     try {
    //         const message = getMessages(req.headers);
    //         await validator.validateSignIn(req.body);
    //         // email
    //         if (req.body.register_type == 1) {
    //             const user = await UserService.validateEmailLogin(req);
    //             delete req.body.google_id
    //             delete req.body.facebook_id
    //             delete req.body.apple_id
    //             user.comparePassword(req.body.password, async (err, isMatch) => {
    //                 t = await sequelize.transaction();
    //                 if (isMatch != undefined && !err) {
    //                     var token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.               AUTHORIZATION_SECRET_KEY, {
    //                         expiresIn: expiresIn
    //                      });
    //                     const userData = await userResponse.userResponse(user);
    //                     userData.token = token;
    //                     await user.createToken({
    //                         fk_user_id: user.user_id,
    //                         device_id: req.headers.device_id || '',
    //                         device_token: token,
    //                         device_type: req.headers.device_type || '',
    //                     }, {
    //                         transaction: t
    //                     })
    //                     await t.commit();
    //                     return responseHelper.success(res, 'LOGIN_SUCCESS', userData);
    //                 } else {
    //                     return responseHelper.error(res, 'INVALID_PASSWORD', 400);
    //                 }
    //             })
    //         }
    //         if (req.body.register_type != 1) {
    //             const user = await UserService.otherSigninMethod(req);
    //             return responseHelper.success(res, 'LOGIN_SUCCESS', user);
    //         }
    //     } catch (error) {
    //         if (t) { await t.rollback();}
    //         console.log(error);
    //         return responseHelper.error(res, error.message || '', error.code || 500);
    //     }
    // }
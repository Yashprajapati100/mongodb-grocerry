const { Product, Admin, User, Address, Orders } = require('../../../data/models/index')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");


class adminservice {
  async login(body) {
    try {
      let { email, password } = body
      return new Promise(async (resolve, reject) => {

        const hash = await bcrypt.hashSync(password, 10)
        var data = await Admin.find({ email: email })
        if (data.length > 0) {
          var x = bcrypt.compareSync(`${password}`, data[0].password)
          console.log("compare==========>", x);
          if (x) {
            return resolve(data[0]);
          }
          else {
            let error = Error('Please Enter Valid password.');
            error.code = 400;
            reject(error)
          }
        } else {
          var data = await Admin.create({ email: email, password: hash })
        }
        return resolve(data);
      })
    } catch (error) {
      return reject(error);
    }
  }
  async user_list() {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await User.find({})
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async user_details(user_id) {
    return new Promise(async (resolve, reject) => {
      var userdata = await Address.aggregate([{
        $match: { user_id: mongoose.Types.ObjectId(user_id) }
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "user_id",
          as: "users"
        }
      }, {
        $unwind: '$users',
      },
      {
        $group: {
          _id: '$_id',
          name: {
            $first: { $concat: ['$users.firstname', ' ', '$users.lastname'] }
          },
          mobilenumber: {
            $first: '$users.mobilenumber',
          },
          email: {
            $first: '$users.email',
          },
          address_id: {
            $first: '$address_id',
          },
          address: {
            $first: { $concat: ['$home_detail', ',', '$landmark'] }
          },
        }
      }
      ])
      var orderdata = await Orders.aggregate([{
        $match: { user_id: mongoose.Types.ObjectId(user_id) }
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "user_id",
          as: "users"
        }
      }, {
        $unwind: '$users',
      },
      {
        $group: {
          _id: '$_id',
          order_id: {
            $first: '$order_id'
          },
          date: {
            $first: '$date'
          },
          user_details: {
            $first: { $concat: ['$users.firstname', ' ', '$users.lastname'] }
          },
          Amount: {
            $first: '$grandtotal',
          },
          payment_type: {
            $first: '$payment_type',
          },
          status: {
            $first: '$status',
          },
        }
      }
      ])
      return resolve(userdata.concat([orderdata]))
    })
  }

  async change_password(body, email) {
    return new Promise(async (resolve, reject) => {
      try {
        let { password, Newpassword, confirmNewpassword } = body
        var data = await Admin.find({ email: email })
        console.log("=======>", data)
        if (data.length > 0) {
          var x = bcrypt.compareSync(`${password}`, data[0].password)
          console.log("compare==========>", x);
          if (x) {
            if (password === Newpassword) {
              let error = Error('plz new password.');
              error.code = 400;
              reject(error)
            } else if (Newpassword === confirmNewpassword) {
              confirmNewpassword = await bcrypt.hashSync(password, 10)
              var upadte = await Admin.updateMany({ email: email }, { $set: { password: confirmNewpassword } })
              return resolve()
            }
            else {
              return reject({ message: " confirmNewpassword incorrect please enter valid password" })
            }
          } else {
            return reject({ message: "please enter valid  password" })
          }
        } else {
          return reject({ message: "admin not avialable" })
        }
      } catch (error) {
        return reject(error)
      }
    })
  }

  async forget_password(body, admin_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let { email } = body
        var data = await Admin.find({ email: email, admin_id: admin_id });
        if (data.length > 0) {
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: 'tristate.mteam@gmail.com',
              pass: 'nuwuxqxjnogjuwyb'
            }
          });
          var mailOptions = await transporter.sendMail({
            from: 'tristate.mteam@gmail.com',
            to: 'yashpra14@gmail.com',
            subject: 'password',
            text: 'data[0].password'
          });
          console.log("======>", mailOptions)
          return resolve(mailOptions);
        }
        else {
          return reject({ message: "email not match" })
        }

      } catch (error) {
        return reject(error);
      }
    })
  }
}
module.exports = new adminservice()
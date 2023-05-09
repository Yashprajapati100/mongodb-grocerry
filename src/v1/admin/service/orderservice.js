const { User, conn, UserDeviceToken, Category, SubCategory, Product, Brand, Add_cart, Wish_list, Address, Section, Section_slider, Section_product, Section_brand, Section_category, Review, Setting, Coupan, Orders, Order_item } = require('../../../data/models/index')

class orders {
  async orders_list() {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Orders.find({}, {
          order_id: 1,
          user_id: 1,
          payment_type: 1,
          grandtotal: 1,
          date: 1

        })
        return resolve(data);
      })
    } catch (error) {
      return reject(error);
    }
  }
  async orders_details(req, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        var totalprice = 0
        var ordersdata = await Orders.find({ order_id: req.body.order_id }, {
          order_id: 1,
          payment_type: 1
        })
        if (ordersdata.length > 0) {
          var del = await Address.aggregate([{
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
              user_id: {
                $first: '$users.user_id',
              },
              firstname: {
                $first: '$users.firstname'
              },
              mobilenumber: {
                $first: '$users.mobilenumber',
              },
              email: {
                $first: '$users.email',
              },
              home_detail: {
                $first: '$home_detail',
              },
              landmark: {
                $first: '$landmark',
              },
            }
          }
          ])
          var data = await Add_cart.aggregate([{
            $lookup: {
              from: "product",
              localField: "product_id",
              foreignField: "product_id",
              as: "products"
            }
          }, {
            $unwind: '$products',
          },
          {
            $group: {
              _id: '$_id',
              product_id: {
                $first: '$products.product_id',
              },
              variation: {
                $first: '$products.variation'
              },
              price: {
                $first: '$products.price',
              },
              quantity: {
                $first: '$quantity',
              },
              total: {
                $first: { $sum: { $multiply: ["$quantity", "$products.price"] } }
              }
            }
          }
          ])
          for (let i = 0; i < data.length; i++) {
            totalprice = totalprice + data[i].total
          }
          console.log("+++++++", totalprice)
          var taxdata = await Setting.find({}, { tax: 1 })
          var tax = totalprice * taxdata[0].tax / 100
          console.log("=======>", tax)
          var grandtotal = totalprice + tax
          console.log("========>", grandtotal)

          var dataall = {
            totalprice,
            tax, grandtotal
          }
          resolve(del.concat([data, dataall]))
        } else {
          var data = {
            message: "order_id must be right and plz enter order-id"
          }
          return reject(data)
        }
      })
    } catch (error) {
      return reject(error);
    }
  }
}
module.exports = new orders();
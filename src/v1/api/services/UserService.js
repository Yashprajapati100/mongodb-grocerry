const { User, conn, UserDeviceToken, Category, SubCategory, Product, Brand, Add_cart, Wish_list, Address, Section, Section_slider, Section_product, Section_brand, Section_category, Review, Setting, Coupan, Orders, Order_item, Customer, Card_details, Card_charge, Payment } = require('../../../data/models/index')
const promise = require('bluebird')
const ejs = require('ejs')
const path = require('path')
const helper = require('../../../utills/helper')
const moment = require('moment')
const Publishable_Key = "pk_test_51NCyx5SJb1N6yFiBEyUzWfYEP7Zc7QZPCyNrxpyxmtnjAWUTOamTzBzz9Ycv24BL9ZK5YZ8HWecyerfaLOX9zJwf00xCZoXZJE"
const SECRET_KEY = "sk_test_51ND512C9L1H5XcY2uEBdSAC3svG3nZAjs1JCosze8alwoYkYCYDHcJIFDJBVu11MBe9YPPOa1J39KA5laUMd7pEB00Wjf01UdN"
const stripe = require("stripe")(SECRET_KEY);
const {
  resolve
} = require('path')
const { Schema, default: mongoose } = require('mongoose')

class UserService {

  //user send otp and new mobilenumber insert
  async send_otp(body) {
    try {
      let { mobilenumber } = body
      return new Promise(async (resolve, reject) => {
        var check = await User.find({
          "mobilenumber": mobilenumber
        })
        console.log("=========>sss", check)
        if (check.length > 0) {
          var otpdata = Math.floor(1000 + Math.random() * 9000);
          console.log("otp===>", otpdata);
          resolve(otpdata)
          var update = await User.updateOne({ mobilenumber: mobilenumber }, { $set: { otp: otpdata } })
        } else {
          var insert = await User.create({
            mobilenumber: mobilenumber
          })
          if (insert) {
            var val = Math.floor(1000 + Math.random() * 9000);
            var updatedata = await User.updateOne({ mobilenumber: mobilenumber }, { $set: { otp: val, is_register: "1" } }
            )
            console.log("otpval===>", val);
            resolve(val);
          }
        }
      })
    } catch (error) {
      return reject(error);
    }
  }

  //mobilenumber and otp verify and token genrate
  async login(body) {
    try {
      let { mobilenumber, otp } = body
      return new Promise(async (resolve, reject) => {
        var selectdata = await User.find({ mobilenumber: mobilenumber });
        console.log("=========>", selectdata);
        if (selectdata.length > 0) {
          var sd = await User.find({
            mobilenumber: mobilenumber, otp: otp
          })
          if (sd.length > 0) {
            return resolve(sd)
          } else {
            var err = Error("otp is not valid")
            reject(err)
          }
        }
        var data = {
          message: "plz enter a valid phone number "
        }
        reject(data);
      })
    } catch (error) {
      return reject(error);
    }
  }

  //user -resend otp 
  async resend_otp(body) {
    let { mobilenumber } = body
    try {
      return new Promise(async (resolve, reject) => {
        var select = await User.find({
          mobilenumber: mobilenumber, is_register: "1"
        })
        if (select.length > 0) {
          var otp = Math.floor(1000 + Math.random() * 9000);
          console.log("otp=====>", otp);
          var updatedata = await User.updateOne({ mobilenumber: mobilenumber }, { $set: { otp: otp } })

          return resolve(otp)
        } else {
          var data = {
            message: "plz enter a valid mobilenumber"
          }
          return reject(data)
        }
      })
    } catch (error) {
      return reject(error);
    }
  }

  //user profile update
  async update(body, mobilenumber) {
    let { firstname, lastname, email } = body
    try {
      return new Promise(async (resolve, reject) => {
        const checkmail = await User.find({ email: email })

        for (let i = 0; i < checkmail.length; i++) {
          if (checkmail[i].email == email && checkmail[i].mobilenumber == mobilenumber) {
            var update = await User.updateOne({ mobilenumber: mobilenumber }, { $set: { firstname: firstname, lastname: lastname, email: email } })
            if (update) {
              console.log("=======>", update)
              resolve("profile is updated")
            }
          } else {
            var error = Error("email already exit");
            reject(error);
          }
        }
        if (!checkmail.length > 0) {
          var updatedata = await User.updateOne({ mobilenumber: mobilenumber }, { $set: { firstname: firstname, lastname: lastname, email: email } })
          console.log("=======>", updatedata)
          if (updatedata) {
            resolve("profile is updateed")
            var query = await User.find({ mobilenumber: mobilenumber, is_register: "1" })
          } else {
            var error = Error("not updated your data")
            reject(error);
          }
        }
      })
    } catch (error) {
      return resolve(error);
    }
  }

  //category to subcategory data fetch
  async category() {
    try {
      return new Promise(async (resolve, reject) => {
        const category = await Category.aggregate([
          {
            $lookup:
            {
              from: "subcategory",
              localField: "category_id",
              foreignField: "category_id",
              as: "subcategory"
            }
          }
        ])
        return resolve(category);
      })
    } catch (error) {
      return reject(error)
    }
  }

  // product to subcategory data fetch
  async product(body) {
    try {
      let { subcategory_id } = body
      return new Promise(async (resolve, reject) => {
        var data = await SubCategory.find({ subcategory_id: subcategory_id })
        if (data.length > 0) {
          var product = await Product.find({ subcategory_id: subcategory_id })
          var brand = await Brand.find({ subcategory_id: subcategory_id })
          console.log("========>", brand)
          return resolve({ productlist: product, brandlist: brand })
        }
        return resolve(product)
      })
    } catch (error) {
      return reject(error);
    }
  }

  // product add to  cart
  async add_cart(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { product_id, quantity } = body
        var check = await Add_cart.find({ product_id: product_id, user_id: user_id })
        if (check.length > 0) {
          if (quantity > 0) {
            var update = await Add_cart.updateOne({ product_id: product_id, user_id: user_id }, { $set: { quantity: quantity } })
            resolve("quantity is updateed")
          } else {
            resolve("quantity is grater then zero")
          }
        } else {
          var select = await Product.find({ product_id: product_id })
          if (select.length > 0) {
            if (select[0].stock == 1) {
              var insert = await Add_cart.create({ product_id: product_id, user_id: user_id, quantity: quantity })
              resolve('quantity is added')
            } else {
              resolve("stock is not availabel")
            }
          } else {
            resolve("product not found");
          }
        }
      })
    } catch (error) {
      return reject(error);
    }
  }

  //delete product from cart
  async delete_cart(body, user_id) {
    try {
      let { product_id } = body
      return new Promise(async (resolve, reject) => {
        var select = await Add_cart.find({ product_id: product_id })
        if (select.length > 0) {
          var delet = await Add_cart.deleteOne({ user_id: user_id, product_id: product_id })
          resolve(delet[0])
        }
      })
    } catch (error) {
      return reject(error);
    }
  }

  //search product 
  async search_product(body) {
    try {
      let { search, filter } = body
      return new Promise(async (resolve, reject) => {
        var dara = search.trim()
        var data = await Product.aggregate([{ $match: { productname: new RegExp(dara), } }])
        var serchingdata = this.filterBy(filter)
        resolve(data.concat(serchingdata));
        resolve(data)
      })
    } catch (error) {
      return reject(error);
    }
  }

  async filterBy(filter) {
    if ('price' in filter && filter.price) {
      var zipConversionStage = {
        addFields: {
          convertedZipCode: { $toString: "$brand_id" }
        }
      }
    }
    if ('price' in filter && filter.price) {
      let minPrice = filter.price.min;
      let maxPrice = filter.price.max;

      var data = await Product.aggregate([
        {
          $lookup: {
            from: "brand",
            localField: "brand_id",
            foreignField: "brand_id",
            as: "brands",
            pipeline: [
              {
                $match: { zipConversionStage }
              },
              {
                $match: { price: { $gt: minPrice, $lt: maxPrice } }
              }
            ]
          }
        },
      ])
    }
    return data;
  }

  // product is add wishlist
  async wish_list(body, user_id) {
    try {
      let { product_id } = body
      return new Promise(async (resolve, reject) => {
        var finddata = await Product.find({ product_id: product_id })
        if (finddata.length > 0) {
          var check = await Wish_list.find({ user_id: user_id, product_id: product_id })
          if (check.length > 0) {
            var delet = await Wish_list.deleteOne({ user_id: user_id, product_id: product_id })
            var del = { message: "product removed from wish_list" }
            resolve(del)
            if (delet) {
              var flag1 = await Product.updateOne({ product_id: product_id }, { $set: { flag: '0' } })
            }
          } else {
            var inser = await Wish_list.create({ user_id: user_id, product_id: product_id })
            var insertdata = { message: "product added to wish_list successfully" }
            resolve(insertdata)
            if (inser) {
              var flag2 = await Product.updateOne({ product_id: product_id }, { $set: { flag: '0' } })
            }
          }
        }
        else {
          var err = { message: "product id not found please enter valid product id" }
          reject(err)
        }
      })
    } catch (error) {
      return reject(error);
    }
  }

  // user is wish list  detail
  async get_wish_list(user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        const data = await Wish_list.aggregate([
          { $match: { user_id: mongoose.Types.ObjectId(user_id) } }, {
            $lookup: {
              from: "product",
              localField: "product_id",
              foreignField: "product_id",
              as: "product"
            }
          }, {
            $project: {
              _id: 0,
              product: { _id: 1, image: 1, productname: 1, variation: 1, price: 1, discount: 1 }
            }
          }
        ])
        let result = data.map(({ product }) => product[0])
        if (result) {
          return resolve(result);
        }
      })
    } catch (error) {
      return reject(error);
    }
  }

  async brand_filter() {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Brand.find()
        return resolve(data)
      })
    } catch (error) {
      return reject(error);
    }
  }

  //brand search
  async brand_search(body) {
    try {
      let { search } = body
      return new Promise(async (resolve, reject) => {
        var searching = search.trim()
        var data = await Brand.find({ name: { $regex: searching } })
        return resolve(data);
      })
    } catch (error) {
      return reject(error);
    }
  }

  //discount price
  async discount() {
    return new Promise(async (resolve, reject) => {
      var dis = {
        1: "upto 5%",
        2: "5%-10%",
        3: "10%-15%",
        4: "15%-20%",
        5: "more than 25%"
      }
      resolve(dis);
    })
  }

  //sortby product
  async sortby() {
    return new Promise(async (resolve, reject) => {
      var sort = {
        1: "popularity",
        2: "price -low to high",
        3: "price -high to low",
        4: "Alphabetical",
        5: "Rupee saving - high to low",
        6: "Rupee saving - low to high",
        7: "%off-high to low"
      }
      resolve(sort);
    })
  }

  //price range
  async price_range(price) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Product.aggregate([
          {
            "$group": {
              "_id": "$Productname",
              "max": { "$max": "$price" },
              "min": { "$min": "$price" }
            }
          }
        ])
        resolve(data);
      })
    } catch (error) {
      return reject(error);
    }
  }

  // user add address
  async add_address(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { type, home_detail, landmark, recipient_name } = body
        var check = await Address.find({ user_id: user_id, type: type })
        if (!check.length > 0) {
          var inser = await Address.create({ type: type, home_detail: home_detail, landmark: landmark, recipient_name: recipient_name, user_id: user_id })
          return resolve(inser);
        } else {
          var err = { message: "user is all ready address insert" }
          return reject(err);
        }
      })
    } catch (error) {
      return reject(error);
    }
  }

  // user delete address
  async delete_address(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { address_id } = body
        var data = await Address.find({ user_id: user_id, address_id: address_id })
        if (data.length > 0) {
          var data = await Address.deleteOne({ user_id: user_id, address_id: address_id })
          return resolve(data[0])
        } else {
          var err = { message: "address_id is not available " }
          return reject(err);
        }
      })
    } catch (error) {
      return reject(error);
    }
  }

  //user adress list
  async address_list(user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Address.find({ user_id: user_id })
        return resolve(data);
      })
    } catch (error) {
      return reject(error)
    }
  }

  // home page section type
  async home_page() {
    return new Promise(async (resolve, reject) => {
      try {
        var final = []
        var sum = 0
        const section = await Section.find()
        for (let i = 0; i < section.length; i++) {
          var data = await Section.aggregate([
            { $match: { section_id: section[i].section_id } },
            {
              $lookup:
              {
                from: "section_slider",
                localField: "section_id",
                foreignField: "section_id",
                as: "imageslider"
              }
            },
            {
              $lookup:
              {
                from: "section_category",
                localField: "section_id",
                foreignField: "section_id",
                as: "sectioncategory",
                pipeline: [
                  {
                    $unwind: {
                      path: '$section_category',
                      preserveNullAndEmptyArrays: true,
                    }
                  },
                  {
                    $lookup: {
                      from: "category",
                      localField: "category_id",
                      foreignField: "category_id",
                      as: "sectioncategorys"
                    }
                  },
                  {
                    $unwind: '$sectioncategorys',
                  },
                  {
                    $group: {
                      _id: '$_id',
                      category_id: {
                        $first: '$sectioncategorys.category_id',
                      },
                      image: {
                        $first: '$sectioncategorys.image',
                      },
                      offer: {
                        $first: '$offer',
                      },
                      section_id: {
                        $first: '$section_id',
                      },
                      status: {
                        $first: '$sectioncategorys.status',
                      }
                    }
                  }
                ]
              }
            },
            {
              $lookup:
              {
                from: "section_product",
                localField: "section_id",
                foreignField: "section_id",
                as: "sectionproduct",
                pipeline: [
                  {
                    $unwind: {
                      path: '$section_product',
                      preserveNullAndEmptyArrays: true,
                    }
                  },
                  {
                    $lookup: {
                      from: "product",
                      localField: "product_id",
                      foreignField: "product_id",
                      as: "sectionproduct"
                    }
                  },
                  {
                    $unwind: '$sectionproduct',
                  },
                  {
                    $group: {
                      _id: '$_id',
                      product_id: {
                        $first: '$sectionproduct.product_id',
                      },
                      productname: {
                        $first: '$sectionproduct.productname',
                      },
                      image: {
                        $first: '$sectionproduct.image',
                      },
                      decription: {
                        $first: '$sectionproduct.decription',
                      },
                      short_decrition: {
                        $first: '$sectionproduct.short_decrition',
                      },
                      section_id: {
                        $first: '$section_id',
                      },
                      variation: {
                        $first: '$sectionproduct.variation',
                      }
                    }
                  }
                ]
              }
            },
            {
              $lookup:
              {
                from: "section_brand",
                localField: "section_id",
                foreignField: "section_id",
                as: "sectionbrand",
                pipeline: [
                  {
                    $unwind: {
                      path: '$section_brand',
                      preserveNullAndEmptyArrays: true,
                    }
                  },
                  {
                    $lookup: {
                      from: "brand",
                      localField: "brand_id",
                      foreignField: "brand_id",
                      as: "sectionbrand"
                    }
                  },
                  {
                    $unwind: '$sectionbrand',
                  },
                  {
                    $group: {
                      _id: '$_id',
                      brand_id: {
                        $first: '$sectionbrand.brand_id',
                      },
                      name: {
                        $first: '$sectionbrand.name',
                      },
                      image: {
                        $first: '$sectionbrand.image',
                      },
                      section_id: {
                        $first: '$section_id',
                      }
                    }
                  }
                ]
              }
            }
          ])
          var object = Object.assign({}, ...data);
          final.push(object)
        }
        return resolve(final)
      } catch (error) {
        return reject(error)
      }
    })
  }

  //cart -list and grand_total
  async cart_list(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { quantity, product_id } = body
        var del = await Add_cart.aggregate([{
          $match: { user_id: mongoose.Types.ObjectId(user_id) }
        }, {
          $lookup: {
            from: "product",
            localField: "product_id",
            foreignField: "product_id",
            as: "product"
          }
        }, {
          $project: {
            _id: 0,
            product: { _id: 1, image: 1, productname: 1, variation: 1, price: 1, discount: 1 }
          }
        }
        ])
        var updatedata = await Add_cart.updateOne({ user_id: user_id, product_id: product_id }, { $set: { quantity: quantity } })
        var delproduct = await Add_cart.deleteOne({ quantity: '0' })
        var result = del.map(({ product }) => product[0])
        console.log("======>", result)
        // if(result){resolve(result)}
        let cart = await this.cart(user_id, body)
        return resolve(result.concat(cart))
      })

    } catch (error) {
      return reject(error)
    }
  }
  async cart(user_id, body) {
    let { coupan_id } = body
    var discountsum = 0;
    var cartdiscount = [];
    var sum = 0;

    var total = await Add_cart.aggregate([
      { $match: { user_id: mongoose.Types.ObjectId(user_id) } }, {
        $lookup: {
          from: "product",
          localField: "product_id",
          foreignField: "product_id",
          as: "products"
        }
      }, { $unwind: '$products' },
      {
        $group: {
          _id: '$product_id',
          price: {
            $first: "$products.price"
          },
          quantity: {
            $first: '$quantity',
          },
          discount_price: {
            $first: '$products.discount_price'
          },
          discount: {
            $first: "$products.discount"
          },
          finalprice: {
            $sum: { $multiply: ["$quantity", "$products.price"] }
          }
        }
      },

    ])
    console.log('====>dddddd', total)
    for (let i = 0; i < total.length; i++) {
      sum = sum + total[i].finalprice
    }
    console.log("SUM++++++++++", sum)
    for (let k = 0; k < total.length; k++) {
      total[k].price = total[k].price * total[k].quantity
      total[k].discount = total[k].discount * total[k].quantity
      total[k].discount_price = total[k].discount_price * total[k].quantity
      console.log("quantity==>", total[k].price)

      var discount = total[k].price * total[k].discount / 100
      console.log("discount rate price", discount)
      if (discount < total[k].discount_price) {
        var discountdata = total[k].price - discount
      } else {
        var discountdata = total[k].price - total[k].discount_price
      }
      cartdiscount.push(discountdata)
    }
    for (let j = 0; j < cartdiscount.length; j++) {
      discountsum = discountsum + cartdiscount[j];
    }
    console.log("discountsum", discountsum);
    let tax = await Setting.find({ $tax: 1 })
    console.log("======>", tax)
    var taxdata = tax[0].tax
    tax = sum * taxdata / 100
    // var final = sum + tax
    let charge = await Setting.find({ "$free_delivery_upto": 1 })
    var ch = charge[0].free_delivery_upto

    if (sum > ch) {
      var result = "free"
    } else {
      var del = await Setting.find({ "$delivery_charge": 1 })
      var result2 = del[0].delivery_charge
    }
    if (result) {
      var data = sum + tax
    } else {
      var overalltotal = sum + result2 + tax
    }
    var coupan = await Coupan.find({ coupan_id: coupan_id })
    if (coupan.length > 0) {
      var d = new Date()
      var currentdate = moment(d)
      var enddate = moment(coupan[0].enddate)
      if (currentdate.isSameOrBefore(enddate)) {
        if (sum > coupan[0].min_price) {
          discountsum = discountsum + coupan[0].discount_price
        } else {
          resolve(`total is grater than '${coupan[0].min_price}' than coupon is used`);
        }
      } else {
        resolve('coupan is exprise');
      }
    }
    let basket = {
      total: sum,
      discount_price: discountsum,
      TAX: tax,
      deliverycharge: result || result2,
      grandtotal: data || overalltotal,
      totalsaving: discountsum
    }
    return basket;
  }

  //user checkout and total amount
  async check_out(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { address_id, coupan_id } = body
        var address = await Address.find({ user_id: user_id, address_id: address_id })
        var cod = "COD"
        var data = await this.cart(user_id, body)
        var date = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        var check = await Add_cart.find({ user_id: user_id })

        if (check.length > 0) {
          let insert = await Orders.create({ user_id: user_id, address_id: address[0].address_id, date: date, subtotal: data.total, delivery_charge: data.deliverycharge, grandtotal: data.grandtotal, payment_type: cod, status: 1, coupan_id: coupan_id })

          if (insert) {
            var index = await Orders.aggregate([
              { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
              {
                $lookup: {
                  from: "add_cart",
                  localField: "user_id",
                  foreignField: "user_id",
                  as: "cartlist",
                  pipeline: [
                    { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
                    {
                      $lookup: {
                        from: "product",
                        localField: "product_id",
                        foreignField: "product_id",
                        as: "sectionproducts"
                      }
                    },
                    {
                      $unwind: '$sectionproducts',
                    },
                    {
                      $group: {
                        _id: '$product_id',
                        product_id: {
                          $first: '$sectionproducts.product_id',
                        },
                        quantity: {
                          $first: '$quantity',
                        },
                        price: {
                          $first: '$sectionproducts.price',
                        },
                        discount_price: {
                          $first: '$sectionproducts.discount_price',
                        },
                        order_id: {
                          $first: "$order_id"
                        }
                      }
                    }]
                }
              },
              {
                $project: {
                  "order_id": 1,
                  cartlist: {
                    order_id: 1,
                    product_id: 1,
                    quantity: 1,
                    price: 1,
                    discount_price: 1
                  }
                }
              },
            ])
            console.log("=ssssssssssss=============>", index)
            for (let i = 0; i < index.length; i++) {
              var dataset = index[i].cartlist
              var order_id = index[i].order_id

              for (let j = 0; j < dataset.length; j++) {
                var orderitem = await Order_item.create({
                  product_id: dataset[j].product_id, order_id: order_id, price: dataset[j].price, discount_price: dataset[j].discount_price, quantity: dataset[j].quantity
                })
              }
            }
          }
        }
        var cartlist = {
          item_total: data,
          delieverytype: cod
        }
        return resolve(cartlist)
      })
    } catch (error) {
      return reject(error)
    }
  }

  //order-list
  async order_list(user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        var data = await Address.aggregate([
          {
            $match: { user_id: mongoose.Types.ObjectId(user_id) }
          }, {
            $lookup: {
              from: "orders",
              localField: "address_id",
              foreignField: "address_id",
              as: "address"
            }
          }, { $unwind: '$address' },
          {
            $group: {
              _id: '$_id',
              order_id: {
                $first: "$address.order_id"
              },
              date: {
                $first: '$address.date',
              },
              Toatalpayment: {
                $first: '$address.grandtotal'
              },
              Deliveredto: {
                $first: "$type"
              },
            }
          }
        ])
        resolve(data)
      })
    } catch (error) {
      return reject(error);
    }
  }

  //orders- details
  async order_details(body, user_id) {
    try {
      return new Promise(async (resolve, reject) => {
        let { order_id } = body
        var join = await Address.aggregate([
          { $match: { user_id: mongoose.Types.ObjectId(user_id) } },
          {
            $lookup: {
              from: "orders",
              localField: "address_id",
              foreignField: "address_id",
              as: "address"
            }
          }, { $unwind: '$address' },
          {
            $group: {
              _id: '$_id',
              order_id: {
                $first: "$address.order_id"
              },
              date: {
                $first: '$address.date',
              },
              paymenttype: {
                $first: '$address.payment_type'
              },
              Deliveredto: {
                $first: "$type"
              },
              home_detail: {
                $first: "$home_detail"
              },
              land_mark: {
                $first: "$landmark"
              }
            }
          }
        ])
        var product = await Order_item.aggregate([
          {
            $lookup: {
              from: "product",
              localField: "product_id",
              foreignField: "product_id",
              as: "products"
            }
          }, { $unwind: '$products' },
          {
            $group: {
              _id: '$_id',
              image: {
                $first: "$products.image"
              },
              productname: {
                $first: '$products.productname',
              },
              price: {
                $first: '$products.price'
              },
              quantity: {
                $first: "$quantity"
              }
            }
          }
        ])
        console.log("=====>", product)
        join[0].item = product
        var totaldata = await Orders.find({ order_id: order_id }, {
          "sub_total": 1,
          "delivery_charge": 1,
          "grandtotal": 1
        })
        join[0].Billdetails = totaldata
        resolve(join);
      })
    } catch (error) {
      return reject(error);
    }
  }

  //user product review add
  async add_review(body, user_id) {
    try {
      let { product_id, review_star } = body
      return new Promise(async (resolve, reject) => {
        var select = await Product.find({ product_id: product_id })
        for (let i = 0; i < select.length; i++) {
          var insertdata = await Review.create({ user_id: user_id, product_id: product_id, review_star: review_star })
        }
        if (insertdata) {
          return resolve(insertdata)
        }
        else {
          var data = {
            message: "product_id is not avialable"
          }
          return reject(data);
        }
      })
    } catch (error) {
      return reject(error);
    }
  }
  async add_customer(firstname, lastname, email) {
    return new Promise(async (resolve, reject) => {
      try {
        const customer = await stripe.customers.create({
          name: firstname.concat(lastname),
          email: email
        })
        return resolve(customer);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async add_card(req, user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let { customer_stripe_id, card_Name, card_ExpYear, card_ExpMonth, card_Number, card_CVC } = req.body
        var data = await stripe.tokens.create({
          card: {
            name: card_Name,
            number: card_Number,
            exp_year: card_ExpYear,
            exp_month: card_ExpMonth,
            cvc: card_CVC
          }
        });
        var card = await stripe.customers.createSource(customer_stripe_id, {
          source: `${data.id}`
        })
        var insert = await Payment.create({
          customer_stripe_id: customer_stripe_id,
          card_Name: card_Name,
          card_Number: card_Number,
          card_ExpYear: card_ExpYear,
          card_ExpMonth: card_ExpMonth,
          card_CVC: card_CVC,
          card_id: card.id,
          source: data.id,
          user_id: user_id
        });
        return resolve({ card: card.id })
      } catch (error) {
        return reject(error);
      }
    })
  }
  async create_charge(req, user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        var insert = await stripe.charges.create({
          receipt_email: "tester@gmail.com",
          amount: req.body.amount,
          currency: 'inr',
          card: req.body.card_id,
          customer: req.body.customer_stripe_id
        })
        var insery = await Card_charge.create({
          amount: req.body.amount,
          date: new Date(),
          charge_id: insert.id,
          user_id: user_id,
          currency: 'inr'
        })
        return resolve(insert);
      } catch (error) {
        return reject(error);
      }
    })
  }
}
module.exports = new UserService();
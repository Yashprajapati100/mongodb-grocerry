const { User, conn, UserDeviceToken, Category, SubCategory, Product, Brand, Add_cart, Wish_list, Address, Section, Section_slider, Section_product, Section_brand, Section_category, Review, Setting, Coupan, Orders, Order_item } = require('../../../data/models/index')

class homeservice {
  async add_slider(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_slider.create({
          section_id: req.body.section_id,
          category_id: req.body.category_id,
          image: req.file.filename
        })
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async delete_slider(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_slider.find({ section_slider_id: req.body.section_slider_id })
        if (data.length > 0) {
          var data = await Section_slider.deleteOne({ section_slider_id: req.body.section_slider_id })
          return resolve(data);
        } else {
          var store = {
            message: "section_slider_id is not avialabel"
          }
          reject(store)
        }
      } catch (error) {
        return reject(error);
      }
    })
  }
  async slider_list(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_slider.aggregate([
          {
            $lookup: {
              from: "category",
              localField: "category_id",
              foreignField: "category_id",
              as: "categorys"
            }
          }, { $unwind: '$categorys' },
          {
            $group: {
              _id: '$_id',
              category_id: {
                $first: "$categorys.category_id"
              },
              image: {
                $first: '$categorys.image',
              },
              categoryname: {
                $first: '$categorys.categoryname'
              },
              section_id: {
                $first: "$section_id"
              }
            }
          }
        ])
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async add_section_category(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_category.create({
          section_id: req.body.section_id,
          category_id: req.body.category_id,
          offer: req.body.offer
        })
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async delete_section_category(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_category.find({ section_category_id: req.body.section_category_id })
        if (data.length > 0) {
          var data = await Section_category.deleteOne({ section_category_id: req.body.section_category_id })
          return resolve();
        } else {
          var store = {
            message: "section_slider_id is not avialabel"
          }
          reject(store)
        }
      } catch (error) {
        return reject(error);
      }
    })
  }
  async Section_category_list() {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_category.aggregate([
          {
            $lookup: {
              from: "category",
              localField: "category_id",
              foreignField: "category_id",
              as: "categorys"
            }
          }, { $unwind: '$categorys' },
          {
            $group: {
              _id: '$_id',
              category_id: {
                $first: "$categorys.category_id"
              },
              image: {
                $first: '$categorys.image',
              },
              categoryname: {
                $first: '$categorys.categoryname'
              },
              section_id: {
                $first: "$section_id"
              }
            }
          }
        ])
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async add_section_brand(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_brand.create({
          section_id: req.body.section_id,
          brand_id: req.body.brand_id
        })
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async delete_section_brand(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_brand.find({ section_brand_id: req.body.section_brand_id })
        if (data.length > 0) {
          var data = await Section_brand.deleteOne({ section_brand_id: req.body.section_brand_id });
          return resolve();
        } else {
          var store = {
            message: "section_slider_id is not avialabel"
          }
          reject(store)
        }

      } catch (error) {
        return reject(error);
      }
    })
  }
  async section_brand_list(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_brand.aggregate([
          {
            $lookup: {
              from: "brand",
              localField: "brand_id",
              foreignField: "brand_id",
              as: "brands"
            }
          }, { $unwind: '$brands' },
          {
            $group: {
              _id: '$_id',
              brand_id: {
                $first: "$brands.brand_id"
              },
              image: {
                $first: '$brands.image',
              },
              category_id: {
                $first: '$brands.category_id'
              },
              name: {
                $first: '$brands.name'
              },
              section_id: {
                $first: "$section_id"
              }
            }
          }
        ])
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async add_section_product(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_product.create({
          section_id: req.body.section_id,
          product_id: req.body.product_id
        })
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async delete_section_product(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_product.find({ section_product_id: req.body.section_product_id })
        if (data.length > 0) {
          var data = await Section_product.deleteOne({ section_product_id: req.body.section_product_id })
          return resolve()
        }else {
          var store = {
            message: "section_slider_id is not avialabel"
          }
          reject(store)
        }
      } catch (error) {
        return reject(error);
      }
    })
  }
  async Section_product_list(req) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await Section_product.aggregate([
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
              product_id: {
                $first: "$products.product_id"
              },
              image: {
                $first: '$products.image',
              },
              category_id: {
                $first: '$products.category_id'
              },
              subcategory_id: {
                $first: '$products.subcategory_id'
              },
              brand_id: {
                $first: '$products.brand_id'
              },
              productname: {
                $first: '$products.productname'
              },
              section_id: {
                $first: "$section_id"
              }
            }
          }
        ])
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    })
  }
}
module.exports = new homeservice();
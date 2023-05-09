const Joi = require("joi");
const { reject } = require('bluebird');

class validate {
  async deleteproductvalidation(body) {
    let { product_id } = body
    try {
      const joiSchema = Joi.object({
        product_id: Joi.string().required()
      })
      const validationResult = joiSchema.validate({ product_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async deletebrandvalidation(body) {
    let { brand_id } = body
    try {
      const joiSchema = Joi.object({
        brand_id: Joi.string().required()
      })
      const validationResult = joiSchema.validate({ brand_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async deletesubcategoryvalidation(body) {
    let { subcategory_id } = body
    try {
      const joiSchema = Joi.object({
        subcategory_id: Joi.string().required()
      })
      const validationResult = joiSchema.validate({ subcategory_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async deletecategoryvalidation(body) {
    let { category_id } = body
    try {
      const joiSchema = Joi.object({
        category_id: Joi.string().required()
      })
      const validationResult = joiSchema.validate({ category_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async loginvalidation(body) {
    let { email, password } = body
    try {
      const joiSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
      })
      const validationResult = joiSchema.validate({ email, password }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async order_detailsvalidation(body) {
    let { order_id } = body
    try {
      const joiSchema = Joi.object({
        order_id: Joi.string().required(),

      })
      const validationResult = joiSchema.validate({ order_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async section_slidersdeletevalidation(section_sider_id) {
    try {
      const joiSchema = Joi.object({
        section_sider_id: Joi.required(),

      })
      const validationResult = joiSchema.validate({ section_sider_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async addsection_categoryvalidation(body) {
    let { category_id, section_id } = body
    try {
      const joiSchema = Joi.object({
        category_id: Joi.string().required(),
        section_id: Joi.string().required(),

      })
      const validationResult = joiSchema.validate({ category_id, section_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async section_categorydeletevalidation(body) {
    let { section_category_id } = body
    try {
      const joiSchema = Joi.object({
        section_category_id: Joi.string().required(),

      })
      const validationResult = joiSchema.validate({ section_category_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async addsection_brandvalidation(body) {
    let { brand_id, section_id } = body
    try {
      const joiSchema = Joi.object({
        brand_id: Joi.string().required(),
        section_id: Joi.string().required(),

      })
      const validationResult = joiSchema.validate({ brand_id, section_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async section_branddeletevalidation(body) {
    let { section_brand_id } = body
    try {
      const joiSchema = Joi.object({
        section_brand_id: Joi.string().required(),

      })
      const validationResult = joiSchema.validate({ section_brand_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async addsection_productvalidation(body) {
    let { product_id, section_id } = body
    try {
      const joiSchema = Joi.object({
        product_id: Joi.string().required(),
        section_id: Joi.string().required(),

      })
      const validationResult = joiSchema.validate({ product_id, section_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async section_productdeletevalidation(body) {
    let { section_product_id } = body
    try {
      const joiSchema = Joi.object({
        section_product_id: Joi.string().required(),

      })
      const validationResult = joiSchema.validate({ section_product_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async inserttaxdatavalidation(body) {
    let { free_delivery_upto, delivery_charge, tax } = body
    try {
      const joiSchema = Joi.object({
        free_delivery_upto: Joi.string().required(),
        delivery_charge: Joi.string().required(),
        tax: Joi.string().required()

      })
      const validationResult = joiSchema.validate({ free_delivery_upto, delivery_charge, tax }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async updatetaxdatavalidation(body) {
    let { setting_id, free_delivery_upto, delivery_charge, tax } = body
    try {
      const joiSchema = Joi.object({
        setting_id: Joi.string().required(),
        free_delivery_upto: Joi.string().required(),
        delivery_charge: Joi.string().required(),
        tax: Joi.string().required()

      })
      const validationResult = joiSchema.validate({ setting_id, free_delivery_upto, delivery_charge, tax }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async addcoupanvalidation(body) {
    let { coupan_name, coupan_code, min_price, discount_price, start_date, end_date } = body
    try {
      const joiSchema = Joi.object({
        coupan_name: Joi.string().required(),
        coupan_code: Joi.string().required(),
        min_price: Joi.string().required(),
        discount_price: Joi.string().required(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required()

      })
      const validationResult = joiSchema.validate({ coupan_name, coupan_code, min_price, discount_price, discount_price, start_date, end_date }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async updatecoupanvalidation(body) {
    let { coupan_id, coupan_name, coupan_code, min_price, discount_price, start_date, end_date } = body
    try {
      const joiSchema = Joi.object({

        coupan_id: Joi.string().required(),
        coupan_name: Joi.string().required(),
        coupan_code: Joi.string().required(),
        min_price: Joi.string().required(),
        discount_price: Joi.string().required(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required()
      })
      const validationResult = joiSchema.validate({ coupan_id, coupan_name, coupan_code, min_price, discount_price, discount_price, start_date, end_date }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async deletecoupanvalidation(body) {
    let { coupan_id } = body
    try {
      const joiSchema = Joi.object({
        coupan_id: Joi.string().required(),
      })
      const validationResult = joiSchema.validate({ coupan_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async stockmanagementvalidation(body) {
    let { subcategory_id, category_id, brand_id } = body
    try {
      const joiSchema = Joi.object({
        subcategory_id: Joi.string().required(),
        category_id: Joi.string().required(),
        brand_id: Joi.string().required()
      })
      const validationResult = joiSchema.validate({ subcategory_id, category_id, brand_id }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async changepasswordvalidation(body) {
    let { password, Newpassword, confirmNewpassword } = body
    try {
      const joiSchema = Joi.object({
        password: Joi.string().required(),
        Newpassword: Joi.string().required(),
        confirmNewpassword: Joi.string().required()
      })
      const validationResult = joiSchema.validate({ password, Newpassword, confirmNewpassword }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error);
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
  async forgetpasswordvalidation(body) {
    let { email } = body
    try {
      const joiSchema = Joi.object({
        email: Joi.string().required()
      })
      const validationResult = joiSchema.validate({ email }, { abortEarly: false });
      if (validationResult.error) {
        console.log(validationResult.error)
        return reject(validationResult.error)
      }
    } catch (error) {
      return reject(error);
    }
  }
}
module.exports = new validate();
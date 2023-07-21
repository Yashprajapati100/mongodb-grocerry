const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categorycontroller');
const SubCategoryController = require('../controllers/subcategorycontroller');
const brandcontroller = require('../controllers/brandcontroller');
const productcontroller = require('../controllers/productcontroller');
const admincontroller = require('../controllers/admincontroller');
const ordercontroller = require('../controllers/ordercontroller');
const coupancontroller = require('../controllers/coupancontroller');
const settingcontroller = require('../controllers/settingcontroller');
const homecontroller = require('../controllers/homecontroller');
const stockcontroller = require('../controllers/stockcontroller');
const uploades = require("../middleware/multer");

// admin-login api
router.post('/admin-login', admincontroller.login)

//admin-password change api
router.post('/change-password',admincontroller.change_password);

//admin-forget password api
router.post('/forget-password',admincontroller.forget_password);

// order data api
router.post('/orders-list', ordercontroller.order_list);
router.post('/order-details', ordercontroller.orders_details);

// user api
router.post('/user-list', admincontroller.user_list);
router.post('/user-details', admincontroller.user_details);
    
//category-crud api
router.post('/insert-category', uploades.single("image"), CategoryController.insert_category);
router.post('/update-category', uploades.single("image"), CategoryController.update_category);
router.post('/delete-category', CategoryController.delete_category);
router.post('/category-list', CategoryController.category_list);

//subcategory-crud api
router.post('/insert-subcategory', uploades.single("image"), SubCategoryController.insert_subcategory);
router.post('/update-subcategory', uploades.single("image"), SubCategoryController.update_subcategory);
router.post('/delete-subcategory', SubCategoryController.delete_subcategory);
router.post('/subcategory-list', SubCategoryController.subcategory_list);

//brand-crud api
router.post('/insert-brand', uploades.single("image"), brandcontroller.insert_brand);
router.post('/update-brand', uploades.single("image"), brandcontroller.update_brand);
router.post('/delete-brand', brandcontroller.delete_brand);
router.post('/brand-list', brandcontroller.brand_list);

//product-crud api
router.post('/insert-product', uploades.single("image"), productcontroller.insert_product);
router.post('/update-product', uploades.single("image"), productcontroller.update_product);
router.post('/delete-product', productcontroller.delete_product);
router.post('/product-list', productcontroller.product_list);

//coupan-management api
router.post('/add-coupan', coupancontroller.add_coupan);
router.post('/update-coupan', coupancontroller.update_coupan);
router.post('/delete-coupan', coupancontroller.delete_coupan);
router.post('/coupan-list', coupancontroller.coupan_list);

//tax insert,update api
router.post('/insert-taxdata', settingcontroller.insert_tax_data);
router.post('/update-taxdata', settingcontroller.update_tax_data);

//home_management in section_slider api
router.post('/add-sectionslider', uploades.single("image"), homecontroller.add_slider);
router.post('/delete-sectionslider', homecontroller.delete_slider);
router.post('/section_slider-list', homecontroller.slider_list);

//home_management in section_category api
router.post('/add-sectioncategory', homecontroller.add_section_category);
router.post('/delete-sectioncategory', homecontroller.delete_section_category);
router.post('/section_category-list', homecontroller.section_category_list);

//home_management in section_brand api
router.post('/add-sectionbrand', homecontroller.add_section_brand);
router.post('/delete-sectionbrand', homecontroller.delete_section_brand);
router.post('/section_brand-list', homecontroller.section_brand_list);

//home_management in section_product api
router.post('/add-sectionproduct', homecontroller.add_section_product);
router.post('/delete-sectionproduct', homecontroller.delete_section_product);
router.post('/section_product-list', homecontroller.section_product_list);

//stock_management api
router.post('/stock-data',stockcontroller.stock_management);

module.exports = router
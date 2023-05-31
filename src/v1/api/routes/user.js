const express = require('express');
const router = express.Router()
const Multer = require('multer')
const path = require('path')
const authMiddleware = require('../../../modules/middleware/Auth');
const UserController = require('../../api/controllers/UserController');

//send-otp api
router.post('/send-otp', UserController.send_otp);

//user-login api
router.post('/login', UserController.login);

//user-resend otp api
router.post('/resend-otp', UserController.resend_otp);

//user-update profile
router.post('/update', authMiddleware.authenticate, UserController.update)

//category-list api
router.post('/category', UserController.category);

//product -list in subactegory_id api
router.post('/subcategory-productlist', UserController.product);

// add to cart product api
router.post('/add-cart', authMiddleware.authenticate, UserController.add_cart);

//delete to cart product api
router.post('/delete_cart', authMiddleware.authenticate, UserController.delete_cart);

//product -search api
router.post('/search-product', UserController.search_product);

//wish-list api
router.post('/wish_list', authMiddleware.authenticate, UserController.wish_list);

//get-wish_list api
router.post('/getwish_list', authMiddleware.authenticate, UserController.get_wish_list)

//brand-filter api
router.post('/brandfilter', UserController.brand_filter);

//brand-search api
router.post('/brand-search', UserController.brand_search);

//discount api
router.post('/discount', UserController.discount);

//sort by api
router.post('/sortby', UserController.sortby);

//price range api
router.post('/price-range', UserController.price_range);

//user add-address api
router.post('/add-address', authMiddleware.authenticate, UserController.add_address);

//user delete-address api
router.post('/delete-address', authMiddleware.authenticate, UserController.delete_address);

//address -list api
router.post('/address-list', authMiddleware.authenticate, UserController.address_list)

//home_managemant api
router.post('/home-page', authMiddleware.authenticate, UserController.home_page);

//add- review api
router.post('/add-review', authMiddleware.authenticate, UserController.add_review);

//cart -list api
router.post('/cart_list', authMiddleware.authenticate, UserController.cart_list);

//check_Out api 
router.post('/checkout', authMiddleware.authenticate, UserController.check_out)

//order-list api
router.post('/order-list', authMiddleware.authenticate, UserController.order_list);

//order-details api
router.post('/orders-details', authMiddleware.authenticate, UserController.order_details);


router.post('/add-customer', authMiddleware.authenticate, UserController.add_customer);


router.post('/add-card', UserController.add_card);

router.post('/create-charge', UserController.create_charge);

router.post('/add_customer',authMiddleware.authenticate,UserController.aadd_customer);

router.post('/add_card',UserController.added_card);

router.post('/charge',UserController.charge);


module.exports = router;




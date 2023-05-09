const express = require('express');
const router = express.Router()
// const GlobalAuthClass = require('../../../modules/middleware/auth');
// const authMiddleware = require('../../../modules/middleware/Auth');  
const adminRoutes = require('../routes/user');

router.use('/', adminRoutes);

module.exports = router
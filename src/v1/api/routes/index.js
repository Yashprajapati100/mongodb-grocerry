const express = require('express');
const router = express.Router()
// const GlobalAuthClass = require('../../../modules/middleware/auth');
// const authMiddleware = require('../../../modules/middleware/Auth');  
const userRoutes = require('../../api/routes/user');

router.use('/', userRoutes);

module.exports = router
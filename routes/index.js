const express = require('express');
const router = express.Router();
const path = require('path');
const {dirname} = require('path');

global.base_path = dirname(require.main.filename)


/* GET users listing. */
router.get('/', (req, res) => {
    res.json({message:{message:'respond with a resource'},status:200,error:false});
});

const v1 = require('../src/v1/api/routes/index');
const v2= require('../src/v1/admin/routes/index')
router.use('/',v1);
router.use('/',v2);

module.exports = router;

const express = require('express');
const adminController = require('../app/controller/adminController');
const router = express.Router();

router.get('/add-product', adminController.index);
router.post('/add-product');

module.exports = router;

const express = require('express');
const shopController = require('../app/controller/shopController');
const router = express.Router();

router.get('/', shopController.index);

module.exports = router;

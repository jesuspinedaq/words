var express = require('express');
var words = require('./words');

var router = express.Router();

router.use('/words', words);

module.exports = router;
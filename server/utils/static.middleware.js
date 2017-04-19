'use strict';

var express = require('express');
var router = express.Router();

// Serve static dependencies 
router.use('/node_modules', express.static(__dirname + '/../../node_modules'));


// Serve files in public "as root"
router.use(express.static(__dirname + '/../../public'));

module.exports = router;

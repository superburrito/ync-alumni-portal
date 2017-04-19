'use strict';

const express = require('express')
const router = express.Router();

const bodyParser = require('body-parser');
const morgan = require('morgan');

// Boilerplate for parsing POST requests
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// Boilerplate for logging client requests on the console
router.use(morgan('dev'));


module.exports = router;

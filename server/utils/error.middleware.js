const express = require('express');
const router = express.Router();


// Default error handling 
router.use(function(err, req, res, next){
	console.log(err);
	res.status(err.status || 500).send({
		success: false,
		message: err.message || 'Internal Server Error.'
	});
});


module.exports = router;

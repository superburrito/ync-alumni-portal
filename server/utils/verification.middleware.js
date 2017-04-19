'use strict';

const db = require('./../db.js');
const User = db.model('user');

const router = require('express').Router();
const jwt = require('jsonwebtoken'); 
const secret = require('./../env/index.js').secret; 

// Verify that hToken sent is valid 
router.use((req, res, next) => {
	const ynanToken = req.headers['x-access-token'];
	if (ynanToken) {
		jwt.verify(ynanToken, secret, (err, decoded) => {
			if (err) {
				return res.status(403).send({ success: false });
			} else {	
				req.decoded = decoded;
				return User.findOne({ where: { id: req.decoded.id } })
				.then((user) => {
					if (!user) {
						res.status(400).send({ success: false });
					} else {
						next();
					}
				})
			}
		})
	} else {
		return res.status(403).send({ success: false });
	}
})

module.exports = router;

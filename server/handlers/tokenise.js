'use strict';

const jwt = require('jsonwebtoken'); 
const config = require('./../env/index.js');

module.exports = (user) => {
	var token = jwt.sign(
		// Payload
		{ 
			id: user.id, 
			fbId: user.fbId,
		}, 
		// Signature + Header	
		config.secret, 
		{ 
			algorithm: 'HS256',
			expiresIn: '60d'
		}
	);
	return token;
}

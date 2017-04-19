'use strict';

const config = require('./../env/index.js');
const db = require('./../db.js');
const tokenise = require('./tokenise.js');
const rp = require('request-promise');
const User = db.model('user');

const AuthHandler = {}

AuthHandler.authenticate = (req, res) => {
	const APP_ID = config.fbAppId;
	const APP_SECRET = config.fbAppSecret;
	const SHORT_LIVED_TOKEN = req.body.slToken;

	console.log("Requesting for long lived token from FB...");
	rp('https://graph.facebook.com/oauth/access_token?' +
			'client_id=' + APP_ID + 
			'&client_secret=' + APP_SECRET + 
			'&grant_type=fb_exchange_token' + 
			'&fb_exchange_token=' + SHORT_LIVED_TOKEN)
	.then((fbResBody) => {
		console.log("fbResBody: " + fbResBody);
		const llToken = JSON.parse(fbResBody).access_token;
		console.log("llToken: " + llToken);
		return llToken;
	})
	.then((llToken) => {
		return rp('https://graph.facebook.com/v2.8/me?fields=id,name,email,picture.width(800).height(800)&access_token=' + llToken)
		.then((resBody) => {
			console.log("resBody: " + resBody);
			const parsedBody = JSON.parse(resBody);
			if (!parsedBody.id || !parsedBody.name) {
				return res.status(400).send({
					success: false,
					msg: 'fb_auth_data_retrieval_failure'
				})
			} else {
				const fbId = parsedBody.id;
				const name = parsedBody.name;
				let email = null;
				if (parsedBody.email) {
					email = parsedBody.email.replace('\u0040','@');
				} 
				const src = parsedBody.picture.data.url;
				return User.findOne({ where: { fbId: fbId } })
				.then((user) => {
					if (!user) {
						return User.create({
							fbId: fbId,
							name: name,
							email: email,
							src: src
						})
					} else {
						return user.update({
							name: name,
							email: email,
							src: src
						})
					}
				})
				.then((user) => {
					const ynanToken = tokenise(user);
					return res.status(200).send({
						success: true,
						msg: 'fb_auth_success_with_tokens',
						ynanToken: ynanToken,
						fbToken: llToken,
						user: user
					});
				});
			}
		})
	})
	.catch((err) => {
		console.log("Token Exchange with FB failed: " + err);
		return res.status(400).send({ 
			success: false,
			msg: 'fb_auth_failure_no_tokens'
		})
	})
};


AuthHandler.reentry = (req, res, next) => {
	return User.findOne({ where: { fbId: req.decoded.fbId } })
	.then((user) => {
		res.status(200).send({
			// In a typical login, fbToken and hToken would exist,
			// but this is a re-entry, so we don't bother tokenising 
			// the response
			success: true,
			msg: "reentry_success_with_user",
			user: user
		});
	})
	.catch(next);
};


module.exports = AuthHandler;
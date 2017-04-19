"use strict";

const express = require('express');
const app = express();
const db = require('./db.js');
const Promise = require('bluebird');

// Parse and log server requests
app.use(require('./utils/parsing-logging.middleware.js'));
// Serve dependency files + serve files in /public "as root"
app.use(require('./utils/static.middleware.js'));
// Respond to API data requests
app.use(require('./routes.js'));
// Error handling
app.use(require('./utils/error.middleware.js'));

// Start server
const port = 7777;
app.listen(port, (err) => {
	if (err) {
		throw err;
	} else {
		return db.sync({ force: true })
		.then(() => {
			const User = db.model('user');
			const Membership = db.model('membership');
			const u1Prom = User.create({
				id: 1,
				fbId: 1021108506,
				name: "Joshua Wong",
				linkedIn: "https://sg.linkedin.com/in/joshua-wong-566397b6",
				email: "jwong@hotmail.com",
				class: "2017",
				src: "https://scontent.xx.fbcdn.net/v/t31.0-1/c173.311.1229.1229/s960x960/13475034_10208628672127173_5988747467162591874_o.jpg?oh=affc50395ab19334fcf32ad56c38ad68&oe=59938EE9",
				lat: 1.30,
				lng: 103.82,
				description: "TGS was a mistake",
				role: "Teaching Associate",
				employer: "Learning Lab",
				city: "Singapore",
				major: "PPE"
			})
			const m1Prom = Membership.create({
				club: "Community of Learning"
			})			
			const m2Prom = Membership.create({
				club: "Improv Club"
			})
			return Promise.all([u1Prom, m1Prom, m2Prom])
			.spread((user1, membership1, membership2) => {
				return user1.addMembership(membership1)
				.then(user1.addMembership(membership2))
			})
			.then(() => {
				console.log("Database reset and models synced.");		
			})
		}, (err) => {
			console.log(err);
			console.log("Database sync failed.");
		})
		.then(() => {
			console.log("YNAN server up and listening at: " + port);
		})
	}
});



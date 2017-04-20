'use strict';

const db = require('./../db.js');
const User = db.model('user');
const Membership = db.model('membership');

const UserHandler = {};

UserHandler.updateUserClubs = (req, res, next) => {
	const clubs = req.body.clubStrs.map((clubStr) => {
		return {
			club: clubStr,
			user_id: req.decoded.id
		}
	})
	return Membership.destroy({
		where: { user_id: req.decoded.id }
	})
	.then((numRowsDel) => {
		console.log("Deleted membership entries: " + numRowsDel);
		return Membership.bulkCreate(clubs);
	})
	.then(() => {
		return res.status(200).send({ success: true });
	})
	.catch(next);
}

UserHandler.getAllUsers = (req, res, next) => {
	return User.findAll({
		include: [{
			model: Membership
		}]
	})
	.then((users) => {
		return res.status(200).send({
			success: true,
			users: users
		})
	})
	.catch(next);
}

UserHandler.updateUser = (req, res, next) => {
	return User.findOne({ where: { fbId: req.decoded.fbId } })
	.then((user) => {
		if (user) {
			return user.update({
				description: req.body.description || null,
				role: req.body.role || null,
				employer: req.body.employer || null,
				class: req.body.class || null,
				major: req.body.major || null,
				li: req.body.li || null,
				city: req.body.city || null,
				lat: req.body.lat || null,
				lng: req.body.lng || null,
			})
			.then((updatedUser) => {
				return res.status(200).send({ 
					success: true,
					user: updatedUser
				})
			})
		} else {
			return res.status(400).send({ success: false })
		}
	})
	.catch(next);
}

UserHandler.updateUserCoords = (req, res, next) => {
	return User.findOne({ where: { fbId: req.decoded.fbId } })
	.then((user) => {
		if (user) {
			return user.update({				
				lat: req.body.lat || null,
				lng: req.body.lng || null,
			})
			.then((updatedUser) => {
				return res.status(200).send({ 
					success: true,
					user: updatedUser 
				})
			})
		} else {
			return res.status(400).send({ success: false })
		}
	})
	.catch(next);
}

module.exports = UserHandler;
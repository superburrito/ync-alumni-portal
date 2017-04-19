'use strict';

const Sequelize = require('sequelize');
const databaseURI = require('./env/index.js').databaseURI;

const db = new Sequelize(databaseURI, {
	define: {
		timestamps: true,
		underscored: true
	}
});

const User = db.define('user', {
    // facebook info
    fbId: {
    	type: Sequelize.STRING,
    	allowNull: true,
    	unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
    	type: Sequelize.STRING,
    	allowNull: false
    },
    src: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    // additional info
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    role: {
        type: Sequelize.STRING,
        allowNull: true
    },
    employer: {
        type: Sequelize.STRING,
        allowNull: true        
    },
    class: {
        type: Sequelize.STRING,
        allowNull: true
    },
    major: {
        type: Sequelize.STRING,
        allowNull: true
    },
    li: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true        
    },
	lat: {
		type: Sequelize.DOUBLE,
		allowNull: true
	}, 
	lng: {
		type: Sequelize.DOUBLE,
		allowNull: true
	}
}) 

const Membership = db.define('membership', {
    club: {
    	type: Sequelize.STRING,
    	allowNull: false
    }
})

Membership.belongsTo(User);
User.hasMany(Membership);

module.exports = db;
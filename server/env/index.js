const path = require('path');
const devConfigPath = path.join(__dirname, './dev.js');
const prodConfigPath = path.join(__dirname, './prod.js');

if (process.env.NODE_ENV === 'production') {
	module.exports = require(prodConfigPath);
} else if (process.env.NODE_ENV === 'development') {
	module.exports = require(devConfigPath);
}

const router = require('express').Router();
const path = require('path');

// Handlers
const UserHandler = require('./handlers/user.handler.js');
const AuthHandler = require('./handlers/auth.handler.js');

// Landing page 
router.get('/', (req,res) => { 
	res.sendFile(path.join(__dirname, './../public/index.html'));
});

router.post('/auth', AuthHandler.authenticate);
router.use(require('./utils/verification.middleware.js'));
router.get('/auth', AuthHandler.reentry);

// Past this point, the user has been authenticated and his/her existence 
// on the database is confirmed
// API Routes
router.get('/api/user', UserHandler.getAllUsers);
router.post('/api/user', UserHandler.updateUser);
router.post('/api/user/coords', UserHandler.updateUserCoords);



module.exports = router;

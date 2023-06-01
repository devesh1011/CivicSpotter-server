const express = require('express');
const userController = require('../controllers/userControllers');
const authenticateUser = require('../middlewares/authenticate');

const router = express.Router();

router.post('/register', userController.registerUser);
router.get('/', authenticateUser.authenticate, userController.getUsers);
router.post('/login', userController.loginUser);
router.get('/:id', authenticateUser.authenticate, userController.getUserById);
router.get('logout', authenticateUser.authenticate, userController.logoutUser);

module.exports = router;

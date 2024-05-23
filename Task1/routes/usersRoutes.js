const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers.js');


router.get('/', userController.getAllUsers);
router.post('/create', userController.createUser);
router.post('/authenticate', userController.authenticateUser);
router.put('/update', userController.updateUser);

module.exports = {
    router,
};

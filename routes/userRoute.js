const express = require('express');
const { signup, signin, signout, deleteUser } = require('../controllers/authController');

const router = express.Router();

// here we have to implement the authenication and authorization routes such as signup, signin, signout, etc.
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.delete('/delete', deleteUser);

module.exports = router;

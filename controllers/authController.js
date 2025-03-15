const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../utils/utils');
const bcrypt = require('bcrypt');

// Helper function to generate JWT token (expires in 1 hour)
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Create a new user (password will be hashed automatically in the userModel.js file).
    const newUser = await User.create({ name, email, password });

    const token = generateToken(newUser); // Generate a JWT token (using user ID as payload).
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    sendResponse(res, 'Success', 201, 'User created and logged in.', null, {
      name: newUser.name,
      photo: newUser.photo,
      email: newUser.email,
    }); // Return the token (and possibly user info) in the response.
  } catch (error) {
    sendResponse(res, 'Error', 400, 'Error while signing up.', error, null);
  }
};

const signin = async (req, res) => {
  try {
    // Validate user credentials by finding the user by email/username.
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+name +email +photo');

    const isMatch = await bcrypt.compare(password, user.password); // Bcrypt.js to compare the given password with the hashed password.
    if (!user || !isMatch) {
      const error = new Error('Invalid email or password');
      sendResponse(res, 'Fail', 400, 'Error while signing in.', error, null);
    }

    // If valid, generate and return a JWT token.
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    sendResponse(res, 'Success', 200, 'User signed in.', null, user);
  } catch (error) {
    sendResponse(res, 'Error', 400, 'Error while signing in.', error, null);
  }
};

// const checkAuth = (req, res) => {
//   if (req.user) {
//     res.json({ user: req.user });
//   } else res.status(401);
// };

const signout = async (req, res) => {
  try {
    res.clearCookie('token'); // With JWT, sign out is typically handled on the client by deleting the token.
    sendResponse(res, 'Success', 200, 'User signed out successfully.', null, {});
  } catch (error) {
    sendResponse(res, 'Fail', 400, 'Error while logging out.', error, null);
  }
};

module.exports = { signup, signin, signout };

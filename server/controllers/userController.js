const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
// @desc User controller: register
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  //   Find if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc User controller: login
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  // get email and password from the request
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // check if user exists and password is correct (if they match)
  if (user && (await bcrypt.compare(password, user.password))) {
    //   ran into a bug here, res.status(200).res.json() is politically incorrect. It should be res.status(200).json()
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  //
});

// @desc User controller: signout
// @route POST /api/users/signout
// @access Public
const signoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'User signed out' });
});

//create a simple get request to get users (example)
const getUsers = asyncHandler(async (req, res) => {
  //   const users = await User.find({ email: req.body.email });
  res.json('Hello from the user controller');
});

//@desc generate token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  signoutUser,
  getUsers,
};

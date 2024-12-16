// create a route for users:
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  signoutUser,
  getUsers,
} = require('../controllers/userController');

//register route
router.post('/register', registerUser);

// login route
router.post('/login', loginUser);

// signout route
router.post('/signout', signoutUser);

router.get('/getusers', getUsers);

module.exports = router;

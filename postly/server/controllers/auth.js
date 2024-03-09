// IMPORTS
const asyncWrapper = require('./../middleware/async-wrapper.middleware');
const User = require('./../models/user.model');

// Register Controller
const register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createToken();
  res
    .status(201)
    .json({ user: { username: user.username, id: user._id }, token });
});

// Login Controller
const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body; // get email and password from request

  if (!email || !password) {
    // check for email and password existance
    return res.status(400).json({ msg: 'Please provide email and password' });
  }

  // Find User
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ msg: 'Invalid Credentials' });
  }

  // Use Schema method to compare incoming password to hashed password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(401).json({ msg: 'Invalid Credentials' });
  }

  // Create token from Schema method
  const token = user.createToken();

  res
    .status(200)
    .json({ user: { username: user.username, id: user._id }, token });
});

// Me Controller
const me = asyncWrapper(async (req, res) => {
  const { user } = req;
  res.status(200).json({ user });
});

// Exports
module.exports = {
  register,
  login,
  me,
};

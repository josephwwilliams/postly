// IMPORTS
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// USER SCHEMA
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      minlength: 3,
      maxlength: 16,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  },
);

// Presave Password Hashing
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate JWT With Schema Methods
userSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    },
  );
};

// Compare incoming password to hashed password for validity
userSchema.methods.comparePassword = async function (incomingPassword) {
  const isMatch = await bcrypt.compare(incomingPassword, this.password);
  return isMatch;
};

// EXPORTS
module.exports = mongoose.model('User', userSchema);

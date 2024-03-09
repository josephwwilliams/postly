// IMPORTS
const mongoose = require('mongoose');

// POST SCHEMA
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      maxlength: 100,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
  },
  {
    timestamps: true,
  },
);

// EXPORTS
module.exports = mongoose.model('Post', postSchema);

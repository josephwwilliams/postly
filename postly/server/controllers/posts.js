// IMPORTS
const asyncWrapper = require('./../middleware/async-wrapper.middleware');
const Post = require('./../models/post.model');

// Create Post Controller
const createPost = asyncWrapper(async (req, res, next) => {
  const { user } = req;
  const { title, content } = req.body;

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const post = await Post.create({ title, content, createdBy: user.userId });

  res.status(200).json({ post });
});

// Get Post Controller
const getPost = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id).populate('createdBy', 'username');

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.status(200).json({ post });
});

// Get Posts Controller
const getPosts = asyncWrapper(async (req, res, next) => {
  const posts = await Post.find()
    .populate('createdBy', 'username')
    .sort({ createdAt: -1 });

  res.status(200).json({ posts });
});

module.exports = { createPost, getPost, getPosts };

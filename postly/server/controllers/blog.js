// IMPORTS
const asyncWrapper = require('./../middleware/async-wrapper.middleware');
const User = require('./../models/user.model');
const Post = require('./../models/post.model');

// Blog Controller
const blog = asyncWrapper(async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const posts = await Post.find({ createdBy: user._id }).populate(
    'createdBy',
    'username',
  );

  const totalPosts = posts.length;

  res.status(200).json({
    user: { username: user.username, id: user._id, createdAt: user.createdAt },
    posts,
    totalPosts,
  });
});

module.exports = { blog };

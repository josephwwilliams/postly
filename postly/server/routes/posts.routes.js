// IMPORTS
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Controllers
const { createPost, getPost, getPosts } = require('./../controllers/posts');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/create', authMiddleware, createPost);

module.exports = router;

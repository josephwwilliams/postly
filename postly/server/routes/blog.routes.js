// IMPORTS
const express = require('express');
const router = express.Router();

// Controllers
const { blog } = require('./../controllers/blog');

router.get('/:username', blog);

module.exports = router;

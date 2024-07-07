const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');


router.get('/product/:productId', async (req, res) => {
  try {
    const comments = await Comment.find({ product: req.params.productId }).populate('user');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { product, user, rating, images, text } = req.body;
  try {
    const comment = new Comment({ product, user, rating, images, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

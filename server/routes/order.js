const express = require('express');
const router = express.Router();
const Order = require('../models/Order');


router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { user, products, total } = req.body;
  try {
    const order = new Order({ user, products, total });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/user/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('products.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { user, products } = req.body;
  try {
    let cart = await Cart.findOne({ user });
    if (cart) {
      products.forEach(p => {
        const index = cart.products.findIndex(cp => cp.product.toString() === p.product);
        if (index >= 0) {
          cart.products[index].quantity += p.quantity;
        } else {
          cart.products.push(p);
        }
      });
    } else {
      cart = new Cart({ user, products });
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://priyankpatel:priyankpatel@cluster0.yrtbjim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const commentRoutes = require('./routes/comment');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

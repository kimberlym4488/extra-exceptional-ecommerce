const { Product } = require('../models');

const productData = [
  {
    product_name: 'Kakuro rocks ',
    price: 14.99,
    stock: 14,
    category_id: 1,
  },
  {
    product_name: 'Kakuro is my passion',
    price: 90.0,
    stock: 25,
    category_id: 1,
  },
  {
    product_name: 'My favorite Kakuro is...',
    price: 22.99,
    stock: 12,
    category_id: 4,
  },
  {
    product_name: 'Watch me kakuro',
    price: 12.99,
    stock: 50,
    category_id: 3,
  },
  {
    product_name: 'I would rather be kakuroing',
    price: 12.99,
    stock: 50,
    category_id: 3,
  },
  {
    product_name: 'Kakuro factory life',
    price: 29.99,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;

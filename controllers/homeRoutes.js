const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../models');

// Home dashboard, generic display of all data before user refines requests

router.get('/', async (req, res) => {
  // find all categories
  try {
    const productData = await Product.findAll({
      //include its associated Category and Tag data

      attributes: ['id', 'product_name', 'price', 'stock'],

      include: [
        { model: Category, attributes: ['category_name', 'id'] },
        { model: Tag, attributes: ['tag_name', 'id'] },
      ],
    });

    const products = productData.map((item) => item.get({ plain: true }));
    console.log(products);
    res.render('home', {
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

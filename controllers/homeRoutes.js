const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../models');

// Home dashboard, generic display of all data before user refines requests

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Product.findAll({
      //include its associated Category and Tag data

      attributes: ['product_name', 'price', 'stock'],

      include: [
        { model: Category, attributes: ['category_name'] },

        { model: Tag, attributes: ['tag_name'] },
      ],
      exclude: ['product_tag'],
    });

    const allItems = categoryData.map((item) => item.get({ plain: true }));
    console.log(allItems);
    res.render('home', {
      allItems,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

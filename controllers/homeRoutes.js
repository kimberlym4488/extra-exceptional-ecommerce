const router = require('express').Router();
const { Warehouse, Product, Tag } = require('../models');

// Home dashboard, generic display of all data before user refines requests

router.get('/', async (req, res) => {
  // find all warehouses
  try {
    const productData = await Product.findAll({
      //include its associated Warehouse and Tag data

      attributes: ['id', 'product_name', 'price', 'stock'],

      include: [
        { model: Warehouse, attributes: ['warehouse_name', 'id'] },
        { model: Tag, attributes: ['tag_name', 'id'] },
      ],
    });

    const products = productData.map((item) => item.get({ plain: true }));
    // render home page on start
    res.render('home', {
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

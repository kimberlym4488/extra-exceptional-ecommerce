const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const productData = await Product.findAll({
      //include its associated Category and Tag data

      attributes: ['product_name', 'price', 'stock'],

      include: [
        { model: Category, attributes: ['category_name'] },
        { model: Tag, attributes: ['tag_name'] },
      ],
      exclude: ['product_tag'],
    });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`. Render necessary data to user.
  try {
    const productData = await Product.findByPk(req.params.id, {
      attributes: ['id', 'product_name', 'price', 'stock'],

      include: [
        { model: Category, attributes: ['category_name'] },
        { model: Tag, attributes: ['tag_name'] },
      ],
      exclude: ['product_tag'],
    });

    if (!productData) {
      return res
        .status(404)
        .json({ message: 'No product was found with that id!' });
    }
    const categoryData = await Category.findAll({
      attributes: ['category_name', 'id'],
    });
    const tagData = await Tag.findAll({
      attributes: ['tag_name', 'id'],
    });

    const product = productData.toJSON();
    const category = categoryData.map((category) =>
      category.get({ plain: true }));
    const tag = tagData.map((tag) =>
      tag.get({ plain: true }));

    // console.log(product, category, tag);
    res.render('product', {
      product,
      category,
      tag,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// create new product
router.post('/', (req, res) => {
  req.body = {
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagIds: req.body.tagIds,
  };
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))

    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productDelete = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productDelete) {
      res.status(404).json({ message: 'No product exists for this id' });
      return;
    }
    res.status(200).json(productDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

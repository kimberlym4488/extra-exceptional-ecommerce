const router = require('express').Router();
const { Tag, Product } = require('../../models');

// render tags page
router.get('/all', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      //include its associated Product data
      attributes: ['id', 'tag_name'],

      include: [{ model: Product, attributes: ['product_name', 'id'] }],
    });
    const tags = tagData.map((tag) => tag.get({ plain: true }));
    res.render('tags', {
      tags,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// The `/api/tags` endpoint to get tags in the adding product/edit product
router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      //include its associated Product data
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its 'id'
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
      attributes: {
        exclude: ['tagId', 'productId'],
      },
    });

    if (!tagData) {
      return res.status(404).json({ message: 'No tag found with that id!' });
    }

    res.status(200).json(tagData);
    console.log(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    // check for duplicates
    const myTagName = await Tag.findOne({
      where: {
        tag_name: req.body.tag_name,
      },
    });

    if (myTagName) {
      res.status(400).json({
        message: 'This tag name is already taken. Please try again.',
      });
      return;
    }
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagChange = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagChange[0]) {
      res.status(404).json({ message: 'No warehouse exists with this id!' });
      return;
    }
    res.status(200).json(tagChange);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete a tag
router.delete('/:id', async (req, res) => {
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagDelete) {
      res.status(404).json({ message: 'No warehouse exists for this id' });
      return;
    }
    res.status(200).json(tagDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

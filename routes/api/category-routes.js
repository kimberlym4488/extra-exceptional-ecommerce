const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // includes products
      include: [{ model: Product  }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const categoryData = await Category.findByPk(req.params.id,
      {
          include: [{ model: Product}]
      });

      if (!categoryData) {
        return res.status(404).json({ message: 'No category found with that id!' });
      }

      res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  console.log(req.body);
  try{
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryChange = await Category.update(req.body, {
      where: {
        id: req.params.id,
    },
  });
    if (!categoryChange[0]) {
      res.status(404).json({ message: 'No category exists with this id!' });
      return;
    }
    res.status(200).json(categoryChange);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
    try {
      const categoryDelete = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!categoryDelete) {
        res.status(404).json({ message: 'No category exists for this id' });
        return;
      }
      res.status(200).json(categoryDelete);
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;

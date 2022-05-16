const router = require('express').Router();
const { Warehouse, Product } = require('../../models');

// The `/api/warehouses/all` endpoint
router.get('/all', async (req, res) => {
  try {
    const warehouseData = await Warehouse.findAll({
      // includes products associated with this warehouse
      include: [{ model: Product, attributes: ['product_name', 'id'] }],
    });
    const warehouses = warehouseData.map((warehouse) =>
      warehouse.get({ plain: true })
    );
    res.render('warehouses', {
      warehouses,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Display warehouse options on individual product page
router.get('/', async (req, res) => {
  // find all warehouses
  try {
    const warehouseData = await Warehouse.findAll({
      // includes products
      include: [{ model: Product }],
    });
    res.status(200).json(warehouseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one warehouse by its `id` value. May not be utilized in the front end mvp.
  try {
    const warehouseData = await Warehouse.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!warehouseData) {
      return res
        .status(404)
        .json({ message: 'No warehouse found with that id!' });
    }

    res.status(200).json(warehouseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new warehouse
  try {
    // check for duplicates
    const myWarehouseName = await Warehouse.findOne({
      where: {
        warehouse_name: req.body.warehouse_name,
      },
    });

    if (myWarehouseName) {
      res.status(400).json({
        message: 'This warehouse name is already taken. Please try again.',
      });
      return;
    }

    const warehouseData = await Warehouse.create({
      warehouse_name: req.body.warehouse_name,
    });
    res.status(200).json(warehouseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a warehouse by its `id` value
  try {
    const warehouseChange = await Warehouse.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!warehouseChange[0]) {
      res.status(404).json({ message: 'No warehouse exists with this id!' });
      return;
    }
    res.status(200).json(warehouseChange);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a warehouse by its `id` value. Front end will only allow a delete if the warehouse has NO products.
router.delete('/:id', async (req, res) => {
  try {
    const warehouseDelete = await Warehouse.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!warehouseDelete) {
      res.status(404).json({ message: 'No warehouse exists for this id' });
      return;
    }
    res.status(200).json(warehouseDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

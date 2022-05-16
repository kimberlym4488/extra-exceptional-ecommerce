const router = require('express').Router();
const warehouseRoutes = require('./warehouse-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/warehouses', warehouseRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
//this index is the entry point for all of our routes

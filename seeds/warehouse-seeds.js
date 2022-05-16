const { Warehouse } = require('../models');

const warehouseData = [
  {
    warehouse_name: 'North',
  },
  {
    warehouse_name: 'South',
  },
  {
    warehouse_name: 'East',
  },
  {
    warehouse_name: 'West',
  },
];

const seedWarehouses = () => Warehouse.bulkCreate(warehouseData);

module.exports = seedWarehouses;

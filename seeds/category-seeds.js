const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'North',
  },
  {
    category_name: 'South',
  },
  {
    category_name: 'East',
  },
  {
    category_name: 'West',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;

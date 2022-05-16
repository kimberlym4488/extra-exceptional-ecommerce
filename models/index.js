// import models
const Warehouse = require('./Warehouse');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Warehouse
Product.belongsTo(Warehouse, {
  foreignKey: 'warehouse_id',
  onDelete: 'CASCADE',
});

// Warehouses have many Products
Warehouse.hasMany(Product, {
  foreignKey: 'warehouse_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  //define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    foreignKey: 'tag_id',
    unique: false,
  },
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  //define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    foreignKey: 'product_id',
    unique: false,
  },
});

module.exports = {
  Product,
  Warehouse,
  Tag,
  ProductTag,
};

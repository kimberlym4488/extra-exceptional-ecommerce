const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'sticker',
  },
  {
    tag_name: 'vinyl decal',
  },
  {
    tag_name: 'shirt',
  },
  {
    tag_name: 'sweatshirt',
  },
  {
    tag_name: 'hat',
  },
  {
    tag_name: 'tanktop',
  },
  {
    tag_name: 'mug',
  },
  {
    tag_name: 'stencil decal',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;

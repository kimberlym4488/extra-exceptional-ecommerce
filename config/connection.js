require('dotenv').config();
console.log(process.env.DB_HOST);

const Sequelize = require('sequelize');
//connecting to sequelize database using credentials. Exporting these values to index.js
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
  });

module.exports = sequelize;

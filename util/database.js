const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Tschuss13!', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;

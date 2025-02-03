const { Sequelize } = require('sequelize');

// Conexión a la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'inventario.sqlite',
});

module.exports = sequelize;

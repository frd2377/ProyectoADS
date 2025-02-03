const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Definición del modelo Venta
const Venta = sequelize.define('Venta', {
  nombreProducto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVenta: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Venta;

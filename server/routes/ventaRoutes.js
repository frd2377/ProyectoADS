const express = require('express');
const Venta = require('../models/Venta');
const Producto = require('../models/Producto');
const router = express.Router();

// Registrar una venta
router.post('/ventas', async (req, res) => {
  const { id, cantidad } = req.body;
  const producto = await Producto.findByPk(id);

  if (producto && producto.stock >= parseInt(cantidad)) {
    const totalVenta = producto.precio * parseInt(cantidad);
    producto.stock -= parseInt(cantidad);  // Actualizamos el stock
    await producto.save();

    const nuevaVenta = await Venta.create({
      nombreProducto: producto.nombre,
      cantidad,
      totalVenta,
    });

    res.json(nuevaVenta);
  } else {
    res.status(400).send('No hay suficiente stock');
  }
});

// Obtener todas las ventas
router.get('/ventas', async (req, res) => {
  const ventas = await Venta.findAll();
  res.json(ventas);
});

module.exports = router;

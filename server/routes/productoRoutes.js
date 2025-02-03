const express = require('express');
const Producto = require('../models/Producto');
const router = express.Router();

// Obtener todos los productos
router.get('/productos', async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
});

// Agregar un nuevo producto
router.post('/productos', async (req, res) => {
  const { nombre, precio, stock, categoria } = req.body;
  const nuevoProducto = await Producto.create({ nombre, precio, stock, categoria });
  res.json(nuevoProducto);
});

// Actualizar un producto
router.put('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { cantidad, accion } = req.body;
  const producto = await Producto.findByPk(id);
  if (producto) {
    producto.stock = producto.stock+parseInt(cantidad);
    await producto.save();
    res.json(producto);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Eliminar un producto
router.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findByPk(id);
  if (producto) {
    await producto.destroy();
    res.json({ message: 'Producto eliminado' });
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

module.exports = router;

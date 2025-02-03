// Propósito: Archivo principal del servidor, aquí se configuran las rutas y se levanta el servidor
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const cors = require('cors');

// Creamos la aplicación de express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Para poder hacer peticiones desde cualquier origen
app.use(bodyParser.json());  // Para poder recibir JSON en las peticiones

app.use(productoRoutes); // Agregamos las rutas de productos
app.use(ventaRoutes); // Agregamos las rutas de ventas

// Sincronizamos la base de datos y luego levantamos el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});

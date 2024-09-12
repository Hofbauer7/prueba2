const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/contactsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB', error);
});

// Rutas
app.use('/api/contacts', contactRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Microservicio corriendo en http://localhost:${port}`);
});
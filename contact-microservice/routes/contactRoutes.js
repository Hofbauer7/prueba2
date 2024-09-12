const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// 1. Crear un nuevo contacto (POST)
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2. Obtener todos los contactos (GET)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Obtener un contacto por ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contacto no encontrado' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. Actualizar un contacto por ID (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) return res.status(404).json({ message: 'Contacto no encontrado' });
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 5. Eliminar un contacto por ID (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: 'Contacto no encontrado' });
    res.json({ message: 'Contacto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Método adicional: Buscar contactos por cualquier campo
router.get('/search/:term', async (req, res) => {
  try {
    const term = req.params.term;
    const contacts = await Contact.find({
      $or: [
        { firstName: { $regex: term, $options: 'i' } },
        { lastName: { $regex: term, $options: 'i' } },
        { phone: { $regex: term, $options: 'i' } },
        { age: { $regex: term, $options: 'i' } }
      ]
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
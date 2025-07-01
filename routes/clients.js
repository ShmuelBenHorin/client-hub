const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const authenticateToken = require('../middleware/auth');

// יצירת לקוח
router.post('/', authenticateToken, async (req, res) => {
  const { name, phone, email, appointmentDate } = req.body;
  try {
    const client = await Client.create({ name, phone, email, appointmentDate });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: 'Error creating client' });
  }
});

// צפייה בכל הלקוחות
router.get('/', authenticateToken, async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

// עדכון לקוח
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: 'Error updating client' });
  }
});

// מחיקת לקוח
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting client' });
  }
});

module.exports = router;

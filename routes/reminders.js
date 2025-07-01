const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const authenticateToken = require('../middleware/auth');

// יצירת תזכורת
router.post('/', authenticateToken, async (req, res) => {
  const { content, datetime } = req.body;
  try {
    const reminder = await Reminder.create({
      user: req.user.username,
      content,
      datetime
    });
    res.json(reminder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create reminder' });
  }
});

// קבלת כל התזכורות של המשתמש
router.get('/', authenticateToken, async (req, res) => {
  const reminders = await Reminder.find({ user: req.user.username });
  res.json(reminders);
});

// מחיקת תזכורת
router.delete('/:id', authenticateToken, async (req, res) => {
  await Reminder.deleteOne({ _id: req.params.id, user: req.user.username });
  res.json({ message: 'Reminder deleted' });
});

module.exports = router;

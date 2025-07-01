const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  user: { type: String, required: true }, // שם המשתמש
  content: { type: String, required: true },
  datetime: { type: Date, required: true }
});

module.exports = mongoose.model('Reminder', reminderSchema);

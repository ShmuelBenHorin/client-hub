const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  appointmentDate: Date
});

module.exports = mongoose.model('Client', clientSchema);

// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// ייבוא ראוטים
const clientsRouter = require('./routes/clients');
const authRouter = require('./routes/auth');
const reminderRoutes = require('./routes/reminders');

dotenv.config();

const app = express();

// מידלוורים
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// חיבור למסד נתונים
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('📡 Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ראוטים
app.use('/clients', clientsRouter);
app.use('/auth', authRouter);
app.use('/reminders', reminderRoutes);

// יצוא האפליקציה לצורך בדיקות
module.exports = app;

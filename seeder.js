// seeder.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // תוודא שהנתיב נכון
const Client = require('./models/Client'); // אם קיים

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('📡 מחובר ל־MongoDB');

    // מחיקת נתונים קודמים
    await User.deleteMany({});
    await Client.deleteMany({});

    // יצירת משתמש ניסיון
    const hashedPassword = await bcrypt.hash('123456', 10);
    const testUser = await User.create({
      username: 'demo',
      password: hashedPassword
    });

    // יצירת לקוחות דמו
    await Client.create([
      {
        userId: testUser._id,
        name: 'ישראל ישראלי',
        email: 'israel@test.com',
        phone: '050-1234567',
        meetingDate: new Date()
      },
      {
        userId: testUser._id,
        name: 'דנה כהן',
        email: 'dana@test.com',
        phone: '050-7654321',
        meetingDate: new Date()
      }
    ]);

    console.log('✅ נתוני ניסיון נזרקו בהצלחה');
    process.exit();
  })
  .catch(err => {
    console.error('❌ שגיאה בחיבור:', err);
    process.exit(1);
  });

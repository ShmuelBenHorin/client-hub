// auth.test.js
const request = require('supertest');
const app = require('./app'); // ודא שזה הנתיב לקובץ app.js
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('🔐 בדיקות אימות משתמשים', () => {
  it('מתחבר עם פרטי משתמש נכונים', async () => {
    const res = await request(app)
      .post('/auth/login') // ← הנתיב המתוקן
      .send({ username: 'demo', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('נכשל עם סיסמה שגויה', async () => {
    const res = await request(app)
      .post('/auth/login') // ← הנתיב המתוקן
      .send({ username: 'demo', password: 'שגוי' });

    expect(res.statusCode).toBe(401);
  });
});

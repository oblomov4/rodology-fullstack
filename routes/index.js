const express = require('express');
const urlencodedParser = express.urlencoded({ extended: false });
const axios = require('axios');
const { saveToJson } = require('../utils/requestsStorage');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.hbs');
});

router.post('/order-call', urlencodedParser, async (req, res) => {
  const { phone, name } = req.body;

  if (!phone || !name) {
    return res.redirect('/?success=false');
  }

  try {
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: process.env.CHAT_ID,
      text: `📌 Новая заявка!\nИмя: ${name}\nТелефон: ${phone}\n`,
    });

    saveToJson({ name, phone });

    return res.redirect('/?success=true');
  } catch (err) {
    console.error('Ошибка при сохранении заявки:', err);
    return res.redirect('/?bad=true');
  }
});

module.exports = router;

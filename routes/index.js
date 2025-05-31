const express = require('express');
const urlencodedParser = express.urlencoded({ extended: false });
const axios = require('axios');

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
    const TELEGRAM_TOKEN = '7903056723:AAFZ0OUbhCudXF711xzaUSQPmT6KUeYeQ1M';
    const CHAT_ID = '7533437898';

    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: `📌 Новая заявка!\nИмя: ${name}\nТелефон: ${phone}\n`,
    });

    return res.redirect('/?success=true');
  } catch (err) {
    console.error('Ошибка при сохранении заявки:', err);
    return res.redirect('/?success=false');
  }
});
module.exports = router;

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const REQUESTS_FILE = path.join(process.cwd(), 'requests.json');

router.get('/', (req, res) => {
  res.render('admin/dashboard', {
    title: 'Главная',
    layout: 'layouts/admin.hbs',
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/requests', (req, res) => {
  try {
    if (!fs.existsSync(REQUESTS_FILE)) {
      return res.json([]);
    }

    const data = JSON.parse(fs.readFileSync(REQUESTS_FILE));

    res.render('admin/requests.hbs', {
      title: 'Заявки',
      layout: 'layouts/admin.hbs',
      requests: data,
    });
  } catch (err) {
    res.render('admin/requests.hbs', {
      layout: 'layouts/admin.hbs',
      requests: [],
      error: 'Не удалось загрузить заявки',
    });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

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

module.exports = router;

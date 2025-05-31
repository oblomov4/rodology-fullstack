const express = require('express');
const urlencodedParser = express.urlencoded({ extended: false });

const ADMIN = {
  login: process.env.ADMIN_LOGIN,
  password: process.env.ADMIN_PASSWORD,
};

const router = express.Router();

router.get('/', (req, res) => {
  const errorMessage = req.query.error;

  res.render('admin/admin-login', {
    title: 'Главная',
    layout: 'layouts/admin.hbs',
    error: errorMessage,
  });
});

router.post('/', urlencodedParser, (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN.login && password === ADMIN.password) {
    req.session.isAdmin = true;
    return res.redirect('/admin/');
  } else {
    return res.redirect('/admin/login?error=Неверные данные');
  }
});

module.exports = router;

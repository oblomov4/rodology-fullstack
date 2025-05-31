require('dotenv').config();
const express = require('express');
const session = require('express-session');

const app = express();


//ПЕРЕМЕННЫЙ РОУТОВ
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Время жизни cookie (1 день)
    },
  }),
);

//ПОДКЛЮЧЕНИЕ РОУТОВ
app.use('/', indexRoutes);
app.use('/admin/login', authRoutes);
app.use('/admin', require('./middlewares/auth').requireAuth, adminRoutes);


app.listen(3000, () => console.log('Сервер запущен на порту 3000'));

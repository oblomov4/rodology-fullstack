const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Express.js');
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});

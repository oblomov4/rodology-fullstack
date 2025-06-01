const fs = require('fs').promises;
const path = require('path');

const REQUESTS_FILE = path.join(process.cwd(), 'requests.json');
const MAX_REQUESTS = 100;

async function saveToJson(data) {
  try {
    let requests = [];

    // Читаем существующие данные
    try {
      const fileContent = await fs.readFile(REQUESTS_FILE, 'utf-8');
      requests = JSON.parse(fileContent);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error; // Пропускаем ошибку "файл не найден", другие ошибки пробрасываем
      }
    }

    // Проверяем количество заявок и очищаем если нужно
    if (requests.length >= MAX_REQUESTS) {
      requests = []; // Очищаем массив
      console.log(`Очистка файла, достигнут лимит ${MAX_REQUESTS} заявок`);
    }

    // Добавляем новую заявку
    requests.push({
      ...data,
      date: new Date().toISOString(),
    });

    // Записываем обратно с красивым форматированием
    await fs.writeFile(REQUESTS_FILE, JSON.stringify(requests, null, 2));

    console.log('Заявка успешно сохранена');
  } catch (error) {
    console.error('Ошибка при сохранении заявки:', error);
    throw error; // Пробрасываем ошибку для обработки на уровне выше
  }
}

module.exports = { saveToJson };

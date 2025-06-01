document.querySelectorAll('.dropdown-button').forEach((button) => {
  button.addEventListener('click', () => {
    const dropdown = button.closest('.dropdown');
    dropdown.classList.toggle('active');
  });
});

// Проверяем URL при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
  console.log('Страница загрузилась');

  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get('success');
  const bad = urlParams.get('bad');

  if (success) {
    showToast('success', 'Ваша заявка отправлена!');
  } else if (bad) {
    showToast('error', 'Ваша заявка не отправилась!');
  }
});

// Функция для показа toast-уведомления
function showToast(type, message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;

  console.log(toast);

  if (type === 'error') {
    toast.style.background = '#F44336';
  } else {
    toast.style.background = '#4CAF50';
  }

  toast.className = 'toast-visible';
  setTimeout(() => (toast.className = 'toast-hidden'), 3000);
}

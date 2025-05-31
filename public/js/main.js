document.querySelectorAll('.dropdown-button').forEach((button) => {
  button.addEventListener('click', () => {
    const dropdown = button.closest('.dropdown');
    dropdown.classList.toggle('active');
  });
});

// Проверяем URL при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get('success');

  if (success === 'true') {
    showToast('success', 'Ваша заявка отправлена!');
  } else {
    showToast('error', 'Ваша заявка не отправилась!');
  }
});

// Функция для показа toast-уведомления
function showToast(type, message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;

  if (type === 'error') {
    toast.style.background = '#F44336';
  } else {
    toast.style.background = '#4CAF50';
  }

  toast.classList.add('toast-visible');
  setTimeout(() => toast.classList.remove('toast-visible'), 3000);
}

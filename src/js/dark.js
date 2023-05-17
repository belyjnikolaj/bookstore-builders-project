export function darkMode() {
  // перевірка наявності значення теми в локалсторедж
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDarkClass();
}

function addDarkClass() {
  // функція додавання значення теми та кнопки
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.querySelector('html').classList.add('dark');
      document
        .querySelector('.js-color-switcher')
        .setAttribute('checked', 'yes');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  } catch (err) {}
}
addDarkClass();

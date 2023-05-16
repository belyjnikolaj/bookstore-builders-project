export function darkMode() {
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDarkClass();
  // document.querySelector('html').classList.toggle('dark');
}

function addDarkClass() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.querySelector('html').classList.add('dark');
      // ----- функція зміни іконки
    } else {
      document.querySelector('html').classList.remove('dark');
      // ----функція зміни іконки
    }
  } catch (err) {}
}
addDarkClass();
// document.querySelector('.js-color-switcher').addEventListener('click', () => {
//   if (localStorage.getItem('theme') === 'dark') {
//     localStorage.removeItem('theme');
//   } else {
//     localStorage.setItem('theme', 'dark');
//   }
// });

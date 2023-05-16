export function darkMode() {
  document.body.classList.toggle('dark-mode');
  document
    .querySelector('.header-conteiner')
    .classList.toggle('dark-mode-header');
  document.querySelector('.link').classList.toggle('link-dark');
  document.querySelector('.nav-shopping-page').classList.toggle('link-dark');
  document
    .querySelector('.nav-shopping-page__icon')
    .classList.toggle('icon-dark');
  document.querySelectorAll('.books-category-btn').forEach(element => {
    element.classList.toggle('category-btn-dark');
  });

  document.querySelectorAll('.info-title__item').forEach(element => {
    element.classList.toggle('dark-title');
  });
}

// const link = document.querySelectorAll('.link').forEach(element => {
//   element.classList.toggle('link-dark');
// });

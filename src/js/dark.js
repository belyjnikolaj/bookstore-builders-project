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
  document
    .querySelector('.books-category-btn')
    .classList.toggle('category-btn-dark');
  document.querySelector('.info-title__item').classList.toggle('dark-title');
}

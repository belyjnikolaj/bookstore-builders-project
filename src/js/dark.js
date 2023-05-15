export function darkMode() {
  document.body.classList.toggle('dark-mode');
  document
    .querySelector('.header-conteiner')
    .classList.toggle('dark-mode-header');
  document.querySelector('.link').classList.toggle('link-dark');
  document.querySelector('.nav-shopping-page').classList.toggle('link-dark');
  //   document.querySelector('.navigation').classList.toggle('icon-dark');
}

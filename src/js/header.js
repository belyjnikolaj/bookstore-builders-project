import { darkMode } from './dark';

const colorSwitcher = document.querySelector('.js-color-switcher');

colorSwitcher.addEventListener('click', darkMode);

function onClick(e) {
  //     let menu = document.querySelector('.menu');
  // menuBtn.addEventListener('click', function(){
  menu.classList.toggle('active');
}

export { header };

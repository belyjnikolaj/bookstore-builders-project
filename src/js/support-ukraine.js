import Swiper from 'swiper/swiper-bundle';
// console.log(import.meta.url);
import { supportList } from './support-list';

const list = document.querySelector('.swiper-wrapper');

const supportUkraine = supportList
  .map(({ title, url, img }, index) => {
    // var URL = 'file:///src/images/';

    // const img = new URL(`${index + 1}.png?as=png&width=150`, import.meta.url);

    // console.log();
    return `
       <div class="swiper-slide">0${index + 1}
       <a href="${url}" target="_blank" rel="noreferrer noopener">
       <img class="swiper-slide__img" src="${img}" alt="${title}" /></a>
                </div>`;
  })
  .join(' ');
console.log(supportUkraine);
list.insertAdjacentHTML('beforeend', supportUkraine);

const swiper = new Swiper('.swiper-container', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
  },
  direction: 'vertical',
  slidesPerView: 3,
  spaceBetween: 20,
  breakpoints: {
    767: {
      slidesPerView: 5,
      loopedSlides: 4,
    },
  },
});

export { supportUkraine };

import Swiper from 'swiper/swiper-bundle';
// import 'swiper/swiper-bundle.min.css';
import { supportList } from './support-list';

const list = document.querySelector('.swiper-wrapper');

const supportUkraine = supportList
  .map(({ title, url, img }, index) => {
    return `
       <div class="swiper-slide">0${index + 1}
       <a href="${url}" target="_blank" rel="noreferrer noopener">
       <img class="swiper-slide__img" src="${img}" alt="${title}" /></a>
                </div>`;
  })
  .join(' ');
// console.log(supportUkraine);
list.insertAdjacentHTML('beforeend', supportUkraine);

const swiper = new Swiper('.swiper-container', {
  // настройки свайпера з поверненням в кінці до першого слайду
  rewind: true,
  slidesPerView: 4,
  breakpoints: {
    768: {
      slidesPerView: 6,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next',
  },
  direction: 'vertical',
  // настройки свайпера з безкінечною прокруткою
  // але максимум 5 слайдів для одночасного показу
  // loop: true,
  // slidesPerView: 'auto',
  // breakpoints: {
  //   768: {
  //     slidesPerView: 5,
  //   },
  // },
  // loopedSlides: 4,

  spaceBetween: 20,
  // ----Accessibility-----
  a11y: {
    enabled: true,
    containerMessage: 'list of charitable organizations',
    firstSlideMessage: 'This is the first slide',
    nextSlideMessage: 'Next slide',
    paginationBulletMessage: 'Go to slide {{index}}',
  },
});

export { supportUkraine };

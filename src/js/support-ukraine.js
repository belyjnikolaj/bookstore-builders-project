import Swiper from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.min.css';

const swiper = new Swiper('.support-list', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
  },
});

export { supportUkraine };

import Swiper from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.min.css';

const list = document.querySelector('.swiper-wrapper');

const supportList = [
  {
    title: 'Save the Children',
    url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: null,
  },
  {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: null,
  },
  {
    title: 'UNITED24',
    url: 'https://u24.gov.ua/uk',
    img: null,
  },
  {
    title: 'International Medical Corps',
    url: 'https://internationalmedicalcorps.org/country/ukraine/',
    img: null,
  },
  {
    title: 'Medicins Sans Frontieres',
    url: 'https://www.msf.org/ukraine',
    img: null,
  },
  {
    title: 'RAZOM',
    url: 'https://www.razomforukraine.org/',
    img: null,
  },
  {
    title: 'Action against hunger',
    url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
    img: null,
  },
  {
    title: 'World vision',
    url: 'https://www.wvi.org/emergencies/ukraine',
    img: null,
  },
  {
    title: 'Serhiy Prytula Charity Foundation',
    url: 'https://prytulafoundation.org/en',
    img: null,
  },
];

const supportUkraine = supportList
  .map(({ title, url }, index) => {
    const img = new URL(`${index + 1}.png?as=png&width=149`, import.meta.url);
    return `
       <div class="swiper-slide"> 0${index + 1}
                    <a href="${url}"><img src="${img}" alt="${title}" /></a>
                </div>`;
  })
  .join(' ');

list.insertAdjacentHTML('beforeend', supportUkraine);

const swiper = new Swiper('.swiper-container', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
  },
});

export { supportUkraine };

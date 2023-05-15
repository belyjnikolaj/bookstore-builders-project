import { fetchBestSellers } from './js/best-selling-books';
import { supportUkraine } from './js/support-ukraine';

import { header } from './js/header';

import { modalCard } from './js/modal-card';
import { fetchBestSellers } from './js/best-selling-books';
import { toggleModal } from './js/modal-registration';

supportUkraine();
createHero();
fetchBestSellers()
  .then(data =>
    bestSellersGal.insertAdjacentHTML(
      'beforeend',
      createMarkupBooksCategories(data)
    )
  )
  .catch(err => console.log(err));

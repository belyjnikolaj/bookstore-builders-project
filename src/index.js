// import { toggleModal } from './js/modal-registration';
import { fetchBestSellers } from './js/best-selling-books';
import { supportUkraine } from './js/support-ukraine';

import { header } from './js/header';

import { modalCard } from './js/modal-card';
import { fetchCategories } from './js/categories-list-list';
fetchCategories();

supportUkraine();
header();

fetchBestSellers()
  .then(data =>
    bestSellersGal.insertAdjacentHTML(
      'beforeend',
      createMarkupBooksCategories(data)
    )
  )
  .catch(err => console.log(err));

import './js/auth.js'
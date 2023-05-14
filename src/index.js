import { fetchBestSellers } from './js/best-selling-books';
import { supportUkraine } from './js/support-ukraine';
import { createHero } from './js/best-selling-books';

supportUkraine();
createHero();
fetchBestSellers()
  .then(data => bestSellersGal.insertAdjacentHTML('beforeend', createMarkupBooksCategories(data)))
  .catch(err => console.log(err));
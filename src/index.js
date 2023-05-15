import { fetchBestSellers } from './js/best-selling-books';
import { supportUkraine } from './js/support-ukraine';
import { modalCard } from './js/modal-card';
import { fetchCategories } from './js/categories-list-list';
supportUkraine();
createHero();
fetchCategories();
fetchBestSellers()
//   .then(data => bestSellersGal.insertAdjacentHTML('beforeend', createMarkupBooksCategories(data)))
//   .catch(err => console.log(err));


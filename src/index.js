
import { fetchBestSellers } from './js/best-selling-books';

fetchBestSellers()
  .then(data => bestSellersGal.insertAdjacentHTML('beforeend', createMarkupBooksCategories(data)))
  .catch(err => console.log(err));

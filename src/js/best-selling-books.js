import { openModalCard } from './modal-card';
import axios from 'axios';
import { truncateTextToFitOneLine, displayBooksAndHighlightLastWord } from './helpers';
import { displayBooksByCategory, createMarkupBooks } from './categories-list-list';
import Notiflix from 'notiflix';
const bestSellersGal = document.querySelector('.js-best-sellers');
const categories = document.querySelector('.categories');
let width = window.innerWidth;
let booksPerList = 1;
function viewPort() {
  if (width <= 768) {
    booksPerList = 1;
  } else if (width > 768 && width < 1440) {
    booksPerList = 3;
  } else {
    booksPerList = 5;
  }
}
viewPort();
async function fetchBestSellers() {
  const resp = await axios.get(`https://books-backend.p.goit.global/books/top-books`).then(response => response.data);
  return resp;
}
fetchBestSellers()
  .then(data => {
    bestSellersGal.insertAdjacentHTML('beforeend', createMarkupBooksCategories(data))
     addClickListeners();
  },
    err => {
      console.log(err)
     Notiflix.Notify.info(
          'Sorry, there are no books matching your search query.'
  );});
function createMarkupBooksCategories(arr) {
  return arr.map(({ list_name, books }) =>
  `<div class="books_list_category">
        <p class="category_name">${list_name}</p>
        <ul class="books_row">${books.slice(0, booksPerList).map(({ book_image, title, author, _id, }) =>
         ` <div>
             <a href="#" class="modal_popap" target="_self">
               <div class="book-card__img-box--main-page">
                 <img class="book-card__img--main-page"src="${book_image}" alt="" loading="lazy />
               </div>
               <div>
                  <p class="info-title__item--main-page " id="title" class="cut-text">${title}</p>
                  <p class="info-author__item--main-page">${author}</p>
                  <p class = "visually-hidden">${_id}</p>
               </div>
                  </a>
            </div>`).join('')}</ul><button class="books-category-btn" data-list="${list_name}">see more</button>
      </div>
    `
  ).join('');
}
// Viktoriia added //
// function addClickListeners() {
//   const bookCards = document.querySelectorAll('.book-card');
//   bookCards.forEach(card => {
//     const id = card.querySelector('.visually-hidden').textContent;
//     card.addEventListener('click', () => {
//       openModalCard(id);
//     });
//   });
// }
function addClickListeners() {
  const bookCards = document.querySelectorAll('.js-best-sellers');
  bookCards.forEach(card => {
    const id = card.querySelector('.visually-hidden').textContent;
    addToShopList(evt);
    card.addEventListener('click', () => {
      openModalCard(id);
      document.getElementById('data-modal-card').classList.remove('is-hidden');
    });
  });
}
// РОЗРОЗБКА КНОПКИ----------------------------------
const booksElement = document.querySelector('.books');
bestSellersGal.addEventListener('click', handleCategoryBtnClick);
  async function getBooksByCategory(newGal) {
    const response = await axios.get(
      `https://books-backend.p.goit.global/books/category?category=${newGal}`).then(response => response.data);
    return response;
};
function handleCategoryBtnClick(evt) {
  if (evt.target.nodeName !== "BUTTON") {
    return;
  }
  bestSellersGal.innerHTML = '';
  const newGalName = evt.target.dataset.list;
 getBooksByCategory(newGalName)
   .then(data => {
      displayBooksByCategory(newGalName);
      displayBooksAndHighlightLastWord(data, newGalName);
     booksElement.insertAdjacentHTML('beforeend',createMarkupBooks(data))
     addClickListeners();
  },
    err => { console.log(err) });
}
export { fetchBestSellers };

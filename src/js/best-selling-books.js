import { openModalCard } from './modal-card';
import axios from 'axios';

const bestSellersGal = document.querySelector('.js-best-sellers');
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
  // const BASE_URL = 'https://books-backend.p.goit.global/';
  // const END_POINT = `books/top-books`;
  const resp = await axios.get(`https://books-backend.p.goit.global/books/top-books`).then(response => response.data);
  return resp;
}

fetchBestSellers()
  .then(data => {
    bestSellersGal.insertAdjacentHTML('beforeend', createMarkupBooksCategories(data))
     addClickListeners();
  },
    err => { console.log(err) });

function createMarkupBooksCategories(arr) {
  return arr.map(({ list_name, books }) =>  
  `<div class="books_list_category">
        <p class="category_name">${list_name}</p>
        <ul class="books_row">${books.slice(0, booksPerList).map(({ book_image, title, author, _id, }) =>
         ` <div>
             <a href="#" class="modal_popap" target="_self">
               <div class="book-card__img-box--main-page">
                 <img class="book-card__img--main-page"src="${book_image}" alt="${title}" loading="lazy />
               </div>
               <div>
                  <h3 class="info-title__item--main-page cut-text">${title}</h3>
                  <p class="info-author__item--main-page">${author}</p>
                  <p class = "visually-hidden">${_id}</p>
              </div>
              </a>
            </div>`).join('')}</ul><button class="books-category-btn">see more</button>
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
    card.addEventListener('click', () => {
      openModalCard(id);
      document.getElementById('data-modal-card').classList.remove('is-hidden');
    });
  });
}
// export { fetchBestSellers };

bestSellersGal.addEventListener('click', handleCategoryBtnClick);

// function  handleCategoryBtnClick(evt) {
//   const btnCategory = evt.currentTarget.textContent.contains();
//   console.log(btnCategory); 
  
// } //це видалиті віка



// function addClickListeners() {
//   const bookCards = document.querySelectorAll('.book-card');
//   bookCards.forEach(card => {
//     const id = card.querySelector('.visually-hidden').textContent;
//     card.addEventListener('click', () => {
//       openModalCard(id);
//     });
//   });
// }

// РОЗРОЗБКА КНОПКИ ІГОРЕМ(ЩЕ НЕ ЗАВЕРШЕНО)
bestSellersGal.addEventListener('click', handleCategoryBtnClick);

function handleCategoryBtnClick(evt) {
  
  // const btnCategory = evt.target.textContent.contains();
  console.log(evt);
  
}


export { fetchBestSellers };





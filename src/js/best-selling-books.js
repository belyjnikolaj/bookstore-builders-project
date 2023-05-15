
import axios from 'axios';

import { openModalCard } from './modal-card';

const bestSellersGal = document.querySelector('.js-best-sellers');
let booksPerList = 1;
 let width = window.innerWidth;


function createHero() {
  if (width <= 768) {
    booksPerList = 1;
  } else if (width > 768 && width < 1440) {
    booksPerList = 3;
  } else {
    booksPerList = 5;
  }
}
createHero();


async function fetchBestSellers() {
  const BASE_URL = 'https://books-backend.p.goit.global/';
  const END_POINT = `books/top-books`;
  const resp = await axios.get(`https://books-backend.p.goit.global/books/top-books`).then(response => response.data);
  console.log(resp);
  return resp;
}
// fetchBestSellers()
//   .then(data => bestSellersGal.insertAdjacentHTML('beforeend',createMarkupBooksCategories(data)))
//   .catch(err => console.log(err));
// Viktoriia added //
fetchBestSellers()
  .then(data => {
    bestSellersGal.insertAdjacentHTML('beforeend', createMarkupBooksCategories(data));
    addClickListeners();
  })
  .catch(err => console.log(err));
// Viktoriia added //

function createMarkupBooksCategories(arr) {
  return arr.map(({ list_name, books, _id }) =>  
  `<div><ul class="books_list_category">
        <li><p class="category_name">${list_name}</p><ul class="books_row">${books.slice(0, booksPerList).map(({ book_image, title, author, _id, }) => ` <a href="#" class="modal_popap" target="_self">
          <div class="book-card" onclick="openModalCard(${_id})">
              <div class="book-card__img-box">
                <img class="book-card__img"src="${book_image}" alt="${title}" loading="lazy />
              </div>
              <div class="info">
                  <h3 class="info-title__item">${title}</h3>
                  <p class="info-author__item">${author}</p>
                  <p class = "visually-hidden">${_id}</p>
              </div>
          </div>
      </a>`).join('')}</ul><button class="book-card-btn">see more</button></li>
      </ul></div> 
    </div>`
  ).join('');
}
 // Viktoriia added //

function addClickListeners() {
  const bookCards = document.querySelectorAll('.book-card');
  bookCards.forEach(card => {
    const id = card.querySelector('.visually-hidden').textContent;
    card.addEventListener('click', () => {
      openModalCard(id);
    });
  });
}
// Viktoriia added //

export {fetchBestSellers };

//  return bestSellersGal.innerHTML = markupBooksList(data).join('');
// };
 
// //  fetchBestSellers().then(data => {
// //    console.log(data);
// // })
// //   .catch(error => {
// //        console.log(error);
// //   Notiflix.Notify.failure('Oops, there is error');
// //   });

// function markupBooksList(data) {
//   console.log(data);
//   data.map(arr => {
//     const { list_name, books } = arr;
//    const bookCard = ;
//     return `<div>
//             <h3>${list_name}</h3>
//                  <ul>
//                 </ul>
//               <button>see more</button>
//         </div>`});
  
// }


// createHero();
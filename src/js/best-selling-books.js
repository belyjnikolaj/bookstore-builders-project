import axios from 'axios';

import { openModalCard } from './modal-card';

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

// async function fetchBestSellers() {
//   const BASE_URL = 'https://books-backend.p.goit.global/';
//   const END_POINT = `books/top-books`;
//   const resp = await axios
//     .get(`https://books-backend.p.goit.global/books/top-books`)
//     .then(response => response.data);
//   console.log(resp);

async function fetchBestSellers() {
  const BASE_URL = 'https://books-backend.p.goit.global/';
  const END_POINT = `books/top-books`;
  const resp = await axios.get(`https://books-backend.p.goit.global/books/top-books`).then(response => response.data);

  return resp;
}
// fetchBestSellers()
//   .then(data => bestSellersGal.insertAdjacentHTML('beforeend',createMarkupBooksCategories(data)))
//   .catch(err => console.log(err));
// Viktoriia added //
fetchBestSellers()
  .then(data => {
    bestSellersGal.insertAdjacentHTML(
      'beforeend',
      createMarkupBooksCategories(data)
    );
    addClickListeners();
  })
  .catch(err => console.log(err));
  
// Viktoriia added //
function createMarkupBooksCategories(arr) {
  return arr.map(({ list_name, books }) =>  
  `<div class="books_list_category">
        <p class="category_name">${list_name}</p><ul class="books_row">${books.slice(0, booksPerList).map(({ book_image, title, author, _id, }) =>
         ` <div class="book-card">
           <a href="#" class="modal_popap" target="_self">
          <div class="book-card__img-box">
                <img class="book-card__img"src="${book_image}" alt="${title}" loading="lazy />
              </div>
              <div class="info ">
                  <h3 class="info-title__item cut-text">${title}</h3>
                  <p class="info-author__item">${author}</p>
                  <p class = "visually-hidden">${_id}</p>
              </div>
          </a></div>`).join('')}</ul><button class="books-category-btn">see more</button>
      </div> 
    `
  ).join('');
}
// function createMarkupBooksCategories(arr) {

//   return arr
//     .map(
//       ({ list_name, books }) =>
//         `<div class="books_list_category">
//         <p class="category_name">${list_name}</p><ul class="books_row">${books
//           .slice(0, booksPerList)
//           .map(
//             ({
//               book_image,
//               title,
//               author,
//               _id,
//             }) => ` <a href="#" class="modal_popap" target="_self">
//           <div class="book-card">

//               <div class="book-card__img-box">

//   return arr.map(({ list_name, books }) =>  
//   `<div class="books_list_category">
//         <p class="category_name">${list_name}</p><ul class="books_row">${books.slice(0, booksPerList).map(({ book_image, title, author, _id, }) =>
//          ` <div class="book-card">
//            <a href="#" class="modal_popap" target="_self">
//           <div class="book-card__img-box">
//                 <img class="book-card__img"src="${book_image}" alt="${title}" loading="lazy />
//               </div>
//               <div class="info ">
//                   <h3 class="info-title__item cut-text">${title}</h3>
//                   <p class="info-author__item">${author}</p>
//                   <p class = "visually-hidden">${_id}</p>
//               </div>

//           </div>
//       </a>`
//           )
//           .join('')}</ul><button class="books-category-btn">see more</button>
                                                                                                          
//           </a></div>`).join('')}</ul><button class="books-category-btn">see more</button>
//       </div> 
//     `
//     )
//     .join('');
// }

// function addClickListeners() {
//   const bookCards = document.querySelectorAll('.js-best-sellers');
//   bookCards.forEach(card => {
//     const id = card.querySelector('.visually-hidden').textContent;
//     card.addEventListener('click', () => {
//       openModalCard(id);
//       document.getElementById('data-modal-card').classList.remove('is-hidden');
//     });
//   });
// }

function addClickListeners() {
  const bookCards = document.querySelectorAll('.book-card');
  bookCards.forEach(card => {
    const id = card.querySelector('.visually-hidden').textContent;
    card.addEventListener('click', () => {
      openModalCard(id);
    });
  });
}
// export { fetchBestSellers };

bestSellersGal.addEventListener('click', handleCategoryBtnClick);

function  handleCategoryBtnClick(evt) {
  const btnCategory = evt.currentTarget.textContent.contains();
  console.log(btnCategory);
  
}



// function addClickListeners() {
//   const bookCards = document.querySelectorAll('.book-card');
//   bookCards.forEach(card => {
//     const id = card.querySelector('.visually-hidden').textContent;
//     card.addEventListener('click', () => {
//       openModalCard(id);
//     });
//   });
// }
export { fetchBestSellers };
  



//  return bestSellersGal.innerHTML = markupBooksList(data).join('');
// };

// //  fetchBestSellers().then(data => {
// //    console.log(data);
// // })
// //   

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




///////viktoriia May16
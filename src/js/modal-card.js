// import axios from 'axios';
// import { BookAPI } from './booksApi';

// console.log({ BookAPI });

// const bookApi = new BookAPI();

// const URL_API = 'https://books-backend.p.goit.global/books/';

// const refs = {
//   openModalCardBtn: document.querySelector(
//     'button[name="data-modal-card-open"]'
//   ),
//   modalCard: document.querySelector('.modal-card'),

//   closeModalCardBtn: document.querySelector('.modal-card_close'),
// };

// refs.openModalCardBtn.addEventListener('click', openModalCard);
// refs.closeModalCardBtn.addEventListener('click', closeModalCard);

// let isModalOpen = false;

// // export function openModalCard(bookId) {
// //   console.log({ bookId });
// //   if (!isModalOpen) {
// //     toggleModal();
// //     isModalOpen = true;
// //     refs.openModalCardBtn.style.display = 'none';
// //     return bookApi
// //       .fetchBook(bookId)
// //       .then(data => renderBooks(data, refs))
// //       .catch(e => console.log(e));
// //   }
// // }

// export function openModalCard(bookId) {
//   console.log({ bookId });
//   if (!isModalOpen) {
//     toggleModal();
//     const data = bookApi
//       .fetchBook(bookId)
//       .then(data => renderBooks(data, refs))
//       .catch(e => console.log(e));
//        isModalOpen = true;
//     refs.openModalCardBtn.style.display = 'none';
//   }
// }

// function closeModalCard() {
//   toggleModal();
//   clearModalContent();
// }

// function toggleModal() {
//   const modalBackdrop = document.getElementById('data-modal-card');
//   modalBackdrop.classList.toggle('is-hidden');
// }

// function clearModalContent() {
//   const modalCardInfo = document.querySelector('.modal-card-info');
//   if (modalCardInfo) {
//     modalCardInfo.innerHTML = '';
//   }
// }

// const renderBooks = (data, refs) => {
//   const book = data.data;
//   const amazonLink = book.buy_links.find(link => link.name === 'Amazon');
//   const bookshopLink = book.buy_links.find(link => link.name === 'Bookshop');
//   const appleBooksLink = book.buy_links.find(
//     link => link.name === 'Apple Books'
//   );
// console.log(book)
//   const bookElMarkup = `
//   <div class="modal-card-div">
//   <img class="modal-card_img" src="${book.book_image}" alt="${book.title}" />
//   <div class="modal-card-info">
//   <h3 class="modal-card_title">${book.title}</h3>
//   <p class="modal-card_author">${book.author}</p>
//   <p class="modal-card_desq">${book.description}</p>
//   <ul class="shopping-list-links"> 
//     <li><a href="${amazonLink.url}">${amazonLink.name}</a></li>
//     <li><a href="${bookshopLink.url}">${bookshopLink.name}</a></li>
//     <li><a href="${appleBooksLink.url}">${appleBooksLink.name}</a></li>
//   </ul>
//   </div>
//   </div>
//   <div class="button-shopping">
//   <button class="button-add-shopping-list btn-modal-card" type="button">Add to Shopping List</button> 
//   </div>
//   `;

//   refs.modalCard.insertAdjacentHTML('beforeend', bookElMarkup);
// };

// document.addEventListener('keydown', function (event) {
//   if (event.key === 'Escape') {
//     closeModalCard();
//   }
// });

// export { openModalCard };


import axios from 'axios';
import { BookAPI } from './booksApi';

const bookApi = new BookAPI();

const URL_API = 'https://books-backend.p.goit.global/books/';

const refs = {
  openModalCardBtn: document.querySelector(
    'button[name="data-modal-card-open"]'
  ),
  modalCard: document.querySelector('.modal-card'),

  closeModalCardBtn: document.querySelector('.modal-card_close'),
};

refs.openModalCardBtn.addEventListener('click', openModalCard);
refs.closeModalCardBtn.addEventListener('click', closeModalCard);

let isModalOpen = false;

export function openModalCard(bookId) {
  if (!isModalOpen) {
    toggleModal();
    const data = bookApi
      .fetchBook(bookId)
      .then(data => renderBooks(data, refs))
      .catch(e => console.log(e));
    isModalOpen = true;
    refs.openModalCardBtn.style.display = 'none';
    console.log(isModalOpen, 'INSIDE');
  }
}

function closeModalCard() {
  isModalOpen = false;
  toggleModal();
  clearModalContent();
}

function toggleModal() {
  const modalBackdrop = document.getElementById('data-modal-card');
  modalBackdrop.classList.toggle('is-hidden');
}

function clearModalContent() {
  const modalCard = document.querySelector('.modal-card');
  if (modalCard) {
    modalCard.innerHTML = '';
  }
}

const renderBooks = (data, refs) => {
  const book = data.data;
  const amazonLink = book.buy_links.find(link => link.name === 'Amazon');
  const bookshopLink = book.buy_links.find(link => link.name === 'Bookshop');
  const appleBooksLink = book.buy_links.find(
    link => link.name === 'Apple Books'
  );
  console.log({book});
  const bookElMarkup = `
  <div class="modal-card-div">
  <img class="modal-card_img" src="${book.book_image}" alt="${book.title}" />
  <div class="modal-card-info">
  <h3 class="modal-card_title">${book.title}</h3>
  <p class="modal-card_author">${book.author}</p>
  <p class="modal-card_desq">${book.description}</p>
  <ul class="shopping-list-links"> 
    <li><a href="${amazonLink.url}">${amazonLink.name}</a></li>
    <li><a href="${bookshopLink.url}">${bookshopLink.name}</a></li>
    <li><a href="${appleBooksLink.url}">${appleBooksLink.name}</a></li>
  </ul>
  </div>
  </div>
  <div class="button-shopping">
  <button class="button-add-shopping-list btn-modal-card" type="button">Add to Shopping List</button> 
  </div>
  `;

  refs.modalCard.insertAdjacentHTML('beforeend', bookElMarkup);
};

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && isModalOpen) {
    closeModalCard();
  }
});
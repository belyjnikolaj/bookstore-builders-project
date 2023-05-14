// import axios from 'axios';

// const refs = {
//   openModalCardBtn: document.querySelector(
//     'button[name="data-modal-card-open"]'
//   ),
//   modalCard: document.querySelector('#data-modal-card'),
//   closeModalCardBtn: document.querySelector('.modal-card_close'),
//   modalCardForm: document.querySelector('.modal-card-form'),
// };

// refs.openModalCardBtn.addEventListener('click', openModalCard);
// refs.closeModalCardBtn.addEventListener('click', closeModalCard);

// let isModalOpen = false;

// function openModalCard() {
//   if (!isModalOpen) {
//     toggleModal();
//     fetchBook();
//     isModalOpen = true;
//   }
// }

// function closeModalCard() {
//   toggleModal();
//   clearModalContent();
// }

// function toggleModal() {
//   document.body.classList.toggle('modal-open');
//   refs.modalCard.classList.toggle('is-hidden');
// }

// function clearModalContent() {
//   refs.modalCard.innerHTML = '';
// }

// const renderBooks = (data, refs) => {
//   const amazonLink = data.buy_links.find(link => link.name === 'Amazon');
//   const bookshopLink = data.buy_links.find(link => link.name === 'Bookshop');
//   const appleBooksLink = data.buy_links.find(
//     link => link.name === 'Apple Books'
//   );

//   const bookElMarkup = `
//     <img class="modal-card_img" src="${data.book_image}" alt="${data.title}" />
//     <h3 class="modal-card_title">${data.title}</h3>
//     <p class="modal-card_author">${data.author}</p>
//     <p class="modal-card_desq">${data.description}</p>
//     <ul class="shopping-list-links"> 
//       <li><a href="${amazonLink.url}">${amazonLink.name}</a></li>
//       <li><a href="${bookshopLink.url}">${bookshopLink.name}</a></li>
//       <li><a href="${appleBooksLink.url}">${appleBooksLink.name}</a></li>
//     </ul>
//     <button class="add-shopping-list" type="button">Add to Shopping List</button>

//   `;

//   refs.modalCard.insertAdjacentHTML('beforeend', bookElMarkup);
// };

// const URL_API = 'https://books-backend.p.goit.global/books/';
// const bookId = '643282b1e85766588626a0dc';

// function fetchBook() {
//   axios
//     .get(`${URL_API}${bookId}`)
//     .then(response => {
//       const data = response.data;
//       renderBooks(data, refs);
//       console.log({ data });
//     })
//     .catch(error => {
//       console.log('Error:', error);
//     });
// }

import axios from 'axios';
import BookAPI from './booksApi';
console.log({BookAPI})

const refs = {
  openModalCardBtn: document.querySelector(
    'button[name="data-modal-card-open"]'
  ),
  modalCard: document.querySelector('#data-modal-card'),
  closeModalCardBtn: document.querySelector('.modal-card_close'),
  modalCardForm: document.querySelector('.modal-card-form'),
};

refs.openModalCardBtn.addEventListener('click', openModalCard);
refs.closeModalCardBtn.addEventListener('click', closeModalCard);

let isModalOpen = false;

function openModalCard() {
  if (!isModalOpen) {
    toggleModal();
    fetchBook();
    isModalOpen = true;
  }
}

function closeModalCard() {
  toggleModal();
  clearModalContent();
}

function toggleModal() {
  document.body.classList.toggle('modal-open');
  refs.modalCard.classList.toggle('is-hidden');
}

function clearModalContent() {
  refs.modalCard.innerHTML = '';
}

const renderBooks = (data, refs) => {
  const amazonLink = data.buy_links.find(link => link.name === 'Amazon');
  const bookshopLink = data.buy_links.find(link => link.name === 'Bookshop');
  const appleBooksLink = data.buy_links.find(
    link => link.name === 'Apple Books'
  );

  const bookElMarkup = `
    <img class="modal-card_img" src="${data.book_image}" alt="${data.title}" />
    <h3 class="modal-card_title">${data.title}</h3>
    <p class="modal-card_author">${data.author}</p>
    <p class="modal-card_desq">${data.description}</p>
    <ul class="shopping-list-links"> 
      <li><a href="${amazonLink.url}">${amazonLink.name}</a></li>
      <li><a href="${bookshopLink.url}">${bookshopLink.name}</a></li>
      <li><a href="${appleBooksLink.url}">${appleBooksLink.name}</a></li>
    </ul>
    <button class="add-shopping-list" type="button">Add to Shopping List</button>

  `;

  refs.modalCard.insertAdjacentHTML('beforeend', bookElMarkup);
};

const URL_API = 'https://books-backend.p.goit.global/books/';
// const bookId = '643282b1e85766588626a0dc';
const bookId = '643282b1e85766588626a085';


function fetchBook() {
  axios
    .get(`${URL_API}${bookId}`)
    .then(response => {
      const data = response.data;
      renderBooks(data, refs);
      console.log({ data });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

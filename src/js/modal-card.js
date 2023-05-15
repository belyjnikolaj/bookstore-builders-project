import axios from 'axios';
import { BookAPI } from './booksApi';

console.log({ BookAPI });

const bookApi = new BookAPI();

const URL_API = 'https://books-backend.p.goit.global/books/';
// const bookId = '643282b1e85766588626a0dc';
const bookId = '643282b1e85766588626a085';

const refs = {
  openModalCardBtn: document.querySelector(
    'button[name="data-modal-card-open"]'
  ),
  // modalCard: document.querySelector('#data-modal-card'),
  modalCard: document.querySelector('.modal-card'),

  closeModalCardBtn: document.querySelector('.modal-card_close'),
};

refs.openModalCardBtn.addEventListener('click', openModalCard);
refs.closeModalCardBtn.addEventListener('click', closeModalCard);

let isModalOpen = false;

function openModalCard() {
  if (!isModalOpen) {
    toggleModal();
    const data = bookApi
      .fetchBook(bookId)
      .then(data => renderBooks(data, refs))
      .catch(e => console.log(e));
    // console.log({ data });
    // renderBooks(data, refs);

    isModalOpen = true;
    refs.openModalCardBtn.style.display = 'none';
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
  const book = data.data;
  const amazonLink = book.buy_links.find(link => link.name === 'Amazon');
  const bookshopLink = book.buy_links.find(link => link.name === 'Bookshop');
  const appleBooksLink = book.buy_links.find(
    link => link.name === 'Apple Books'
  );

  const bookElMarkup = `
  <div class="modal-card-div">
  <img class="modal-card_img" src="${book.book_image}" alt="${book.title}" />
  <div class="modal-card-info">

  <h3 class="modal-card_title">${book.title}</h3>
  <p class="modal-card_author">${book.author}</p>
  <p class="modal-card_desq">${book.description}</p>
  <ul class="shopping-list-links"> 
  <li>
  <a href="${amazonLink.url}">
    ${amazonLink.name}
    <img class="img-amazon" src="./images/modal-card-icon.png" alt="">
  </a>
</li>
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
  if (event.key === 'Escape') {
    closeModalCard();
  }
});

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

// const refs = {
//   openModalCardBtn: document.querySelector('button[name="data-modal-card-open"]'),
//   modalCardBackDrop: document.querySelector('.modal-card_backdrop'),
//   modalCard: document.querySelector('.modal-card'),
//   closeModalCardBtn: document.querySelector('.modal-card_close'),
// };

// function openModalCard() {
//   if (!isModalOpen) {
//     refs.modalCardBackDrop.style.display = 'block';
//     refs.modalCard.style.display = 'block';
//     const data = bookApi
//       .fetchBook(bookId)
//       .then((data) => renderBooks(data, refs))
//       .catch((e) => console.log(e));

//     isModalOpen = true;
//     refs.openModalCardBtn.style.display = 'none';
//   }
// }

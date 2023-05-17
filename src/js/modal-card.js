import axios from 'axios';
import { BookAPI } from './booksApi';

import sprite from '../images/sprite.svg';

import amazonIcone from '../images/shopping-list/amazon-icon.png';
import amazonXIcone from '../images/shopping-list/amazon-icon@2x.png';
import appleIcone from '../images/shopping-list/apple-icon.png';
import appleXIcone from '../images/shopping-list/apple-icon@2x.png';
import bookshopIcone from '../images/shopping-list/bookshop-icon.png';
import bookshopXIcone from '../images/shopping-list/bookshop-icon@2x.png';

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

// const renderBooks = (data, refs) => {
//   const book = data.data;
//   const amazonLink = book.buy_links.find(link => link.name === 'Amazon');
//   const bookshopLink = book.buy_links.find(link => link.name === 'Bookshop');
//   const appleBooksLink = book.buy_links.find(
//     link => link.name === 'Apple Books'
//   );
//   console.log({ book });
//   const bookElMarkup = `
//   <div class="modal-card-div">
//   <img class="modal-card_img" src="${book.book_image}" alt="${book.title}" />
//   <div class="modal-card-info">
//   <h3 class="modal-card_title">${book.title}</h3>
//   <p class="modal-card_author">${book.author}</p>
//   <p class="modal-card_desq">${book.description}</p>
//   <ul class="shopping-list-links">
//     <li><a href="${amazonLink.url}">${amazonLink.name}
//     <picture>
//     <source
//       srcset="
//     ${amazonIcone}   1x,
//     ${amazonXIcone} 2x
//   "
//       type="image/png"
//     />
//     <img class="amazon-icon" src="${amazonIcone} " alt="Amazon" />
//   </picture></a></li>
//     <li><a href="${bookshopLink.url}">${bookshopLink.name}
//     <picture>
//     <source
//       srcset="
//   ${appleIcone}  1x,
//   ${appleXIcone} 2x
//   "
//       type="image/png"
//     />
//     <img class="apple-icon" src="${appleIcone}  " alt="Apple" />
//   </picture></a></li>
//     <li><a href="${appleBooksLink.url}">${appleBooksLink.name}
//         <picture>
//         <source
//           srcset="
//       ${bookshopIcone}   1x,
//       ${bookshopXIcone} 2x
//       "
//           type="image/png"
//         />
//         <img class="apple-icon" src="${bookshopIcone}  " alt="Bookshop" />
//       </picture>
//     </a></li>
//   </ul>
//   </div>
//   </div>
//   <div class="button-shopping">
//   <button class="button-add-shopping-list btn-modal-card" type="button">Add to Shopping List</button>
//   </div>
//   `;

//   refs.modalCard.insertAdjacentHTML('beforeend', bookElMarkup);
// };

const renderBooks = (data, refs) => {
  const book = data.data;
  const amazonLink = book.buy_links.find(link => link.name === 'Amazon');
  const bookshopLink = book.buy_links.find(link => link.name === 'Bookshop');
  const appleBooksLink = book.buy_links.find(
    link => link.name === 'Apple Books'
  );
  console.log({ book });
  const bookElMarkup = `
    <div class="modal-card-div">
      <img class="modal-card_img" src="${book.book_image}" alt="${book.title}" />
      <div class="modal-card-info">
        <h3 class="modal-card_title">${book.title}</h3>
        <p class="modal-card_author">${book.author}</p>
        <p class="modal-card_desq">${book.description}</p>
        <ul class="shopping-list-links"> 
          <li shopping-list-links_item>
            <a class="shopping-list-links_icon href="${amazonLink.url}">
              <picture>
                <source
                  srcset="${amazonIcone} 1x, ${amazonXIcone} 2x"
                  type="image/png"
                />
                <img class="amazon-icon" src="${amazonIcone}" alt="Amazon" />
              </picture>
            </a>
          </li>
          <li>
            <a href="${bookshopLink.url}">
              <picture>
                <source
                  srcset="${appleIcone} 1x, ${appleXIcone} 2x"
                  type="image/png"
                />
                <img class="apple-icon" src="${appleIcone}" alt="Apple" />
              </picture>
            </a>
          </li>
          <li>
            <a href="${appleBooksLink.url}">
              <picture>
                <source
                  srcset="${bookshopIcone} 1x, ${bookshopXIcone} 2x"
                  type="image/png"
                />
                <img class="apple-icon" src="${bookshopIcone}" alt="Bookshop" />
              </picture>
            </a>
          </li>
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

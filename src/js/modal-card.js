import axios from 'axios';

const refs = {
  openModalCardBtn: document.querySelector(
    'button[name="data-modal-card-open"]'
  ),
  modalCard: document.querySelector('#data-modal-card'),
  closeModalCardBtn: document.querySelector('.modal-card_close'),
};

// refs.openModalCardBtn.addEventListener('click', onclick);
// refs.modalCard.addEventListener('click', toggleModal);

// function toggleModal() {
//     document.body.classList.toggle('modal-open');
//     refs.modalCard.classList.toggle('is-hidden');
//   }

const renderBooks = (data, refs) => {
  const bookElMarkup = `
    <img src="${data.book_image}" alt="${data.title}" />
    <h3 class="modal-card_title">${data.title}</h3>
    <p class="modal-card_subtitle">${data.author}</p>
    <p class="modal-card_desq">${data.description}</p>
    <ul> 
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
      <li><a href="#">Link 3</a></li>
    </ul>
  `;

  refs.modalCard.insertAdjacentHTML('beforeend', bookElMarkup);
};

const URL_API = 'https://books-backend.p.goit.global/books/';
const bookId = '643282b1e85766588626a0dc';

const fetchBook = fetch(`${URL_API}${bookId}`)
  .then(data => data.json())
  .then(data => {
    renderBooks(data, refs);
    console.log({ data });
  })
  .catch(error => {
    console.log('Error:', error);
  });

console.log(renderBooks);

export { modalCard };

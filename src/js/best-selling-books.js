import Notiflix from 'notiflix';
import axios from 'axios';

const bestSellersGal = document.querySelector('.js-best-sellers');


async function fetchBestSellers() {
  // const BASE_URL = 'https://books-backend.p.goit.global/';
  // const END_POINT = `books/top-books`;
  const resp = await axios.get(`https://books-backend.p.goit.global/books/top-books`).then(response => response.data);
   return resp;
}

 fetchBestSellers().then(data => {
   console.log(data);
})
  .catch(error => {
       console.log(error);
  Notiflix.Notify.failure('Oops, there is error');
  });

  function markupBooksList(data) {
    console.log(data);
    data.map(obj => {
      const { list_name, books } = obj;
      const bookCard = books.map(book => {
        markupBookCard(book);
        console.log(book);
    });
    return `<div>
            <h3">${list_name}</h3>
                 <ul>${bookCard}
                </ul>
              <button>see more</button>
        </div>`});
  
function markupBookCard(book) {
   const { author, book_image, title, _id, } = book;
      return `<li><a>
    <img src="${book_image}" alt="${author} ${title}" loading="lazy">
    <div>
    <p class="info-item__title">${title}</p>
    <p class="info-item__author">${author}</p>
    <p visually-hidden">${_id}</p>
    </div>
    </a>
    </li>`;
    };

  };
export { createHero };
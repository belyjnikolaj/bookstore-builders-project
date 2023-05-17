import { fetchBestSellers } from '/src/js/best-selling-books';
import {
  displayBooksAndHighlightLastWord,
  truncateTextToFitOneLine,
} from '/src/js/helpers';

const categoriesList = document.querySelector('.categories');
const bestSellers = document.querySelector('.js-best-sellers');
const booksElement = document.querySelector('.books');
const booksHeroTitleElement = document.querySelector(
  '.books_hero_title--color_accent'
);

booksHeroTitleElement.addEventListener('click', () => {
  const bestSellersElement = document.querySelector('.js-best-sellers');
  bestSellersElement.classList.add('active');
});

async function fetchCategories() {
  try {
    const categories = await getCategories();
    displayCategories(categories);

    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
      await displayBooksByCategory(selectedCategory);
    }

    addEventListeners();
    truncateBookTitle();
  } catch (error) {
    console.log(error.message);
  }
}

async function getCategories() {
  const response = await fetch(
    'https://books-backend.p.goit.global/books/category-list'
  );
  return response.json();
}

async function displayBooksByCategory(category) {
  const books = await getBooksByCategory(category);
  displayBooksAndHighlightLastWord(books, category);
  bestSellers.innerHTML = '';

  booksElement.classList.add('active');

  // Додайте виклик truncateTextToFitOneLine після додавання .book-card до DOM
  const bookCard = document.querySelector('.book-card');
  const truncatedTitle = truncateTextToFitOneLine(
    bookCard.querySelector('.info-title__item').textContent
  );
  // Використовуйте truncatedTitle для потрібних дій
}

async function getBooksByCategory(category) {
  const response = await fetch(
    `https://books-backend.p.goit.global/books/category?category=${category}`
  );
  return response.json();
}

function displayCategories(categories) {
  categoriesList.insertAdjacentHTML(
    'beforeend',
    createMarkupCategories(categories)
  );
}

function createMarkupCategories(arr) {
  const sortedCategories = arr.sort((a, b) =>
    a.list_name.localeCompare(b.list_name)
  );

  const categoriesHTML = sortedCategories
    .map(({ list_name }) => `<li class="list_name">${list_name}</li>`)
    .join('');

  return `<ul>
            <li class="list_name js-all-categories">All categories</li>
            ${categoriesHTML}
          </ul>`;
}

function createMarkupBooks(arr) {
  return arr
    .map(({ book_image, title, author }) => {
      const truncatedTitle = truncateTextToFitOneLine(title);
      return ` <a href="#" class="modal_popap" target="_self">
          <div class="book-card">
              <div class="book-card__img-box">
                <img class="book-card__img"src="${book_image}" alt="${title}" loading="lazy"/>
              </div> 
              <div class="info">
                  <h3 class="info-title__item">${truncatedTitle}</h3>
                  <p class="info-author__item">${author}</p>             
              </div>
          </div>
      </a>`;
    })
    .join('');
}


function addEventListeners() {
  categoriesList.addEventListener('click', async event => {
    if (event.target.classList.contains('js-all-categories')) {
      await fetchBestSellers();
    }
  });

  categoriesList.addEventListener('click', async event => {
    if (event.target.classList.contains('list_name')) {
      localStorage.setItem('selectedCategory', event.target.textContent);
      await displayBooksByCategory(event.target.textContent);
    }
  });

  //   booksElement.addEventListener('click', event => {
  //     if (event.target.classList.contains('modal_popap')) {
  //       const bookTitle =
  //         event.target.querySelector('.info-title__item').textContent;
  //       const bookAuthor =
  //         event.target.querySelector('.info-author__item').textContent;
  //       showModal(bookTitle, bookAuthor);
  //     }
  //   });
}

categoriesList.addEventListener('click', event => {
  if (event.target.classList.contains('list_name')) {
    const categoryItems = categoriesList.querySelectorAll('.list_name');
    categoryItems.forEach(item => {
      item.classList.remove('selected');
    });

    const selectedCategory = event.target;
    selectedCategory.classList.add('selected');
    localStorage.setItem('selectedCategory', selectedCategory.textContent);
  }
});

addEventListeners(); // додаємо прослуховувачів подій

export { fetchCategories, createMarkupBooks, displayBooksByCategory };

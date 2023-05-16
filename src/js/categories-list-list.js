import { fetchBestSellers } from './best-selling-books';

const allCategories = document.querySelector('.js-all-categories');
allCategories.addEventListener('click', fetchBestSellers);
async function fetchCategories() {
  try {
    const categories = await getCategories();
    displayCategories(categories);

    let selectedCategory = localStorage.getItem('selectedCategory');

    if (!selectedCategory && categories.length > 0) {
      // Якщо немає збереженого значення, вибрати першу групу зі списку
      selectedCategory = categories[0].list_name;
      localStorage.setItem('selectedCategory', selectedCategory);
    }

    await displayBooksByCategory(selectedCategory);

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
  displayBooks(books, category);
}

async function getBooksByCategory(category) {
  const response = await fetch(
    `https://books-backend.p.goit.global/books/category?category=${category}`
  );
  return response.json();
}

function displayCategories(categories) {
  const categoriesList = document.querySelector('.categories');
  categoriesList.insertAdjacentHTML(
    'beforeend',
    createMarkupCategories(categories)
  );
}

function displayBooks(books, selectedCategory) {
  const booksList = document.querySelector('.books');
  booksList.innerHTML = '';
  booksList.insertAdjacentHTML('beforeend', createMarkupBooks(books));

  const categoryName = document.querySelector('.name__categore-box');
  categoryName.innerHTML = `<h2 class="name__categore">${highlightLastWord(
    selectedCategory
  )}</h2>`;
}

function addEventListeners() {
  const categoriesList = document.querySelector('.categories');
  categoriesList.addEventListener('click', async event => {
    if (event.target.classList.contains('list_name')) {
      const selectedCategory = event.target.textContent;
      localStorage.setItem('selectedCategory', selectedCategory);
      await displayBooksByCategory(selectedCategory);
    }
  });
}
const bestSellers = document.querySelector('.js-best-sellers');

function createMarkupCategories(arr) {
  const sortedCategories = arr.sort((a, b) =>
    a.list_name.localeCompare(b.list_name)
  );

  return sortedCategories
    .map(({ list_name }) => {
      return `<ul>
                  <li class="list_name">${list_name}</li>
                </ul>`;
    })
    .join('');
}

function createMarkupBooks(arr) {
  return arr
    .map(({ book_image, title, author }) => {
      const truncatedTitle = truncateTextToFitOneLine(title, 200);
      //    bestSellers.innerHTML = '';
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

function highlightLastWord(str) {
  const words = str.split(' ');
  words[words.length - 1] = `<span style="color: #4F2EE8">${
    words[words.length - 1]
  }</span>`;
  return words.join(' ');
}
async function fetchCategories() {
  try {
    const categories = await getCategories();
    displayCategories(categories);

    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
      await displayBooksByCategory(selectedCategory);
    }

    addEventListeners();
    truncateBookTitle(); // додано виклик функції truncateBookTitle
  } catch (error) {
    console.log(error.message);
  }
}
function truncateTextToFitOneLine(text, maxWidth) {
  const ellipsis = '...';
  const bookCardWidth = document
    .querySelector('.book-card ')
    .getBoundingClientRect().width;
  let truncatedText = text;
  while (
    truncatedText.length > 0 &&
    getTextWidth(truncatedText) > bookCardWidth
  ) {
    truncatedText = truncatedText.slice(0, -1);
  }
  if (truncatedText.length < text.length) {
    truncatedText = truncatedText.slice(0, -3) + ellipsis;
  }
  return truncatedText;
}

function getTextWidth(text) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = window
    .getComputedStyle(document.body)
    .getPropertyValue('font');
  return context.measureText(text).width;
}
function addEventListeners() {
  const categoriesList = document.querySelector('.categories');
  const allCategoriesButton = document.querySelector('.js-all-categories');

  allCategoriesButton.addEventListener('click', async () => {
    await fetchBestSellers();
  });

  categoriesList.addEventListener('click', async event => {
    if (event.target.classList.contains('list_name')) {
      localStorage.setItem('selectedCategory', event.target.textContent);
      await displayBooksByCategory(event.target.textContent);
    }
  });
}

addEventListeners(); // додаємо прослуховувачів подій

fetchCategories();

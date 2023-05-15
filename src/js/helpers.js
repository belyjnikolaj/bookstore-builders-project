import { createMarkupBooks } from './categories-list-list';
  const categoryName = document.querySelector('.name__categore-box');
  const booksList = document.querySelector('.books');
//
// function displayBooks(books, selectedCategory) {
//   const categoryName = document.querySelector('.name__categore-box');
//   const booksList = document.querySelector('.books');
//   booksList.innerHTML = '';
//   booksList.insertAdjacentHTML('beforeend', createMarkupBooks(books));

//   categoryName.innerHTML = `<h2 class="name__categore">${highlightLastWord(
//     selectedCategory
//   )}</h2>`;
// }
// function highlightLastWord(str) {
//   const words = str.split(' ');
//   words[words.length - 1] = `<span style="color: #4F2EE8">${
//     words[words.length - 1]
//   }</span>`;
//   return words.join(' ');
// }

// Додає назву до групи та робить останнє слово іншим кольором
function displayBooksAndHighlightLastWord(books, selectedCategory) {
  booksList.innerHTML = '';
  booksList.insertAdjacentHTML('beforeend', createMarkupBooks(books));

  const words = selectedCategory.split(' ');
  words[words.length - 1] = `<span style="color: #4F2EE8">${
    words[words.length - 1]
  }</span>`;
  const highlightedCategoryName = words.join(' ');

  categoryName.innerHTML = `<h2 class="name__categore">${highlightedCategoryName}</h2>`;
}


// function getTextWidth(text) {
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');
//   context.font = window
//     .getComputedStyle(document.body)
//     .getPropertyValue('font');
//   return context.measureText(text).width;
// }

// function truncateTextToFitOneLine(text) {
//   const bookCardWidth = document
//     .querySelector('.book-card')
//     .getBoundingClientRect().width;

//   const words = text.split(' ');
//   let truncatedText = '';
//   let currentWidth = 0;
//   for (let i = 0; i < words.length; i++) {
//     const word = words[i];
//     const wordWidth = getTextWidth(word + ' ');

//     if (currentWidth + wordWidth > bookCardWidth) {
//       truncatedText += '...';
//       break;
//     } else {
//       truncatedText += word + ' ';
//       currentWidth += wordWidth;
//     }
//   }

//   return truncatedText.trim();
// }
function truncateTextToFitOneLine(text) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = window
    .getComputedStyle(document.body)
    .getPropertyValue('font');

  const bookCardWidth = document
    .querySelector('.book-card')
    .getBoundingClientRect().width;

  const words = text.split(' ');
  let truncatedText = '';
  let currentWidth = 0;
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const wordWidth = context.measureText(word + ' ').width;

    if (currentWidth + wordWidth > bookCardWidth) {
      truncatedText += '...';
      break;
    } else {
      truncatedText += word + ' ';
      currentWidth += wordWidth;
    }
  }
  return truncatedText.trim();
}






export { displayBooksAndHighlightLastWord, truncateTextToFitOneLine };

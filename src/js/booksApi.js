import axios from 'axios';

export class BookAPI {
    
    #BASE_URL = 'https://books-backend.p.goit.global/books';
    #CATEGORY_LIST = '/category-list';
    #TOP_BOOKS = '/top-books';
 
  async fetchCategoriesList() {
    return await axios.get(`${this.#BASE_URL}${this.#CATEGORY_LIST}`);
  }

 async fetchTopBooks() {
    return await axios.get(`${this.#BASE_URL}${this.#TOP_BOOKS}`);
  }
  async fetchBook(bookId) {
    console.log({ bookId });
    return await axios.get(`${this.#BASE_URL}/${bookId}`);
  }
}



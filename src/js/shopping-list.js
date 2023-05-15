import axios from 'axios';



import sprite from '../images/sprite.svg';

import amazonIcone from '../images/shopping-list/amazon-icon.png'
import amazonXIcone from '../images/shopping-list/amazon-icon@2x.png'
import appleIcone from '../images/shopping-list/apple-icon.png'
import appleXIcone from '../images/shopping-list/apple-icon@2x.png'
import bookshopIcone from '../images/shopping-list/bookshop-icon.png'
import bookshopXIcone from '../images/shopping-list/bookshop-icon@2x.png'

const shoppingListMarkup (arr, category){
    return arr.map(({book_image, title, description, author, amazon_product_url,
        buy_links: [amazon, apple, , , bookshop]}) => {
        return `<li class="js-card card-shopping">
                    <div class="card-shopping__container">
                         <img src="${book_image}" alt="${title}" class="card-shopping__image" />
                         <div class="card-shopping__thumb">
                          <h2 class="card-shopping__title">${title}</h2>
                          <h3 class="card-shopping__category">${category}</h3>
                            <p class="card-shopping__description">${description}</p>
                            <div class="card-shopping__author-links">
                                <p class="card-shopping__author">${author}</p>
                                <ul class="card-shopping__listLinks">
                                    <li class="card-shopping__listItem">
                                        <a href="${amazon_product_url}" class="card-shopping__link">
                                        <picture>
                                        <source
                                          srcset="
                                            ${amazonIcone}   1x,
                                            ${amazonXIcone} 2x
                                          "
                                          type="image/png"
                                        />
                                        <img
                                          class="amazon-icon"
                                          src="${amazonIcone} "
                                          alt="Amazon"
                                        />
                                      </picture></a>
                                    </li>
                                    <li class="card-shopping__listItem">
                                        <a href="${apple.url}" class="card-shopping__link">
                                        <picture>
                                        <source
                                          srcset="
                                          ${appleIcone}  1x,
                                          ${appleXIcone} 2x
                                          "
                                          type="image/png"
                                        />
                                        <img
                                          class="apple-icon"
                                          src="${appleIcone}  "
                                          alt="Apple"
                                        />
                                      </picture></a>
                                    </li>
                                    <li class="card-shopping__listItem">
                                        <a href="${bookshop.url}" class="card-shopping__link">
                                        <picture>
                                        <source
                                          srcset="
                                          ${bookshopIcone}   1x,
                                          ${bookshopXIcone} 2x
                                          "
                                          type="image/png"
                                        />
                                        <img
                                          class="apple-icon"
                                          src="${bookshopIcone}  "
                                          alt="Bookshop"
                                        />
                                      </picture></a>
                                    </li>
                                </ul>
                             </div>
                         </div>
                         <button class="card-shopping__deleteBtn">
                         <svg class="card-shoppin__deleteBtn--icon">
                            <use href="${sprite}#icon-delete"></use>
                         </svg>
                     </button>
                    </div>`
    })
};
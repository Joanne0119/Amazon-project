import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from "./utils/money.js";

let productHTML = '';
products.forEach((product) => {
  productHTML += `        
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${formatCurrency(product.priceCents)} 
      <!--toFixed() 特定小數點表示-->
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>`;
})

document.querySelector('.js-product-grid').innerHTML = productHTML;

let addedTimeIds = {};
//have two timeout ids
//one is to make sure this product be called or not
//the other is to clear the timeout

function addedToCartMessage(productId)
{
  const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`)
  addedToCart.classList.add('added-to-cart-visable');

  setTimeout(() => {
    const previousTimeoutId = addedTimeIds[productId];
    if(previousTimeoutId){
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedToCart.classList.remove('added-to-cart-visable'); 
    }, 2000);

    addedTimeIds[productId] = timeoutId;
  });

}

function updateCartQuantity()
{
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

updateCartQuantity();

document.querySelectorAll('.js-add-to-cart-btn')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset;
      const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      
      addedToCartMessage(productId);
      addToCart(productId, quantity);
      updateCartQuantity();      
    })
  })
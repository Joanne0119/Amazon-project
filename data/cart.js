export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionsId: '1'
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
  deliveryOptionsId: '2'
}];

function saveToStorage()
{
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity)
{
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId)
    {
      matchingItem = cartItem;
    }
  })

  if(matchingItem)
  {
    matchingItem.quantity += quantity;
  }
  else
  {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionsId: '1'
    })
  }

  saveToStorage();
}

export function removeFromCart(productId)
{
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId)
    {
      newCart.push(cartItem); 
    }
  });
  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity()
{
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity)
{
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId)
    {
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId)
    {
      matchingItem = cartItem;
    }
    console.log(cartItem);
    console.log(matchingItem);
  });
  matchingItem.deliveryOptionsId = deliveryOptionId;
  saveToStorage();
  console.log(cart);
}
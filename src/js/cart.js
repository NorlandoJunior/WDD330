import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");


  cartItems.forEach((item) => {
    const deleteButton = document.getElementById(`delete-${item.Id}`);
    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        deleteItem(item.Id);
      });
    }
  });
};

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button id="delete-${item.Id}" class="delete">X</button>
</li>`;

  return newItem;
}

function deleteItem(itemId) {
  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.filter((item) => item.Id !== itemId);

  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  renderCartContents();
}

renderCartContents();
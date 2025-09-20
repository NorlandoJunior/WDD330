// product.js
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();

const productId = getParam("product");
const dataSource = new ProductData();

async function init() {
  const product = await dataSource.findProductById(productId);

  document.getElementById("p-image").src = product.Images.PrimaryLarge;
  document.getElementById("p-image").alt = product.Name;
  document.getElementById("p-brand").textContent = product.Brand.Name;
  document.getElementById("p-name").textContent = product.NameWithoutBrand;
  document.getElementById("p-color").textContent = product.Colors.join(", ");
  document.getElementById("p-description").textContent = product.Description;
  document.getElementById("p-price").textContent = `$${product.FinalPrice}`;
  document.getElementById("add-to-cart").dataset.id = product.Id;
}

init();

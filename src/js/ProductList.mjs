// ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

// Template for a single product card
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/src/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData(this.category);
    this.renderList(products);
    // Update page title
    document.querySelector(".title").textContent =
      this.category.replace("-", " ");
  }

  renderList(products) {
    renderListWithTemplate(productCardTemplate, this.listElement, products);
  }
}

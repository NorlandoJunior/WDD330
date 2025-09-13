import { addToCart } from './cart.js';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Pega os detalhes do produto pelo ID
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      console.error("Produto não encontrado");
      return;
    }

    // Renderiza o produto na página
    this.renderProductDetails();

    // Adiciona listener ao botão Add to Cart
    const addButton = document.getElementById("addToCart");
    if (addButton) {
      addButton.addEventListener("click", () => this.handleAddToCart());
    }
  }

  handleAddToCart() {
    const productToSave = {
      id: this.product.Id,
      name: this.product.NameWithoutBrand || this.product.Name || "Unnamed Product",
      price: this.product.FinalPrice || 0,
      image: this.product.Image || ""
    };

    addToCart(productToSave);
    alert(`${productToSave.name} foi adicionado ao carrinho!`);
  }

  renderProductDetails() {
    const product = this.product;

    document.querySelector("h2").textContent = product.Brand?.Name || "Unknown Brand";
    document.querySelector("h3").textContent = product.NameWithoutBrand || product.Name || "Unnamed Product";

    const productImage = document.getElementById("productImage");
    if (productImage) {
      productImage.src = product.Image || "";
      productImage.alt = product.NameWithoutBrand || product.Name || "";
    }

    document.getElementById("productPrice").textContent = `$${product.FinalPrice || 0}`;
    document.getElementById("productColor").textContent = product.Colors?.[0]?.ColorName || "No color";
    document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple || "";

    // Adiciona atributos data para compatibilidade com cart.js
    const addButton = document.getElementById("addToCart");
    if (addButton) {
      addButton.dataset.id = product.Id;
      addButton.dataset.name = product.NameWithoutBrand || product.Name || "Unnamed Product";
      addButton.dataset.price = product.FinalPrice || 0;
      addButton.dataset.image = product.Image || "";
    }
  }
}

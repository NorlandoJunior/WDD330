import { loadHeaderFooter, getParam, renderListWithTemplate } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category"); // pode ser categoria ou termo de busca
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

// --- Search functionality ---
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

if (searchForm) {
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    // Clear previous list
    element.innerHTML = "";

    // Fetch products from API using search term
    const results = await dataSource.getData(query);

    if (results.length > 0) {
      renderListWithTemplate(listing.productCardTemplate, element, results, "afterbegin", true);
      document.querySelector(".title").textContent = `Search results for "${query}"`;
    } else {
      element.innerHTML = `<li>No products found for "${query}"</li>`;
      document.querySelector(".title").textContent = "Search results";
    }
  });
}

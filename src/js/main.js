import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter().then(() => {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        // Redirect to product listing page with search term
        window.location.href = `/product_listing/index.html?category=${encodeURIComponent(query)}`;
      }
    });
  }
});
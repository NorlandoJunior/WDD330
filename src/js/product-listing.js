// product-listing.js
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

// Get category from URL, default to 'tents'
const category = getParam("category") || "tents";
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

// Initialize product list
const listing = new ProductList(category, dataSource, listElement);
listing.init();

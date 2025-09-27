// A helper function for querySelector: returns the first matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// (Shorter arrow-function version if you prefer):
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// Get a value from localStorage and parse it from JSON
export function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.warn(`Error parsing localStorage key "${key}":`, err);
    return null;
  }
}

// Save a value to localStorage as JSON
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Simple alert message helper (can be replaced with custom modal later)
export function alertMessage(message, type = "info") {
  // For now, just use native alert
  alert(`[${type.toUpperCase()}] ${message}`);
}

// Add the same callback to both touchend and click events
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) return;
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

// Get a parameter from the query string in the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Render a list of items using a template function
export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(template);
  // If clear is true, empty the parent element first
  if (clear) parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Render a single template string into a parent element
// Optionally run a callback after rendering
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

// Private helper: load an HTML file as text
async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load template: ${path}`);
  return await res.text();
}

// Load header and footer HTML fragments into the page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

//Wishlist helpers

// Get wishlist from localStorage (returns an array)
export function getWishlist() {
  return getLocalStorage("wishlist") || [];
}

// Add a product to the wishlist
export function addToWishlist(product) {
  const wishlist = getWishlist();
  // Avoid duplicates
  if (!wishlist.some(item => item.id === product.id)) {
    wishlist.push(product);
    setLocalStorage("wishlist", wishlist);
    alertMessage("Added to wishlist!", "success");
  } else {
    alertMessage("Product already in wishlist", "warning");
  }
}

// Remove a product from the wishlist
export function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(item => item.id !== productId);
  setLocalStorage("wishlist", wishlist);
  alertMessage("Removed from wishlist", "info");
}

// Check if a product is in the wishlist
export function isInWishlist(productId) {
  return getWishlist().some(item => item.id === productId);
}

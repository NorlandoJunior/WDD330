import { getLocalStorage, alertMessage } from "./utils.mjs"; // make sure alertMessage is exported
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// … your formDataToJSON and packageItems stay the same …

export default class CheckoutProcess {
  // … your constructor and other methods stay the same …

  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    try {
      const response = await services.checkout(order);

      // Success: clear cart and redirect to success page
      localStorage.removeItem(this.key); // clear the cart
      window.location.href = "/src/checkout/success.html";
    } catch (err) {
      // Error: show user a message
      if (err.name === "servicesError") {
        // err.message contains the JSON body returned by the server
        // choose an appropriate field from it, e.g. err.message.error or err.message.message
        alertMessage(
          err.message.error || err.message.message || "Something went wrong with your order"
        );
      } else {
        alertMessage("Unexpected error. Please try again later.");
      }
      console.error(err); // keep for debugging
    }
  }
}

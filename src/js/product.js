import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();
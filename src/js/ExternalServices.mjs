const baseURL = import.meta.env.VITE_SERVER_URL;

// refactored to always parse the body as JSON and throw a custom object on error
async function convertToJson(res) {
  const jsonResponse = await res.json(); // always read the body

  if (res.ok) {
    return jsonResponse; // if everything is ok
  } else {
    // if there is an error, throw a custom object so our catch can handle it
    throw {
      name: "servicesError",
      message: jsonResponse // the error body from the server
    };
  }
}

export default class ExternalServices {
  constructor() {
    // you can keep any setup you need here
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    // convertToJson now either returns JSON or throws our custom object
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}

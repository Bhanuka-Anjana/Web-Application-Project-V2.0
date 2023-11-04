import http from "./httpService";

const apiEndpoint = "http://localhost:8080/api/products";

export async function getProducts() {
  return await http.get(apiEndpoint);
}

export function getProduct(productId) {
  return http.get(`${apiEndpoint}/${productId}`);
}

export function saveProduct(product) {
  if (product._id) {
    const body = { ...product };
    delete body._id;
    return http.put(`${apiEndpoint}/${product._id}`, body);
  }

  return http.post(apiEndpoint, product);
}

export function deleteProduct(productId) {
  return http.delete(`${apiEndpoint}/${productId}`);
}

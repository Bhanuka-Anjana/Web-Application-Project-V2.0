import http from "./httpService";

const apiEndpoint = "http://localhost:8080/api/orders";

export function getOrders() {
  //return http.get(apiEndpoint + "/");
}

export function getorder(orderId) {
  return http.get(`${apiEndpoint}/${orderId}`);
}

export function saveOrder(order) {
  if (order._id) {
    const body = { ...order };
    delete body._id;
    return http.put(`${apiEndpoint}/${order._id}`, body);
  }

  return http.post(apiEndpoint, order);
}

export function deleteOrder(orderId) {
  return http.delete(`${apiEndpoint}/${orderId}`);
}

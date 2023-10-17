import http from "./httpService";

export function getCategories() {
  return http.get("http://localhost:8080/api/categories");
}
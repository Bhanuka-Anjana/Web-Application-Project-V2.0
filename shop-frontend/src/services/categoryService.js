import http from "./httpService";

export async function getCategories() {
  return await http.get("http://localhost:8080/api/categories",{withCredentials:true});
}

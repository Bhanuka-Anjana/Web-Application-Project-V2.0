
import http from "./httpService";

const apiEndpoint = "http://localhost:8080/api/users";

export async function registerUser(user) {
  return await http.post(apiEndpoint, {
    firstName: user.firstName,
    lastName: user.lastName,
    imgURL: user.imgURL,
    email: user.email,
    password: user.password,
  });
}
export async function getUsers() {
  return await http.get(apiEndpoint);
}
export function getUser(userId) {
  return http.get(`${apiEndpoint}/${userId}`, {
    "Content-Type": "application/json",
    "x-auth-token": ``,
  });
}
export function deleteUser(userId) {
  return http.delete(`${apiEndpoint}/${userId}`, {
    "Content-Type": "application/json",
    "x-auth-token": ``,
  });
}
export function saveUser(user) {
  if (user._id) {
    const body = { ...user };
    delete body._id;
    return http.put(`${apiEndpoint}/${user._id}`, body);
  }

  return http.post(apiEndpoint, user);}

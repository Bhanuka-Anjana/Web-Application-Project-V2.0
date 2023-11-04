import http from "./httpService";

const apiEndpoint = "http://localhost:8080/api/auth";

export async function login(email, password) {
  try {
    const { status } = await http.post(`${apiEndpoint}/local`, {
      email,
      password,
    });
    return status === 200 ? true : false;
  } catch (err) {
    console.log("eorrrooo", err);
  }
}

export async function loginWithGmail() {
  const { data } = await http.get(`${apiEndpoint}/google/login`);
  return data;
}

export async function logout() {
  await http.post(`${apiEndpoint}/logout`);
}

export async function getCurrentUser() {
  return await http.get(`${apiEndpoint}/me`);
}

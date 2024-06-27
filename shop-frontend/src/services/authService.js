import HTTP from "./httpService";
import { toast } from "react-toastify";

const apiEndpoint = "/auth";

export async function login(email, password) {
  try {
    const response = await HTTP.post(`${apiEndpoint}/login`, {
      email,
      password,
    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successful");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
}

export async function loginWithGmail() {
  const { data } = await HTTP.get(`${apiEndpoint}/google/login`);
  return data;
}

export async function logout() {
  try {
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    return true;
  } catch (error) {
    return false;
  }
}

export async function getCurrentUser() {
  try {
    // get the token
    const token = localStorage.getItem("token");
    // if no token return null
    if (!token) return null;
    // return the current user
    const response = await HTTP.get(`${apiEndpoint}/me`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    toast.error(error.response.data.message);
    return null;
  }
}

export async function register(user) {
  try {
    const response = await HTTP.post(`${apiEndpoint}/register`, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      toast.success("Registration Successful");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
}

export async function updateProfile(id, data) {
  try {
    const response = await HTTP.put(`${apiEndpoint}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      toast.success("Profile Update Successful");
      return response.data;
    } else {
      toast.error("Profile Update Failed");
      return null;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    return null;
  }
}

export async function deleteUser(id) {
  try {
    const response = await HTTP.delete(`${apiEndpoint}/${id}`);
    if (response) {
      if (response.status === 200) {
        toast.success("User Deleted Successfully");
        return id;
      } else {
        toast.error(response.data.message);
        return null;
      }
    }
  } catch (error) {
    toast.error(error.response.data.message);
    return null;
  }
}

export async function getAllUsers() {
  try {
    const response = await HTTP.get(`${apiEndpoint}/getall`);
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.data;
    }
    return [];
  } catch (error) {
    return [];
  }
}

export async function setAdminFetch(id) {
  try {
    const response = await HTTP.put(`${apiEndpoint}/setadmin/${id}`);

    if (response) {
      console.log(response);
      if (response.status === 200) {
        toast.success("User Role Updated Successfully");
        return response.data.response;
      }
    }
    return null;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    return null;
  }
}

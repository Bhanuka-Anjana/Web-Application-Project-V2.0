import HTTP from "./httpService";
import { toast } from "react-toastify";

const baseURL = "categories";

export async function getCategories() {
  try {
    const response = await HTTP.get(`${baseURL}/getall`);
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error(response.data.message);
      return null;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    return null;
  }
}

export async function createCategory(category) {
  try {
    const response = await HTTP.post(`${baseURL}`, category);
    if (response.status === 201) {
      toast.success(response.data.message);
      return response.data.response;
    } else {
      toast.error(response.data.message);
      return null;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    return null;
  }
}

export async function updateCategory(id, data) {
  try {
    const response = await HTTP.put(`${baseURL}/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.data.response;
    } else {
      toast.error(response.data.message);
      return null;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    return null;
  }
}

export async function deleteCategory(id) {
  try {
    const response = await HTTP.delete(`${baseURL}/${id}`);
    if (response) {
      if (response.status === 200) {
        toast.success(response.data.message);
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

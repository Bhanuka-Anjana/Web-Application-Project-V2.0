import { toast } from "react-toastify";
import HTTP from "./httpService";

const baseURL = "products";

export async function getProducts() {
  try {
    const response = await HTTP.get(`${baseURL}/getall`);
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error(response.data.message);
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    return null;
  }
}

export async function createProduct(product) {
  try {
    const response = await HTTP.post(`${baseURL}/`, product, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 201) {
      toast.success(response.data.message);
      return response.data?.response;
    } else {
      toast.error(response.data.message);
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    return null;
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await HTTP.delete(`${baseURL}/${productId}`);
    if (response.status === 200) {
      toast.success(response.data.message);
      return productId;
    } else {
      toast.error(response.data.message);
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    return null;
  }
}

export async function updateProduct(id, product) {
  try {
    const response = await HTTP.put(`${baseURL}/${id}`, product, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response) {
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data.response;
      } else {
        toast.error(response.data.message);
        return null;
      }
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    return null;
  }
}

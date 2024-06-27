import HTTP from "./httpService";
import { toast } from "react-toastify";

const apiEndpoint = "/orders";

export async function getOrders() {
  try {
    const response = await HTTP.get(apiEndpoint);
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    toast.error("Error fetching orders");
    return [];
  }
}

export async function createOrder(order) {
  try {
    const response = await HTTP.post(apiEndpoint, order);
    if (response.status === 201) {
      toast.success("Order placed successfully");
      return response.data.response;
    } else {
      return null;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    return null;
  }
}

export async function deleteOrder(orderId) {
  try {
    const response = await HTTP.delete(`${apiEndpoint}/${orderId}`);
    if (response.status === 200) {
      toast.success("Order deleted successfully");
      return orderId;
    } else {
      toast.error("Error deleting order");
      return null;
    }
  } catch (error) {
    toast.error("Error deleting order");
    return null;
  }
}

export async function updateOrderDetails(id, data) {
  try {
    const response = await HTTP.put(`${apiEndpoint}/${id}`, data);
    if (response.status === 200) {
      return response.data.response;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function updateOrderStatus(id, status) {
  try {
    const response = await HTTP.put(`${apiEndpoint}/status/${id}`, { status });
    if (response) {
      if (response.status === 200) {
        toast.success("Order status updated successfully");
        return response.data.response;
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
}

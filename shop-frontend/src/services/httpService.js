import axios from "axios";
import { toast } from "react-toastify";

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    toast.success(response.data["message"]);
    return response;
  },
  (error) => {
    //alert("hellow");
    //console.log(error.response.data["message"]);
    if(error.response.data) return toast.error(error.response.data["message"]);
    //return Promise.reject(error);
  }
);

axios.defaults.withCredentials = true;

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

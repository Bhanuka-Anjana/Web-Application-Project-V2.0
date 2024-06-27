import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrderDetails,
  updateOrderStatus,
} from "../../services/orderService";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Define the async thunk for fetching user data
export const fetchOrders = createAsyncThunk(
  "order/fetctOrders",
  async (data, thunkAPI) => {
    try {
      const response = await getOrders();
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue({ error: "Error fetching orders" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const orderCreate = createAsyncThunk(
  "order/orderCreate",
  async (order, thunkAPI) => {
    try {
      const response = await createOrder(order);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue({ error: "Error creating order" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const orderDelete = createAsyncThunk(
  "order/orderDelete",
  async (orderId, thunkAPI) => {
    try {
      const response = await deleteOrder(orderId);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue({ error: "Error deleting order" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const orderUpdateDetails = createAsyncThunk(
  "order/orderUpdateDetails",
  async (data, thunkAPI) => {
    try {
      const response = await updateOrderDetails(data.id, data.data);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue({ error: "Error updating order" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const orderUpdateStatus = createAsyncThunk(
  "order/orderUpdateStatus",
  async (data, thunkAPI) => {
    try {
      const response = await updateOrderStatus(data.id, data.status);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue({
          error: "Error updating order status",
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Define the order slice
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(orderCreate.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(orderCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(orderDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = state.data.filter((order) => order._id !== action.payload);
      })
      .addCase(orderDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(orderUpdateDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderUpdateDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
        state.error = null;
      })
      .addCase(orderUpdateDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(orderUpdateStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderUpdateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
        state.error = null;
      })
      .addCase(orderUpdateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the action creators
export default orderSlice.reducer;

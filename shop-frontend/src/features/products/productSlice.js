import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../services/productService";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Define the async thunk for fetching user data
export const fetchProducts = createAsyncThunk(
  "product/fetctProducts",
  async (data, thunkAPI) => {
    try {
      const response = await getProducts();
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const productCreate = createAsyncThunk(
  "product/createProduct",
  async (product, thunkAPI) => {
    try {
      const response = await createProduct(product);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const productDelete = createAsyncThunk(
  "product/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await deleteProduct(productId);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const productUpdate = createAsyncThunk(
  "product/updateProduct",
  async (data, thunkAPI) => {
    try {
      const response = await updateProduct(data.id, data.product);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// Define the user slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;

      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(productCreate.pending, (state) => {
        state.loading = true;
      })
      .addCase(productCreate.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(productCreate.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(productDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(productDelete.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(productDelete.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(productUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(productUpdate.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        state.products[index] = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(productUpdate.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
export default productSlice.reducer;

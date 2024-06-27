import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../services/categoryService";

// Define the async thunk for fetching user data
export const fetchCategories = createAsyncThunk(
  "order/fetctCategories",
  async (data, thunkAPI) => {
    try {
      const response = await getCategories();
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

export const categoryCreate = createAsyncThunk(
  "category/categoryCreate",
  async (category, thunkAPI) => {
    try {
      const response = await createCategory(category);
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

export const categoryUpdate = createAsyncThunk(
  "category/categoryUpdate",
  async (data, thunkAPI) => {
    try {
      const response = await updateCategory(data.id,data.data);
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

export const categoryDelete = createAsyncThunk(
  "category/categoryDelete",
  async (id, thunkAPI) => {
    try {
      const response = await deleteCategory(id);
      if (response) {
        return id;
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// Define the category slice
export const categorySlice = createSlice({
  name: "category",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(categoryCreate.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoryCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(categoryCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(categoryUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoryUpdate.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (category) => category._id === action.payload._id
        );
        state.data[index] = action.payload;
      })
      .addCase(categoryUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(categoryDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoryDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(categoryDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default categorySlice.reducer;

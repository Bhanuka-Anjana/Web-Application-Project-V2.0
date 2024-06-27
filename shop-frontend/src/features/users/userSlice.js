import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUser, getAllUsers, setAdminFetch } from "../../services/authService";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Define the async thunk for fetching user data
export const fetchUsers = createAsyncThunk(
  "user/fetctUsers",
  async (data, thunkAPI) => {
    try {
      const response = await getAllUsers();
      if (response) {
        return response;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const setAdmin = createAsyncThunk(
  "user/setAdmin",
  async (data, thunkAPI) => {
    try {
      const response = await setAdminFetch(data);
      if (response) {
        return response;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (data, thunkAPI) => {
    try {
      const response = await deleteUser(data);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Define the user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(setAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(setAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (user) => user._id === action.payload._id
        );
        state.data[index] = action.payload;
        state.error = null;
      })
      .addCase(setAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((user) => user._id !== action.payload);
        state.error = null;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

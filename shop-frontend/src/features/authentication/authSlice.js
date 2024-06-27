import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, login, register, updateProfile } from "../../services/authService";

// Define the initial state for the user slice
const initialState = {
  data: {},
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Define the async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  "user/fetchCurrentUserData",
  async (data, thunkAPI) => {
    try {
      const response = await getCurrentUser();
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue("Unable to fetch user data");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = await login(data.email, data.password);
      if (response) {
        return true;
      } else {
        return thunkAPI.rejectWithValue("Unable to login");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    try {
      const response = await register(data);
      if (response) {
        return true;
      } else {
        return thunkAPI.rejectWithValue("Unable to register");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (data, thunkAPI) => {
    try {
      const response = await updateProfile(data.id, data.data);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue("Unable to update profile");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define the auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Define the reducer for logging out
    logout: (state) => {
      state.data = null;
      state.isAuthenticated = false;
      state.error= null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions
export const { logout } = authSlice.actions;

export default authSlice.reducer;

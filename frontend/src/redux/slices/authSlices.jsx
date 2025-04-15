import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser', // action type
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:8000/api/users/login/', {
          email,
          password,
        }, { withCredentials: true });
        return response.data.user;
      } catch (err) {
        console.error(err)
        return rejectWithValue(err.response?.data?.detail || 'Network error');
      }
    }
  );
  
// Create an async thunk for googleLogin
export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async (idToken, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:8000/api/users/firebase-login/', {
          id_token: idToken,
        }, { withCredentials: true });
        return response.data.user;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
  
const authSlide = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      loading: false,
      error: null,
    },
    reducers: {
      logout:(state) => {
        state.user = null;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(googleLogin.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(googleLogin.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(googleLogin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

export const {logout} = authSlide.actions;
export default authSlide.reducer;
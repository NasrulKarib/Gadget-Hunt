import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

// Create an async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser', // action type
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/users/login/`, {
          email,
          password,
        }, { withCredentials: true });
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
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
        const response = await axios.post(`${API_BASE_URL}/api/users/firebase-login/`, {
          id_token: idToken,
        }, { withCredentials: true });
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      } catch (err) {
        console.log(err)
        return rejectWithValue(err.message);
      }
    }
  );
  
const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      loading: false,
      error: null,
      isCheckingAuth: true
    },
    reducers: {
      setUser:(state,action) =>{
        state.user = action.payload;
        if (action.payload) {
          sessionStorage.setItem('user', JSON.stringify(action.payload));
        }
      },
      logout:(state) => {
        state.user = null;
        state.error = null;
        state.isCheckingAuth = false;
        sessionStorage.removeItem('user');
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

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;
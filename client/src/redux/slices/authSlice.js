import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios.js';
import { connectSocket, getSocket } from '../../lib/socket.js';

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/check", {
        withCredentials: true, // ✅ Include cookies
      });
      
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);




const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authUser: JSON.parse(localStorage.getItem("authUser")) || null,
    isCheckingAuth: true,
    onlineUsers: [],
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;

        localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authUser = null;

         localStorage.removeItem("authUser");
      });

  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;

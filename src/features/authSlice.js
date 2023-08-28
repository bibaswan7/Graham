// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authUser: null,
  userLoginStatus: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setUserLoginStatus: (state, action) => {
      state.userLoginStatus = action.payload;
    },
  },
});

export const { setAuthUser, setUserLoginStatus } = authSlice.actions;

export default authSlice.reducer;

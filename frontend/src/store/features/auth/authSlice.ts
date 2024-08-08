import { createSlice } from '@reduxjs/toolkit';

import { IInitialState } from './types';

const initialState: IInitialState = {
  user: undefined,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.user = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;

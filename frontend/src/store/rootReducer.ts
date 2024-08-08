import { combineReducers } from '@reduxjs/toolkit';

import { apiSlice } from './features/api/apiSlice';
import auth from './features/auth/authSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;

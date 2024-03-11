import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/authSlice";
import { apiSlice } from "@/app/api/apiSlice";

// Configure the store
export const store = configureStore({
  // Add reducer and middleware
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

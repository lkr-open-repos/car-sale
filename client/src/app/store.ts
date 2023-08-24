import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/authSlice";
import { apiSlice } from "@/app/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

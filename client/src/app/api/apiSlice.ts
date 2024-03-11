import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRootState, signOut } from "@/app/authSlice";

// Base query config.
const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}api/v1/`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as IRootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Base query with sign-out functionality
const baseQueryWithSignOut = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    api.dispatch(signOut());
    localStorage.removeItem("userData");
  }
  return result;
};

// API slice init.
export const apiSlice = createApi({
  baseQuery: baseQueryWithSignOut,
  tagTypes: ["Cars", "Favorites", "Conversations", "Messages"],
  endpoints: (builder) => ({}),
});

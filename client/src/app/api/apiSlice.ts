import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRootState, signOut } from "@/app/authSlice";

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

const baseQueryWithSignOut = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    api.dispatch(signOut());
    localStorage.removeItem("userData");
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithSignOut,
  tagTypes: ["Cars", "Favorites", "Conversations"],
  endpoints: (builder) => ({}),
});

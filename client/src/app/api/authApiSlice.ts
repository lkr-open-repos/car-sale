import { apiSlice } from "@/app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/users/signIn",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/users/signUp",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApiSlice;

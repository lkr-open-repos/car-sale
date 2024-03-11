import { apiSlice } from "@/app/api/apiSlice";

// Inject authentication endpoints into the slice
export const authApiSlice = apiSlice.injectEndpoints({
  // Define endpoints
  endpoints: (builder) => ({
    // Sign in and sign up mutations
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

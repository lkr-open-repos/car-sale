import { ApiSlice } from "./ApiSlice";
import { IUser } from "../types/user-interface";

export const usersApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => "/users",
      transformResponse: (response: { users: IUser[] }): IUser[] =>
        response.users,
      providesTags: ["Users"],
    }),
    signUp: builder.mutation({
      query: (user: IUser) => ({
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    signIn: builder.mutation({
      query: ({ email, password }) => ({
        url: "users/signIn",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllUsersQuery, useSignUpMutation, useSignInMutation } =
  usersApiSlice;

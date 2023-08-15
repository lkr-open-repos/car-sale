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
  }),
  overrideExisting: false,
});

export const { useGetAllUsersQuery, useSignUpMutation } = usersApiSlice;

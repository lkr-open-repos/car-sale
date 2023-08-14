import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../types/user-interface";

export const usersApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}` }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllCars: builder.query<IUser[], void>({
      query: () => "/users",
      transformResponse: (response: { cars: IUser[] }): IUser[] =>
        response.cars,
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetAllCarsQuery } = usersApiSlice;

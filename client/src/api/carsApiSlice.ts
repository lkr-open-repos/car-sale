import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICar } from "../types/car-interface";

export const carsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}` }),
  tagTypes: ["Cars"],
  endpoints: (builder) => ({
    getAllCars: builder.query<{ cars: ICar[] }, void>({
      query: () => "/cars",
      providesTags: ["Cars"],
    }),
  }),
});

export const { useGetAllCarsQuery } = carsApiSlice;

import { ICar } from "../../types/car-interface";
import { apiSlice } from "./apiSlice";

export const carsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query<ICar[], void>({
      query: () => "/cars",
      transformResponse: (res: { cars: ICar[] }) => res.cars,
      providesTags: ["Cars"],
    }),
    getCarById: builder.query<ICar, string>({
      query: (cid) => `cars/${cid}`,
      transformResponse: (res: { car: ICar }) => res.car,
    }),
  }),
});

export const { useGetAllCarsQuery, useGetCarByIdQuery } = carsApiSlice;

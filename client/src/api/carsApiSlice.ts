import { ApiSlice } from "./ApiSlice";
import { ICar } from "../types/car-interface";

export const carsApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query<ICar[], void>({
      query: () => "/cars",
      transformResponse: (response: { cars: ICar[] }): ICar[] => response.cars,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllCarsQuery } = carsApiSlice;

import { ICar } from "@/types/car-interface";
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
    createCar: builder.mutation<ICar, any>({
      query: (newCar) => ({
        url: "/cars",
        method: "POST",
        body: newCar,
        formData: true,
        user: {
          id: newCar.user,
        },
      }),
      invalidatesTags: ["Cars"],
    }),
  }),
});

export const { useGetAllCarsQuery, useGetCarByIdQuery, useCreateCarMutation } =
  carsApiSlice;

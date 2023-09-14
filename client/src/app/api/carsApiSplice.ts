import { ICar } from "@/types/car-interface";
import { apiSlice } from "./apiSlice";
import { ICarFormInput } from "@/types/car-form-input-interface";

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
    getCarSearch: builder.mutation<ICar[], Partial<ICarFormInput>>({
      query: (searchData) => ({
        url: "cars/search",
        method: "GET",
        body: searchData,
      }),
      transformResponse: (res: { car: ICar[] }) => res.car,
    }),
    createCar: builder.mutation<ICar, FormData>({
      query: (newCar) => ({
        url: "/cars",
        method: "POST",
        body: newCar,
        formData: true,
      }),
      invalidatesTags: ["Cars"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetCarByIdQuery,
  useGetCarSearchMutation,
  useCreateCarMutation,
} = carsApiSlice;

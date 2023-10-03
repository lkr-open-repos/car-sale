import { ICar } from "@/types/car-interface";
import { apiSlice } from "./apiSlice";
import { ICarFormInput } from "@/types/car-form-input-interface";

export const carsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // not needed anymore
    // getAllCars: builder.query<ICar[], void>({
    //   query: () => "/cars",
    //   transformResponse: (res: { cars: ICar[] }) => res.cars,
    //   providesTags: ["Cars"],
    // }),
    getCarById: builder.query<ICar, string>({
      query: (cid) => `/cars/${cid}`,
      transformResponse: (res: { car: ICar }) => res.car,
    }),
    getCarSearch: builder.mutation<
      { cars: ICar[]; totalPages: number },
      { searchData: Partial<ICarFormInput>; currentPage: number }
    >({
      query: ({ searchData, currentPage }) => ({
        url: `/cars/search?page=${currentPage}`,
        method: "POST",
        body: { ...searchData },
      }),
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
    updateCar: builder.mutation<ICar, { updateData: FormData; cid: string }>({
      query: ({ updateData, cid }) => ({
        url: `/cars/${cid}`,
        method: "PATCH",
        body: updateData,
        formData: true,
      }),
    }),
    deleteCar: builder.mutation<{ success: boolean; cid: string }, string>({
      query: (cid) => ({
        url: `/cars/${cid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),
  }),
});

export const {
  // useGetAllCarsQuery,
  useGetCarByIdQuery,
  useGetCarSearchMutation,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carsApiSlice;

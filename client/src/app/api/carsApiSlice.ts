import { ICar } from "@/types/carInterface";
import { apiSlice } from "./apiSlice";
import { ICarFormInput } from "@/types/CarFormInputInterface";

// Inject cars endpoints into the slice
export const carsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // not needed anymore but left for reference
    // getAllCars: builder.query<ICar[], void>({
    //   query: () => "/cars",
    //   transformResponse: (res: { cars: ICar[] }) => res.cars,
    //   providesTags: ["Cars"],
    // }),
    // Get car by id query
    getCarById: builder.query<ICar, string>({
      query: (cid) => `/cars/${cid}`,
      transformResponse: (res: { car: ICar }) => res.car,
    }),
    // Search cars mutation. Get all cars function is also here via not defining search terms
    getCarSearch: builder.mutation<
      { cars: ICar[]; totalPages: number },
      { searchData: Partial<ICarFormInput>; currentPage: number }
    >({
      query: ({ searchData, currentPage }) => ({
        url: `/cars/search?page=${currentPage}`,
        method: "POST",
        body: { ...searchData },
      }),
      invalidatesTags: ["Cars"],
    }),
    // Create car mutation
    createCar: builder.mutation<{ car: ICar }, FormData>({
      query: (newCar) => ({
        url: "/cars",
        method: "POST",
        body: newCar,
        formData: true,
      }),
      invalidatesTags: ["Cars"],
    }),
    // Update car mutation
    updateCar: builder.mutation<ICar, { updateData: FormData; cid: string }>({
      query: ({ updateData, cid }) => ({
        url: `/cars/${cid}`,
        method: "PATCH",
        body: updateData,
        formData: true,
      }),
    }),
    // Delete car mutation
    deleteCar: builder.mutation<{ message: string }, string>({
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

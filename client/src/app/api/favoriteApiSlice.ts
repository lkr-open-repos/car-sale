import { IFavorite } from "@/types/favoriteInterface";
import { apiSlice } from "./apiSlice";
import { ICar } from "@/types/carInterface";

// Inject favorite endpoints into the slice
export const favoriteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create favorite mutation
    createFavorite: builder.mutation<IFavorite, { carId: string }>({
      query: (carId) => ({
        url: "/favorites",
        method: "POST",
        body: carId,
      }),
      invalidatesTags: ["Favorites"],
    }),
    // Get favorites by user query
    getFavoritesByUser: builder.query<string[], void>({
      query: () => `/favorites`,
      transformResponse: (res: { favorites: string[] }) => res.favorites,
      providesTags: ["Favorites"],
    }),
    // Get cars by favorites query
    getCarsByFavorites: builder.mutation<ICar[], string[]>({
      query: (cars) => ({ url: "/favorites/cars", method: "POST", body: cars }),
      transformResponse: (res: { favorites: ICar[] }) => res.favorites,
      invalidatesTags: ["Favorites"],
    }),
    // Delete favorite mutation
    deleteFavorite: builder.mutation<
      { message: string },
      { userId: string; carId: string }
    >({
      query: ({ userId, carId }) => ({
        url: `/favorites/delete/`,
        method: "DELETE",
        body: { userId: userId, carId: carId },
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useLazyGetFavoritesByUserQuery,
  useCreateFavoriteMutation,
  useGetCarsByFavoritesMutation,
  useDeleteFavoriteMutation,
} = favoriteApiSlice;

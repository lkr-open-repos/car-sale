import { IFavorite } from "@/types/favoriteInterface";
import { apiSlice } from "./apiSlice";
import { ICar } from "@/types/carInterface";

export const favoriteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFavorite: builder.mutation<IFavorite, { carId: string }>({
      query: (carId) => ({
        url: "/favorites",
        method: "POST",
        body: carId,
      }),
      invalidatesTags: ["Favorites"],
    }),
    getFavoritesByUser: builder.query<string[], void>({
      query: () => `/favorites`,
      transformResponse: (res: { favorites: string[] }) => res.favorites,
      providesTags: ["Favorites"],
    }),
    getCarsByFavorites: builder.mutation<ICar[], string[]>({
      query: (cars) => ({ url: "/favorites/cars", method: "POST", body: cars }),
      transformResponse: (res: { favorites: ICar[] }) => res.favorites,
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useLazyGetFavoritesByUserQuery,
  useCreateFavoriteMutation,
  useGetCarsByFavoritesMutation,
} = favoriteApiSlice;

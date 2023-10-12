import { IFavorite } from "@/types/favoriteInterface";
import { apiSlice } from "./apiSlice";

export const favoriteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFavorite: builder.mutation<IFavorite, string>({
      query: (carId) => ({
        url: "/favorites",
        method: "POST",
        body: carId,
      }),
      invalidatesTags: ["Favorites", "Cars"],
    }),
    getFavoritesByUser: builder.query<string[], void>({
      query: () => `/favorites`,
      transformResponse: (res: { favorites: IFavorite[] }) =>
        res.favorites.map((favorite) => favorite.carId),
    }),
  }),
});

export const { useGetFavoritesByUserQuery, useCreateFavoriteMutation } =
  favoriteApiSlice;

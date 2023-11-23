import {
  useGetCarsByFavoritesMutation,
  useLazyGetFavoritesByUserQuery,
} from "@/app/api/favoriteApiSlice";
import CarCard from "@/components/shared/CarCard/CarCard";
import { ICar } from "@/types/carInterface";
import { useEffect, useState } from "react";
import classes from "./MyFavorites.module.css";
import Spinner from "@/components/shared/Spinner/Spinner";

const MyFavorites = () => {
  const [getCarsByFavorites, { isSuccess }] = useGetCarsByFavoritesMutation();
  const [fetchTrigger] = useLazyGetFavoritesByUserQuery({});
  const [favoriteCars, setFavoriteCars] = useState<ICar[]>([]);

  const getFavorites = async () => {
    try {
      const favoritesList = await fetchTrigger().unwrap();
      const carsByFavorites = await getCarsByFavorites(favoritesList).unwrap();
      setFavoriteCars(carsByFavorites);
    } catch (err) {
      console.log("error catching favorites", err);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      {!isSuccess && <Spinner />}
      <section className={`${classes["cars-wrapper"]} grid`}>
        {favoriteCars && favoriteCars.length > 0 ? (
          favoriteCars.map((car: any) => (
            <CarCard key={car.id} car={car} isFavorite={true} />
          ))
        ) : (
          <h2>No Favorite Car Yet.</h2>
        )}
      </section>
    </>
  );
};

export default MyFavorites;

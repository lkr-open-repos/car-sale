import { useGetCarSearchMutation } from "@/app/api/carsApiSlice";
import classes from "./Cars.module.css";
import { ICarFormInput } from "@/types/CarFormInputInterface";
import { ICar } from "@/types/carInterface";
import { useEffect, useState } from "react";
import CarCard from "../CarCard/CarCard";
import Button from "@/components/shared/Button/Button";
import Spinner from "../Spinner/Spinner";
import { useLazyGetFavoritesByUserQuery } from "@/app/api/favoriteApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";
import { sendErrorLog } from "@/utils/sendErrorLog";

interface IProps {
  carsSearchData: Partial<ICarFormInput>;
}

const Cars = ({ carsSearchData }: IProps) => {
  // init state for cars and total pages
  const [carsData, setCarsData] = useState<{
    cars: ICar[];
    totalPages: number;
  }>({ cars: [], totalPages: 0 });

  const [currentPage, setCurrentPage] = useState(1);

  // get user info
  const user = useSelector(selectCurrentUser);

  // fetch cars data
  const [
    carSearch,
    {
      isLoading: carSearchLoading,
      isSuccess: carSearchSuccess,
      error: carSearchError,
    },
  ] = useGetCarSearchMutation();
  const [fetchTrigger, { data: favoritesData, error: favoritesError }] =
    useLazyGetFavoritesByUserQuery();

  // fetch favorites according to user
  useEffect(() => {
    if (user) {
      fetchTrigger();
    }
  }, [user]);

  // log errors
  useEffect(() => {
    if (carSearchError) {
      console.log(carSearchError);
    }
    if (favoritesError) {
      console.log(favoritesError);
    }
  }, [carSearchError, favoritesError]);

  // get cars data and set state
  const dataHelper = async (carsSearchData: Partial<ICarFormInput>) => {
    await carSearch({ searchData: carsSearchData, currentPage })
      .unwrap()
      .then((result) => setCarsData(result))
      .catch((error) => {
        sendErrorLog(`${error.message} => Car Search Error (Cars Component)`);
      });
  };

  // fetch cars data with data or page change
  useEffect(() => {
    dataHelper(carsSearchData);
  }, [carsSearchData, currentPage]);

  useEffect(() => {}, [favoritesError]);

  // Set page buttons
  const pageButtons = [];
  if (carsData.totalPages > 1) {
    pageButtons.push(
      <Button
        key={"prevPage"}
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage((prevState) => prevState - 1);
        }}
      >
        Prev
      </Button>
    );
    for (let i = 0; i < carsData.totalPages; i++) {
      pageButtons.push(
        <Button
          key={i}
          disabled={currentPage === i + 1}
          onClick={() => {
            setCurrentPage(i + 1);
          }}
        >
          {(i + 1).toString()}
        </Button>
      );
    }
    pageButtons.push(
      <Button
        key={"nextPage"}
        disabled={currentPage === carsData.totalPages}
        onClick={() => {
          setCurrentPage((prevState) => prevState + 1);
        }}
      >
        Next
      </Button>
    );
  }

  return (
    <>
      {/* Spinner when fetching car data */}
      {carSearchLoading && <Spinner />}
      {/* Display cars data with fetch success */}
      {carSearchSuccess && (
        <>
          <div className={`${classes["cars-wrapper"]} grid`}>
            {carsData.cars && carsData.cars.length > 0 ? (
              carsData.cars.map((car: any) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isFavorite={favoritesData?.includes(car.id)}
                />
              ))
            ) : (
              <h2>No Cars Found For Your Search.</h2>
            )}
          </div>
          {/* Render pagination */}
          <div className={`${classes["pagination-wrapper"]} flex`}>
            {carsData.totalPages > 1 && pageButtons.map((button) => button)}
          </div>
        </>
      )}
    </>
  );
};

export default Cars;

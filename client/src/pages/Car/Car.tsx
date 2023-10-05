import { useParams } from "react-router-dom";

import { useGetCarByIdQuery } from "@/app/api/carsApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";
import { useState } from "react";
import Button from "@/components/shared/Button/Button";
import CarInfo from "./CarInfo";
import CarEdit from "./CarEdit";
import Spinner from "@/components/shared/Spinner/Spinner";

const Car = () => {
  const { cid } = useParams();
  const [editMode, setEditMode] = useState(false);

  const { data, isSuccess, isLoading } = useGetCarByIdQuery(`${cid}`);

  const car = data;

  const user = useSelector(selectCurrentUser);

  let isOwner = false;
  if (car?.user === user?.id) {
    isOwner = true;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {isSuccess &&
        (editMode ? (
          <CarEdit car={car!} user={user!} setEditMode={setEditMode}></CarEdit>
        ) : (
          <CarInfo
            isOwner={isOwner}
            car={car!}
            setEditMode={setEditMode}
          ></CarInfo>
        ))}
      {isSuccess && !isOwner && <Button>Message Seller</Button>}
    </>
  );
};

export default Car;

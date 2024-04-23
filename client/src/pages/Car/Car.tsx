import { useParams } from "react-router-dom";

import { useGetCarByIdQuery } from "@/app/api/carsApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";
import { useState } from "react";
import CarInfo from "./Atomic/CarInfo/CarInfo";
import CarEdit from "./Atomic/CarEdit/CarEdit";
import Spinner from "@/components/shared/Spinner/Spinner";
import MessageButton from "./Atomic/MessageButton/MessageButton";

// Functional component for displaying details of a car
const Car = () => {
  const { cid } = useParams();
  const [editMode, setEditMode] = useState(false);

  // Querying the car details by its ID using Redux Toolkit's 'useGetCarByIdQuery' hook
  const { data: car, isSuccess, isLoading } = useGetCarByIdQuery(`${cid}`);

  // Accessing the user data from the Redux store
  const user = useSelector(selectCurrentUser);

  // Checking if the current user is the owner of the car and setting the 'isOwner' variable accordingly
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
      {isSuccess && !isOwner && (
        <MessageButton targetUser={car!.user}>Message Seller</MessageButton>
      )}
    </>
  );
};

export default Car;

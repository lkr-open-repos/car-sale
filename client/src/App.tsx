import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { setAuth } from "@/app/authSlice";
import { useDispatch } from "react-redux";
import Layout from "@/components/layouts/Layout/Layout";
import Home from "@/pages/Home/Home";
import CarSearch from "@/pages/CarSearch/CarSearch";
import Car from "@/pages/Car/Car";
import Auth from "@/pages/Auth/Auth";
import CreateCar from "@/pages/CreateCar/CreateCar";
import FourOFour from "@/pages/FourOFour/FourOFour";
import CheckAuth from "./components/layouts/ChechAuth/CheckAuth";
import { IUserData } from "./types/user-data-interface";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let storageUserData = localStorage.getItem("userData");
    if (storageUserData) {
      let userData: IUserData = JSON.parse(storageUserData);
      if (
        userData &&
        userData.tokenExpiration &&
        new Date(userData.tokenExpiration) > new Date()
      ) {
        dispatch(setAuth(userData));
      } else {
        localStorage.removeItem("userData");
      }
    }
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/" element={<Auth />} />
          <Route path="/cars/:cid" element={<Car />} />
          <Route path="/search" element={<CarSearch />} />
          <Route element={<CheckAuth />}>
            <Route path="/createcar" element={<CreateCar />} />
          </Route>
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

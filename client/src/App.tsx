import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { setAuth } from "@/app/authSlice";
import { useDispatch } from "react-redux";
import Layout from "@/components/layouts/Layout/Layout";
import Home from "@/pages/Home/Home";
import CarSearch from "@/pages/CarSearch/CarSearch";
import Car from "./pages/Car/Car";
import Auth from "@/pages/Auth/Auth";
import CreateCar from "@/pages/CreateCar/CreateCar";
import FourOFour from "@/pages/FourOFour/FourOFour";
import CheckAuth from "./components/layouts/ChechAuth/CheckAuth";
import { IUserData } from "./types/userDataInterface";
import CarSearchResults from "./pages/CarSearchResults/CarSearchResults";
import User from "./pages/User/User";

function App() {
  const dispatch = useDispatch();

  // Check user authentication
  useEffect(() => {
    // Check if user data on local storage
    let storageUserData = localStorage.getItem("userData");
    if (storageUserData) {
      let userData: IUserData = JSON.parse(storageUserData);
      if (
        // Check data and token if still valid
        userData &&
        userData.tokenExpiration &&
        new Date(userData.tokenExpiration) > new Date()
      ) {
        // Set user data in redux if valid
        dispatch(setAuth(userData));
      } else {
        // Remove local storage if invalid
        localStorage.removeItem("userData");
      }
    }
  }, []);

  return (
    <>
      {/* Global Layout Component */}
      <Layout>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/" element={<Auth />} />
          <Route path="/cars/:cid" element={<Car />} />
          <Route path="/search" element={<CarSearch />} />
          <Route path="/searchresults" element={<CarSearchResults />} />
          {/* Protected Routes */}
          <Route element={<CheckAuth />}>
            <Route path="/user" element={<User />} />
            <Route path="/createcar" element={<CreateCar />} />
          </Route>
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

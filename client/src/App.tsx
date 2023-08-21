import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { setAuth } from "./app/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/layouts/Layout/Layout";
import Home from "./pages/Home/Home";
import CarSearch from "./pages/CarSearch/CarSearch";
import Car from "./pages/Car";
import Auth from "./pages/Auth/Auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let storageUserData = localStorage.getItem("userData");
    if (storageUserData) {
      storageUserData = JSON.parse(storageUserData);
      dispatch(setAuth(storageUserData));
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
        </Routes>
      </Layout>
    </>
  );
}

export default App;

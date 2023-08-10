import { Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./components/layouts/Layout/Layout";
import Home from "./pages/Home/Home";
import CarSearch from "./pages/CarSearch";
import Car from "./pages/Car";
import User from "./pages/User/User";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/" element={<User />} />
          <Route path="/cars/:cid" element={<Car />} />
          <Route path="/search" element={<CarSearch />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

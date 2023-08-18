import { Route, Routes } from "react-router-dom";

import Layout from "./components/layouts/Layout/Layout";
import Home from "./pages/Home/Home";
import CarSearch from "./pages/CarSearch/CarSearch";
import Car from "./pages/Car";
import Auth from "./pages/Auth/Auth";

function App() {
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

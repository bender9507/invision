import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import ShowDetail from "../pages/ShowDetail";
import Mypage from "../pages/Mypage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showdetail" element={<ShowDetail />} />

        <Route path="/mypage/:id" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

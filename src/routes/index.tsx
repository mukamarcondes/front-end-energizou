import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";

export const Router = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" index={true} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

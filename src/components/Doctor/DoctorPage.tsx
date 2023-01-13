import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Doctor } from "../../common/types/Doctor.entity";
import { updatePathname } from "../../features/options/optionsSlice";
import Footer from "../Footer/Footer";
import Checkout from "./Checkout/Checkout";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import HeaderExpert from "./HeaderExpert/HeaderExpert";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ResetPassword from "./ResetPassword/ResetPassword";

type Props = {
  doctors: Doctor[];
};

export default function DoctorPage(props: Props) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updatePathname(location.pathname));
  }, [location]);
  return (
    <div>
      <HeaderExpert />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </div>
  );
}

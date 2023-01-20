import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Doctor } from "../../common/types/Doctor.entity";
import {
  updateHeaderMobileExpert,
  updatePathname,
} from "../../features/options/optionsSlice";
import Footer from "../Footer/Footer";
import AboutPage from "./AboutPage/AboutPage";
import FaqPage from "./FaqPage/FaqPage";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import HeaderExpert from "./HeaderExpert/HeaderExpert";
import HeaderExpertMobile from "./HaederExpertMobile/HaederExpertMobile";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ResetPassword from "./ResetPassword/ResetPassword";
import Drawer from "@mui/material/Drawer";
import HeaderExpertMobileNavbar from "./HeaderExpertMobileNavbar/HeaderExpertMobileNavbar";

type Props = {
  doctors: Doctor[];
};

export default function DoctorPage(props: Props) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updatePathname(location.pathname));
  }, [location]);
  const headerMobileExpert = useAppSelector(
    (state) => state.options.headerMobileExpert
  );
  const headerMobilePatient = useAppSelector(
    (state) => state.options.headerMobilePatient
  );
  return (
    <div>
      <HeaderExpertMobile />
      <HeaderExpert />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
      <Drawer
        open={headerMobileExpert}
        onClose={() => {
          dispatch(updateHeaderMobileExpert(false));
        }}
        anchor="right"
      >
        <HeaderExpertMobileNavbar />
      </Drawer>
    </div>
  );
}

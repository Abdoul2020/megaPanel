import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Branch } from "../../common/types/Branch.entity";
import { Doctor } from "../../common/types/Doctor.entity";
import { updatePathname } from "../../features/options/optionsSlice";
import Footer from "../Footer/Footer";
import Checkout from "./Checkout/Checkout";
import DoctorDetail from "./DoctorDetail/DoctorDetail";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import HeaderPatient from "./HeaderPatient/HeaderPatient";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ResetPassword from "./ResetPassword/ResetPassword";
import SearchPage from "./SearchPage/SearchPage";

type Props = {
  doctors: Doctor[];
  branches: Branch[];
};

export default function PatientPage(props: Props) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updatePathname(location.pathname));
  }, [location]);
  return (
    <div>
      <HeaderPatient />
      <Routes>
        <Route
          index
          element={<Home doctors={props.doctors} branches={props.branches} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/search"
          element={<SearchPage experts={props.doctors} />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

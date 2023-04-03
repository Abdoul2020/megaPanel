import Drawer from "@mui/material/Drawer";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Branch } from "../../common/types/Branch.entity";
import { Doctor } from "../../common/types/Doctor.entity";
import {
  updateHeaderMobilePatient,
  updatePathname
} from "../../features/options/optionsSlice";
import Footer from "../Footer/Footer";
import AboutPage from "./AboutPage/AboutPage";
import Checkout from "./Checkout/Checkout";
import DoctorDetail from "./DoctorDetail/DoctorDetail";
import FaqPage from "./FaqPage/FaqPage";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import HeaderPatient from "./HeaderPatient/HeaderPatient";
import HeaderPatientMobile from "./HeaderPatientMobile/HeaderPatientMobile";
import HeaderPatientMobileNavbar from "./HeaderPatientMobileNavbar/HeaderPatientMobileNavbar";
import Home from "./Home/Home";
import Login from "./Login/Login";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
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
  const headerMobileExpert = useAppSelector(
    (state) => state.options.headerMobileExpert
  );
  const headerMobilePatient = useAppSelector(
    (state) => state.options.headerMobilePatient
  );
  useEffect(() => {
    dispatch(updatePathname(location.pathname));
  }, [location]);
  return (
    <div className="relative">
      <HeaderPatientMobile />
      <HeaderPatient />
      <Routes>
        <Route
          index
          element={<Home doctors={props.doctors} branches={props.branches} />}
        />
        <Route path="/about/*" element={<AboutPage />} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Drawer
        open={headerMobilePatient}
        onClose={() => {
          dispatch(updateHeaderMobilePatient(false));
        }}
        anchor="right"
      >
        <HeaderPatientMobileNavbar />
      </Drawer>
    </div>
  );
}

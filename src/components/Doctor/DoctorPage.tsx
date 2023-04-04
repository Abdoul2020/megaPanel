import Drawer from "@mui/material/Drawer";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Doctor } from "../../common/types/Doctor.entity";
import {
  updateHeaderMobileExpert,
  updatePathname
} from "../../features/options/optionsSlice";
import Footer from "../Footer/Footer";
import AboutPage from "./AboutPage/AboutPage";
import FaqPage from "./FaqPage/FaqPage";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import HeaderExpertMobile from "./HaederExpertMobile/HaederExpertMobile";
import HeaderExpert from "./HeaderExpert/HeaderExpert";
import HeaderExpertMobileNavbar from "./HeaderExpertMobileNavbar/HeaderExpertMobileNavbar";
import Home from "./Home/Home";
import Login from "./Login/Login";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFoundPage />} />
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

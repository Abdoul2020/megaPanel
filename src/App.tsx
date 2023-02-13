import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Alert } from "./common/types/Alert";
import { Branch } from "./common/types/Branch.entity";
import { Doctor } from "./common/types/Doctor.entity";
import AlertDanger from "./components/Common/Alerts/AlertDanger";
import AlertInfo from "./components/Common/Alerts/AlertInfo";
import AlertSuccess from "./components/Common/Alerts/AlertSuccess";
import AlertWarning from "./components/Common/Alerts/AlertWarning";
import NotFoundPage from "./components/Common/NotFoundPage/NotFoundPage";
import DashboardExpert from "./components/Doctor/DashboardExpert/DashboardExpert";
import DoctorPage from "./components/Doctor/DoctorPage";
import Dashboard from "./components/Patient/Dashboard/Dashboard";
import PatientPage from "./components/Patient/PatientPage";
import { authGetProfile } from "./features/auth/authAPI";
import { addAuthObject } from "./features/auth/authSlice";
import { authExpertGetProfile } from "./features/authExpert/authExpertAPI";
import { addAuthExpertObject } from "./features/authExpert/authExpertSlice";
import { fetchBranches } from "./features/branches/branchesAPI";
import { addBranches } from "./features/branches/branchesSlice";
import { fetchExperts } from "./features/doctorSlice/doctorAPI";
import { fetchFirms } from "./features/firms/firmsAPI";
import { addFirms } from "./features/firms/firmsSlice";
import {
  updateAlert,
  updateScrollToTop,
  updateSticky
} from "./features/options/optionsSlice";
import { fetchSpecializations } from "./features/specializations/specializationsAPI";
import { addSpecializations } from "./features/specializations/specializationsSlice";
import { fetchTitles } from "./features/titles/titlesAPI";
import { addTitles } from "./features/titles/titlesSlice";
import { getCookie, removeCookie } from "./helpers/authHelper";
import ProtectedRoute from "./helpers/ProtectedRoute";
import ProtectedRouteExpert from "./helpers/ProtectedRouteExpert";

function App() {
  const appRef = useRef<HTMLInputElement>(null);
  const [sticky, setSticky] = useState(false);
  const [experts, setExperts] = useState<Doctor[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);

  const alert = useAppSelector((state) => state.options.alert);
  const scrollToTop = useAppSelector((state) => state.options.scrollToTop);
  const dispatch = useAppDispatch();

  const handleScroll = (e: any) => {
    const scrollTop = appRef.current?.scrollTop;
    if (scrollTop && scrollTop > 0) {
      setSticky(true);
      dispatch(updateSticky(true));
    } else {
      setSticky(false);
      dispatch(updateSticky(false));
    }
  };

  useEffect(() => {
    if (alert.active) {
      setTimeout(() => {
        const alert_current: Alert = {
          type: alert.type,
          text: alert.text,
          active: false,
          statusCode: alert.statusCode,
        };
        dispatch(updateAlert(alert_current));
      }, 3000);
    }
  }, [alert]);

  useEffect(() => {
    async function fetchData() {
      const token = getCookie("m_t");
      const tokenExpert = getCookie("m_e_t");
      if (token !== null && token !== undefined && token !== "") {
        const fetchAuthClientProfileResponse = await authGetProfile(token);
        const successClientProfile = fetchAuthClientProfileResponse.success;
        if (successClientProfile) {
          const statusCodeClientProfile =
            fetchAuthClientProfileResponse.data.status;
          const data = fetchAuthClientProfileResponse.data.data;
          dispatch(addAuthObject(data));
        } else {
          dispatch(addAuthObject(undefined));
          if (getCookie("m_t")) {
            removeCookie("m_t");
          }
          // console.log(fetchAuthClientProfileResponse);
        }
      }
      if (
        tokenExpert !== null &&
        tokenExpert !== undefined &&
        tokenExpert !== ""
      ) {
        const fetchAuthExpertProfileResponse = await authExpertGetProfile(
          tokenExpert
        );
        const successExpertProfile = fetchAuthExpertProfileResponse.success;
        if (successExpertProfile) {
          const statusCodeExpertProfile =
            fetchAuthExpertProfileResponse.data.status;

          const data = fetchAuthExpertProfileResponse.data.data;

          dispatch(addAuthExpertObject(data));
        } else {
          dispatch(addAuthExpertObject(undefined));
          if (getCookie("m_e_t")) {
            removeCookie("m_e_t");
          }
          // console.log(fetchAuthExpertProfileResponse);
        }
      }

      const query = {
        page: 1,
        size: 10,
        sort: "ASC",
        sort_by: "expert_name",
      };
      const fetchExpertsResponse = await fetchExperts(query);
      const fetchBranchesResponse = await fetchBranches();
      const fetchTitlesResponse = await fetchTitles();
      const fetchFirmsResponse = await fetchFirms();
      const fetchSpecializationsResponse = await fetchSpecializations();
      // console.log({ fetchExpertsResponse });
      const successExperts = fetchExpertsResponse.success;
      const successBranches = fetchBranchesResponse.success;
      const successTitles = fetchTitlesResponse.success;
      const successSpecializations = fetchSpecializationsResponse.success;
      const successFirms = fetchFirmsResponse.success;

      if (successBranches) {
        const statusCodeBranches = fetchBranchesResponse.data.status;
        const data = fetchBranchesResponse.data.data;
        dispatch(addBranches(data));
      } else {
        // console.log(fetchBranchesResponse);
      }
      if (successExperts) {
        const statusCodeExperts = fetchExpertsResponse.data.status;
        const data = fetchExpertsResponse.data.data;
        setExperts(data);
        // dispatch(addExperts(data));
      } else {
        // console.log(fetchExpertsResponse);
      }
      if (successTitles) {
        const statusCodeTitles = fetchTitlesResponse.data.status;
        const data = fetchTitlesResponse.data.data;
        dispatch(addTitles(data));
      } else {
        // console.log(fetchTitlesResponse);
      }
      if (successFirms) {
        const statusCodeFirms = fetchFirmsResponse.data.status;
        const data = fetchFirmsResponse.data.data;
        dispatch(addFirms(data));
      } else {
        // console.log(fetchFirmsResponse);
      }
      if (successSpecializations) {
        const statusCodeSpecializations =
          fetchSpecializationsResponse.data.status;
        const data = fetchSpecializationsResponse.data.data;
        dispatch(addSpecializations(data));
      } else {
        // console.log(fetchSpecializationsResponse);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (appRef.current && scrollToTop) {
      appRef.current.scrollTo(0, 0);
      dispatch(updateScrollToTop(false));
    }
  }, [scrollToTop]);
  return (
    <div
      className="relative m-0 box-border h-screen scroll-smooth p-0 overflow-x-hidden"
      onScroll={handleScroll}
      ref={appRef}
    >
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route
            path="/*"
            element={<PatientPage doctors={experts} branches={branches} />}
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute redirect_url="/login">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/for-doctors/*"
            element={<DoctorPage doctors={experts} />}
          />
          <Route
            path="/for-doctors/dashboard/*"
            element={
              <ProtectedRouteExpert redirect_url="/for-doctors/login">
                <DashboardExpert />
              </ProtectedRouteExpert>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <div
          className={`fixed bottom-10 right-12 z-50 rounded-lg bg-color-main p-4 shadow-lg transition-all duration-300 hover:cursor-pointer hover:opacity-80 ${
            sticky ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          onClick={() => appRef.current?.scrollTo(0, 0)}
        >
          <AiOutlineArrowUp className="text-[30px] text-color-white" />
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
      <div
        className={`fixed bottom-0 right-0 z-50 w-full transition-all duration-300 sm:w-max ${
          alert.active ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={() => {
          const alert_current: Alert = {
            type: alert.type,
            text: alert.text,
            active: false,
            statusCode: alert.statusCode,
          };
          dispatch(updateAlert(alert_current));
        }}
      >
        {alert.type === "success" ? (
          <AlertSuccess alert={alert} />
        ) : alert.type === "danger" ? (
          <AlertDanger alert={alert} />
        ) : alert.type === "warning" ? (
          <AlertWarning alert={alert} />
        ) : (
          <AlertInfo alert={alert} />
        )}
      </div>
    </div>
  );
}

export default App;

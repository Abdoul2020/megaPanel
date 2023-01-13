import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { updateAlert, updateSticky } from "./features/options/optionsSlice";
import AlertSuccess from "./components/Common/Alerts/AlertSuccess";
import AlertDanger from "./components/Common/Alerts/AlertDanger";
import AlertWarning from "./components/Common/Alerts/AlertWarning";
import AlertInfo from "./components/Common/Alerts/AlertInfo";
import { Alert } from "./common/types/Alert";
import { fetchExperts } from "./features/doctorSlice/doctorAPI";
import { addExperts } from "./features/doctorSlice/doctorSlice";
import { fetchBranches } from "./features/branches/branchesAPI";
import { addBranches } from "./features/branches/branchesSlice";
import { getCookie, removeCookie } from "./helpers/authHelper";
import { authGetProfile } from "./features/auth/authAPI";
import { addAuthObject } from "./features/auth/authSlice";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Dashboard from "./components/Patient/Dashboard/Dashboard";
import DashboardExpert from "./components/Doctor/DashboardExpert/DashboardExpert";
import ProtectedRouteExpert from "./helpers/ProtectedRouteExpert";
import { authExpertGetProfile } from "./features/authExpert/authExpertAPI";
import { addAuthExpertObject } from "./features/authExpert/authExpertSlice";
import { fetchTitles } from "./features/titles/titlesAPI";
import { fetchSpecializations } from "./features/specializations/specializationsAPI";
import { addTitles } from "./features/titles/titlesSlice";
import { addSpecializations } from "./features/specializations/specializationsSlice";
import { fetchTotals } from "./features/totals/totalsAPI";
import { addTotals } from "./features/totals/totalsSlice";
import PatientPage from "./components/Patient/PatientPage";
import DoctorPage from "./components/Doctor/DoctorPage";

function App() {
  const appRef = useRef<HTMLInputElement>(null);
  const [sticky, setSticky] = useState(false);

  const experts = useAppSelector((state) => state.doctors.expertList);
  const branches = useAppSelector((state) => state.branches.branchesList);
  const alert = useAppSelector((state) => state.options.alert);
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

      const fetchAuthClientProfileResponse = await authGetProfile(token);
      const fetchAuthExpertProfileResponse = await authExpertGetProfile(
        tokenExpert
      );

      const successClientProfile = fetchAuthClientProfileResponse.success;
      const successExpertProfile = fetchAuthExpertProfileResponse.success;

      const query = {
        page: 1,
        size: 15,
        sort: "ASC",
        sort_by: "expert_name",
        query_text: "",
        count: false,
        city: "",
        operating_type: 2,
        location: "",
      };
      const fetchExpertsResponse = await fetchExperts(query);
      const fetchBranchesResponse = await fetchBranches();
      const fetchTitlesResponse = await fetchTitles();
      const fetchSpecializationsResponse = await fetchSpecializations();

      const successExperts = fetchExpertsResponse.success;
      const successBranches = fetchBranchesResponse.success;
      const successTitles = fetchTitlesResponse.success;
      const successSpecializations = fetchSpecializationsResponse.success;

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
        console.log(fetchAuthExpertProfileResponse);
      }

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
        console.log(fetchAuthClientProfileResponse);
      }
      if (successBranches) {
        const statusCodeBranches = fetchBranchesResponse.data.status;
        const data = fetchBranchesResponse.data.data;
        dispatch(addBranches(data));
      } else {
        console.log(fetchBranchesResponse);
      }
      if (successExperts) {
        const statusCodeExperts = fetchExpertsResponse.data.status;
        const data = fetchExpertsResponse.data.data;
        // dispatch(addExperts(data));
      } else {
        console.log(fetchExpertsResponse);
      }
      if (successTitles) {
        const statusCodeTitles = fetchTitlesResponse.data.status;
        const data = fetchTitlesResponse.data.data;
        dispatch(addTitles(data));
      } else {
        console.log(fetchTitlesResponse);
      }
      if (successSpecializations) {
        const statusCodeSpecializations =
          fetchSpecializationsResponse.data.status;
        const data = fetchSpecializationsResponse.data.data;
        dispatch(addSpecializations(data));
      } else {
        console.log(fetchSpecializationsResponse);
      }
    }
    fetchData();
  }, []);

  return (
    <div
      className="p-0 box-border relative m-0 h-screen overflow-x-hidden scroll-smooth"
      onScroll={handleScroll}
      ref={appRef}
    >
      <BrowserRouter>
        {/* <HeaderPatient /> */}
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
          <Route path="/for-doctors/*" element={<DoctorPage doctors={experts} />} />{" "}
          <Route
            path="/for-doctors/dashboard/*"
            element={
              <ProtectedRouteExpert redirect_url="/for-doctors/login">
                <DashboardExpert />
              </ProtectedRouteExpert>
            }
          />
        </Routes>
        <div
          className={`hover:opacity-80 shadow-lg hover:cursor-pointer rounded-lg z-50 bg-color-main p-4 fixed bottom-10 right-12 transition-all duration-300 ${
            sticky ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          onClick={() => appRef.current?.scrollTo(0, 0)}
        >
          <AiOutlineArrowUp className="text-color-white text-[30px]" />
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
      <div
        className={`fixed bottom-0 right-0 transition-all duration-300 ${
          alert.active ? "translate-y-0" : "translate-y-full"
        }`}
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

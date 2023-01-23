import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardAppointmentsChartExpert from "./DashboardAppointmentsChartExpert/DashboardAppointmentsChartExpert";
import DashboardAppointmentsExpert from "./DashboardAppointmentsExpert/DashboardAppointmentsExpert";
import DashboardAppointmentsMeExpert from "./DashboardAppointmentsMeExpert/DashboardAppointmentsMeExpert";
import DashboardCertificatesExpert from "./DashboardCertificatesExpert/DashboardCertificatesExpert";
import DashboardHeaderExpert from "./DashboardHeaderExpert/DashboardHeaderExpert";
import DashboardHeaderExpertMobile from "./DashboardHeaderExpertMobile/DashboardHeaderExpertMobile";
import DashboardHomeExpert from "./DashboardHomeExpert/DashboardHomeExpert";
import DashboardSettingsExpert from "./DashboardSettingsExpert/DashboardSettingsExpert";
import Drawer from "@mui/material/Drawer";
import { useAppSelector } from "../../../app/hooks";
import { updateHeaderMobileExpertDashboard } from "../../../features/options/optionsSlice";
import { useDispatch } from "react-redux";
import DashboardHeaderExpertMobileNavbar from "./DashboardHeaderExpertMobileNavbar/DashboardHeaderExpertMobileNavbar";

type Props = {};

export default function DashboardExpert({}: Props) {
  const dispatch = useDispatch();
  const headerMobileExpertDashboard = useAppSelector(
    (state) => state.options.headerMobileExpertDashboard
  );
  return (
    <div className="flex w-full items-start justify-start bg-color-white-secondary">
      <DashboardHeaderExpert />
      <DashboardHeaderExpertMobile />
      <div className="h-screen w-full overflow-y-scroll bg-color-gray-secondary px-2 sm:p-10">
        <Routes>
          <Route index element={<DashboardHomeExpert />} />
          <Route
            path="/appointments"
            element={<DashboardAppointmentsExpert />}
          />
          <Route
            path="/myappointments"
            element={<DashboardAppointmentsMeExpert />}
          />
          <Route
            path="/appointments-chart"
            element={<DashboardAppointmentsChartExpert />}
          />
          <Route
            path="/certificates"
            element={<DashboardCertificatesExpert />}
          />
          <Route path="/settings/*" element={<DashboardSettingsExpert />} />
        </Routes>
      </div>
      <Drawer
        open={headerMobileExpertDashboard}
        onClose={() => {
          dispatch(updateHeaderMobileExpertDashboard(false));
        }}
        anchor="left"
      >
        <DashboardHeaderExpertMobileNavbar />
      </Drawer>
    </div>
  );
}

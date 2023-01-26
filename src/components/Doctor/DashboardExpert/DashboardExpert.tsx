import Drawer from "@mui/material/Drawer";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { updateHeaderMobileExpertDashboard } from "../../../features/options/optionsSlice";
import DashboardAppointmentsChartExpert from "./DashboardAppointmentsChartExpert/DashboardAppointmentsChartExpert";
import DashboardAppointmentsExpert from "./DashboardAppointmentsExpert/DashboardAppointmentsExpert";
import DashboardAppointmentsMeExpert from "./DashboardAppointmentsMeExpert/DashboardAppointmentsMeExpert";
import DashboardCertificatesExpert from "./DashboardCertificatesExpert/DashboardCertificatesExpert";
import DashboardHeaderExpert from "./DashboardHeaderExpert/DashboardHeaderExpert";
import DashboardHeaderExpertMobile from "./DashboardHeaderExpertMobile/DashboardHeaderExpertMobile";
import DashboardHeaderExpertMobileNavbar from "./DashboardHeaderExpertMobileNavbar/DashboardHeaderExpertMobileNavbar";
import DashboardHomeExpert from "./DashboardHomeExpert/DashboardHomeExpert";
import DashboardNotFoundPageExpert from "./DashboardNotFoundPageExpert/DashboardNotFoundPageExpert";
import DashboardSettingsExpert from "./DashboardSettingsExpert/DashboardSettingsExpert";

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
      <div className="h-screen w-full overflow-y-scroll bg-color-gray-secondary py-2 px-2 sm:p-10">
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
          <Route path="*" element={<DashboardNotFoundPageExpert />} />
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

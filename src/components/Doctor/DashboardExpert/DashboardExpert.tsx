import Drawer from "@mui/material/Drawer";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { updateHeaderMobileExpertDashboard } from "../../../features/options/optionsSlice";
import AlertHeaderDanger from "../../Common/AlertHeaderDanger/AlertHeaderDanger";
import AlertHeaderWarning from "../../Common/AlertHeaderWarning/AlertHeaderWarning";
import DashboardAppointmentsChartExpert from "./DashboardAppointmentsChartExpert/DashboardAppointmentsChartExpert";
import DashboardAppointmentsExpert from "./DashboardAppointmentsExpert/DashboardAppointmentsExpert";
import DashboardAppointmentsMeExpert from "./DashboardAppointmentsMeExpert/DashboardAppointmentsMeExpert";
import DashboardCertificateDetailExpert from "./DashboardCertificateDetailExpert/DashboardCertificateDetailExpert";
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
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  return (
    <div className="flex w-full items-start justify-start bg-color-white-secondary">
      <DashboardHeaderExpert />
      <DashboardHeaderExpertMobile />
      <div className="h-screen w-full overflow-y-scroll bg-color-gray-secondary py-2 px-2 sm:p-10">
        <div className="mb-2">
          {authExpertObject?.expert_status === 0 ? (
            <AlertHeaderWarning
              alertHeader={{
                type: "warning",
                text: "Hesabınız bekleme listesindedir.",
              }}
            />
          ) : authExpertObject?.expert_status === 2 ? (
            <AlertHeaderDanger
              alertHeader={{
                type: "warning",
                text: "Hesabınız reddedilmiştir.",
              }}
            />
          ) : (
            <div></div>
          )}
        </div>
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
          <Route
            path="/certificates/:id"
            element={<DashboardCertificateDetailExpert />}
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

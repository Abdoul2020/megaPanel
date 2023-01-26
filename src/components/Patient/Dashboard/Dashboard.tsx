import Drawer from "@mui/material/Drawer";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { updateHeaderMobilePatientDashboard } from "../../../features/options/optionsSlice";
import DashboardAppointmentsPatient from "./DashboardAppointmentsPatient/DashboardAppointmentsPatient";
import DashboardHeaderPatient from "./DashboardHeaderPatient/DashboardHeaderPatient";
import DashboardHeaderPatientMobile from "./DashboardHeaderPatientMobile/DashboardHeaderPatientMobile";
import DashboardHeaderPatientMobileNavbar from "./DashboardHeaderPatientMobileNavbar/DashboardHeaderPatientMobileNavbar";
import DashboardHomePatient from "./DashboardHomePatient/DashboardHomePatient";
import DashboardNotFoundPagePatient from "./DashboardNotFoundPagePatient/DashboardNotFoundPagePatient";
import DashboardSettingsPatient from "./DashboardSettingsPatient/DashboardSettingsPatient";

type Props = {};

export default function Dashboard({}: Props) {
  const dispatch = useDispatch();
  const headerMobilePatientDashboard = useAppSelector(
    (state) => state.options.headerMobilePatientDashboard
  );
  return (
    <div className="flex w-full items-start justify-start bg-color-white-secondary">
      <DashboardHeaderPatient />
      <DashboardHeaderPatientMobile />
      <div className="h-screen w-full overflow-y-scroll bg-color-gray-secondary px-2 sm:p-10">
        <Routes>
          <Route index element={<DashboardHomePatient />} />
          <Route
            path="/appointments"
            element={<DashboardAppointmentsPatient />}
          />
          <Route path="/settings/*" element={<DashboardSettingsPatient />} />
        <Route path="*" element={<DashboardNotFoundPagePatient />} />
        </Routes>
      </div>
      <Drawer
        open={headerMobilePatientDashboard}
        onClose={() => {
          dispatch(updateHeaderMobilePatientDashboard(false));
        }}
        anchor="left"
      >
        <DashboardHeaderPatientMobileNavbar />
      </Drawer>
    </div>
  );
}

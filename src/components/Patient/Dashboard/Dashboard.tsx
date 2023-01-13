import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardAppointmentsPatient from "./DashboardAppointmentsPatient/DashboardAppointmentsPatient";
import DashboardHeaderPatient from "./DashboardHeaderPatient/DashboardHeaderPatient";
import DashboardHomePatient from "./DashboardHomePatient/DashboardHomePatient";
import DashboardSettingsPatient from "./DashboardSettingsPatient/DashboardSettingsPatient";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <div className="w-full flex justify-start items-start bg-color-white-secondary">
      <DashboardHeaderPatient />
      <div className="w-full h-screen p-10 overflow-y-scroll bg-color-gray-secondary">
        <Routes>
          <Route index element={<DashboardHomePatient />} />
          <Route
            path="/appointments"
            element={<DashboardAppointmentsPatient />}
          />
          <Route path="/settings/*" element={<DashboardSettingsPatient />} />
        </Routes>
      </div>
    </div>
  );
}

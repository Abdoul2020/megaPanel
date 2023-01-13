import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardSettingsChangePasswordPatient from "./DashboardSettingsChangePasswordPatient/DashboardSettingsChangePasswordPatient";
import DashboardSettingsHomePatient from "./DashboardSettingsHomePatient/DashboardSettingsHomePatient";

type Props = {};

export default function DashboardSettingsPatient({}: Props) {
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <Routes>
        <Route index element={<DashboardSettingsHomePatient />} />
        <Route
          path="change-password"
          element={<DashboardSettingsChangePasswordPatient />}
        />
      </Routes>
    </div>
  );
}

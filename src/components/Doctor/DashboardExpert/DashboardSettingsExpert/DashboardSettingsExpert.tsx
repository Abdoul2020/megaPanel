import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardSettingsChangePasswordExpert from "./DashboardSettingsChangePasswordExpert/DashboardSettingsChangePasswordExpert";
import DashboardSettingsHomeExpert from "./DashboardSettingsHomeExpert/DashboardSettingsHomeExpert";

type Props = {};

export default function DashboardSettingsExpert({}: Props) {
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <Routes>
        <Route index element={<DashboardSettingsHomeExpert />} />
        <Route
          path="change-password"
          element={<DashboardSettingsChangePasswordExpert />}
        />
      </Routes>
    </div>
  );
}

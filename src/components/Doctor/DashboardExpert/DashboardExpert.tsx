import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardAppointmentsChartExpert from "./DashboardAppointmentsChartExpert/DashboardAppointmentsChartExpert";
import DashboardAppointmentsExpert from "./DashboardAppointmentsExpert/DashboardAppointmentsExpert";
import DashboardAppointmentsMeExpert from "./DashboardAppointmentsMeExpert/DashboardAppointmentsMeExpert";
import DashboardCertificatesExpert from "./DashboardCertificatesExpert/DashboardCertificatesExpert";
import DashboardHeaderExpert from "./DashboardHeaderExpert/DashboardHeaderExpert";
import DashboardHomeExpert from "./DashboardHomeExpert/DashboardHomeExpert";
import DashboardSettingsExpert from "./DashboardSettingsExpert/DashboardSettingsExpert";

type Props = {};

export default function DashboardExpert({}: Props) {
  return (
    <div className="w-full flex justify-start items-start bg-color-white-secondary">
      <DashboardHeaderExpert />
      <div className="w-full h-screen p-10 overflow-y-scroll bg-color-gray-secondary">
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
    </div>
  );
}

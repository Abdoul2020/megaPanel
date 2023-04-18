import { Route, Routes } from "react-router-dom";
import DashboardSettingsChangePasswordExpert from "./DashboardSettingsChangePasswordExpert/DashboardSettingsChangePasswordExpert";
import DashboardSettingsHomeExpert from "./DashboardSettingsHomeExpert/DashboardSettingsHomeExpert";
import DashboardSettingsProfilePreview from "./DashboardSettingsProfilePreviewExpert/DashboardSettingsProfilePreviewExpert";

type Props = {};

export default function DashboardSettingsExpert({}: Props) {
  return (
    <div className="flex w-full flex-col items-start justify-start">
      <Routes>
        <Route index element={<DashboardSettingsHomeExpert />} />
        <Route
          path="profile-preview"
          element={<DashboardSettingsProfilePreview />}
        />
        <Route
          path="change-password"
          element={<DashboardSettingsChangePasswordExpert />}
        />
      </Routes>
    </div>
  );
}

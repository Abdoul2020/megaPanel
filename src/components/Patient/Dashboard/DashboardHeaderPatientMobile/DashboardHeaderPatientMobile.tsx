import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { updateHeaderMobilePatientDashboard } from "../../../../features/options/optionsSlice";

type Props = {};

export default function DashboardHeaderPatientMobile({}: Props) {
  const dispatch = useDispatch();
  return (
    <div className="block px-5 py-5 lg:hidden">
      <GiHamburgerMenu
        className={`text-[24px] text-color-main opacity-80 hover:cursor-pointer`}
        onClick={() => {
          dispatch(updateHeaderMobilePatientDashboard(true));
        }}
      />
    </div>
  );
}

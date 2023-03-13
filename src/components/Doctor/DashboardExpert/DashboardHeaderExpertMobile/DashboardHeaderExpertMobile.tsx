import { GiHamburgerMenu } from "react-icons/gi";
import { GrStatusGoodSmall } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../app/hooks";
import { updateHeaderMobileExpertDashboard } from "../../../../features/options/optionsSlice";

type Props = {};

export default function DashboardHeaderExpertMobile({}: Props) {
  const dispatch = useDispatch();
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  return (
    <div className="block px-5 py-5 lg:hidden">
      <div className="relative">
        <GiHamburgerMenu
          className={`text-[24px] text-color-main opacity-80 hover:cursor-pointer`}
          onClick={() => {
            dispatch(updateHeaderMobileExpertDashboard(true));
          }}
        />
        {authExpertObject?.expert_name !== undefined &&
        authExpertObject?.expert_name !== "" &&
        authExpertObject?.expert_surname !== undefined &&
        authExpertObject?.expert_surname !== "" &&
        authExpertObject?.expert_email !== undefined &&
        authExpertObject?.expert_email !== "" &&
        authExpertObject?.expert_title !== undefined &&
        authExpertObject?.expert_expertise !== undefined &&
        authExpertObject?.expert_physical_location !== undefined &&
        authExpertObject?.expert_physical_location !== "" &&
        authExpertObject?.expert_session_fee !== undefined &&
        authExpertObject?.expert_session_fee !== "" &&
        authExpertObject?.expert_tel !== undefined &&
        authExpertObject?.expert_tel !== "" &&
        authExpertObject?.expert_operating_type !== undefined &&
        authExpertObject?.expert_about_me !== undefined &&
        authExpertObject?.expert_about_me !== "" &&
        authExpertObject?.expert_city !== undefined &&
        authExpertObject?.expert_city !== "" &&
        authExpertObject?.expert_country !== undefined &&
        authExpertObject?.expert_country !== "" &&
        authExpertObject?.expert_postal_code !== undefined &&
        authExpertObject?.expert_postal_code !== "" &&
        authExpertObject?.expert_avatar_path !== undefined &&
        authExpertObject?.expert_avatar_path !== "" ? (
          <div></div>
        ) : (
          <GrStatusGoodSmall className="absolute -top-[5px] -right-[5px] text-[12px] text-color-warning-primary" />
        )}
      </div>
    </div>
  );
}

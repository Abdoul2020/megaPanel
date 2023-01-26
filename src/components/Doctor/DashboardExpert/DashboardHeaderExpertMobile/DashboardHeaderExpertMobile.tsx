import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { updateHeaderMobileExpertDashboard } from "../../../../features/options/optionsSlice";

type Props = {};

export default function DashboardHeaderExpertMobile({}: Props) {
  const dispatch = useDispatch();
  return (
    <div className="block lg:hidden px-5 py-5">
      <GiHamburgerMenu
        className={`text-[24px] text-color-main opacity-80 hover:cursor-pointer`}
        onClick={() => {
          dispatch(updateHeaderMobileExpertDashboard(true));
        }}
      />
    </div>
  );
}

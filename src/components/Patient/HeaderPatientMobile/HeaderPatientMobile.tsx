import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { updateHeaderMobilePatient } from "../../../features/options/optionsSlice";

type Props = {};

export default function HeaderPatientMobile({}: Props) {
  const dispatch = useDispatch();
  const pathname = useAppSelector((state) => state.options.pathname);
  return (
    <div className="absolute top-0 z-10 flex h-[90px] w-full items-center justify-between px-10 lg:hidden">
      <Link to="/">
        {pathname === "/" || pathname === "/for-doctors" ? (
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              ease: "backInOut",
              duration: 0.5,
              reapat: 1,
            }}
            viewport={{ once: true }}
            src={require("../../../assets/images/megaverse_logo_8.png")}
            alt=""
            className="h-10"
          />
        ) : (
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              ease: "backInOut",
              duration: 0.5,
              reapat: 1,
            }}
            viewport={{ once: true }}
            src={require("../../../assets/images/megaverse_logo_3.png")}
            alt=""
            className="h-10"
          />
        )}
      </Link>
      <GiHamburgerMenu
        className={`text-[48px] ${
          pathname === "/" || pathname === "/for-doctors"
            ? "text-color-white-secondary"
            : "text-color-main"
        } opacity-50 hover:cursor-pointer`}
        onClick={() => {
          dispatch(updateHeaderMobilePatient(true));
        }}
      />
    </div>
  );
}

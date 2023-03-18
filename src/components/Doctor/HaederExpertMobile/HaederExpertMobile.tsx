import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateHeaderMobileExpert } from "../../../features/options/optionsSlice";

type Props = {};

export default function HaederExpertMobile({}: Props) {
  const dispatch = useDispatch();
  return (
    <div className="absolute top-0 z-50 flex h-[90px] w-full items-center justify-between px-10 lg:hidden">
      <Link to="/experts">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            ease: "backInOut",
            duration: 0.5,
            reapat: 1,
          }}
          viewport={{ once: true }}
          src={require("../../../assets/images/megaverse_logo_4.png")}
          alt=""
          className="h-8"
        />
      </Link>
      <GiHamburgerMenu
        className="text-[32px] text-color-main opacity-50 hover:cursor-pointer"
        onClick={() => {
          dispatch(updateHeaderMobileExpert(true));
        }}
      />
    </div>
  );
}

import { FaStethoscope } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

type Props = {};

export default function NotFoundPage({}: Props) {
  return (
    <div className="bg-doctor-color-main flex h-screen w-full items-center justify-center">
      <img
        src={require("../../../assets/images/page_not_found_tsp.png")}
        alt=""
        className="h-1/2"
      />
    </div>
  );
}

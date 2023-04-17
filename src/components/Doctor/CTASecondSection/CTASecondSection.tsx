import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

type Props = {};

export default function CTASecondSection({}: Props) {
  return (
    <div className="flex w-full items-center justify-center bg-color-white-secondary py-0 pt-40 px-10 lg:px-0">
      <div className="relative flex lg:grid w-full lg:w-2/3 grid-cols-2 rounded-[30px] bg-doctor-color-main px-10 py-20">
        <div></div>
        <div className="z-20 flex flex-col items-start justify-center gap-10">
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-3xl font-bold text-color-dark-primary">
                Uzmanlar için Megaverse!
              </h1>
            </div>
            <p className="text-color-dark-primary">
              Bulut tabanlı, Uluslararası kişisel gelişim portalı Megaverse,
              seans alan ve seans vereni tek portalda birleştiren ilk ve tek
              platformdur.
            </p>
          </div>
          <Link to="#banner">
            <button
              className="flex items-center justify-center gap-2 rounded-[15px] bg-color-third
           py-4 px-8 transition-all duration-300 hover:cursor-pointer hover:opacity-80"
            >
              <h1 className="font-bold text-color-white-secondary">
                Hemen Dene
              </h1>
              <BsArrowRight className="text-[24px] text-color-white-secondary" />
            </button>
          </Link>
        </div>
        <div className="absolute grid h-full w-full grid-cols-2">
          <div className="lg:flex hidden relative items-center justify-center">
            <img
              src={require("../../../assets/images/uzman.webp")}
              alt=""
              className="absolute bottom-0 max-w-[60%]"
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

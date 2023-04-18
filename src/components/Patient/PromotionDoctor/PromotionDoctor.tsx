import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

type Props = {};

export default function PromotionDoctor({}: Props) {
  return (
    <div className="flex w-full items-center justify-center bg-color-white-secondary py-20 px-10 pt-40 lg:px-0">
      <div className="relative flex w-full grid-cols-2 rounded-[30px] bg-doctor-color-main px-10 py-20 lg:grid lg:w-2/3">
        <div></div>
        <div className="z-20 flex flex-col items-start justify-center gap-10">
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-3xl font-bold text-color-dark-primary">
                Uzmanlar için Megaverse!
              </h1>
            </div>
            <p className="text-color-dark-primary">
              Megaverse Uluslararası Kişisel Gelişim Portalı, Bülent
              Gardiyaoğlu’nun 10 yılı aşkın emeği ve birikimini tek bir çatıda
              toplayan, danışan ve danışmanları bir araya getiren, her iki
              tarafa da kolaylıklar sağlayan bir kişisel gelişim portalıdır.
            </p>
          </div>
          <Link to="/experts/#banner">
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
          <div className="relative hidden items-center justify-center lg:flex">
            <img
              src={require("../../../assets/images/uzman2.webp")}
              alt=""
              className="absolute bottom-0 max-w-[70%]"
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

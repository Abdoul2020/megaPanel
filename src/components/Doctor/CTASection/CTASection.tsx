import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

type Props = {};

export default function CTASection({}: Props) {
  return (
    <div className="flex w-full items-center justify-center bg-color-white-secondary py-10 px-10 lg:px-0">
      <div className="flex w-full grid-cols-2 rounded-[30px] bg-color-main px-10 md:grid lg:w-2/3">
        <div className="relative flex items-center justify-center">
          <div className="absolute left-0 bottom-0 hidden h-full w-full items-center justify-center md:flex">
            <img
              src={require("../../../assets/images/megaverse_nedir.webp")}
              alt=""
              className="max-w-[80%]"
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-10 py-16">
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-3xl font-bold text-color-white-secondary">
                MEGAVERSE NEDİR?
              </h1>
            </div>
            <p className="text-color-white-secondary">
              Megaverse Uluslararası Kişisel Gelişim Portalı danışan ve
              danışmanları bir araya getiren, iyileşme yoluna adım atan herkesi
              kucaklayan, dünyayı daha güzel bir yer yapma misyonuna sahip bütün
              profesyonelleri bünyesine davet eden bir platformdur.
            </p>
          </div>
          <Link to="/about">
            <motion.button
              initial={{ opacity: 0, x: "-50%" }}
              whileInView={{ opacity: 1, x: "0%" }}
              transition={{
                ease: "backInOut",
                duration: 0.3,
                reapat: 1,
              }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 rounded-[15px] bg-color-third
           py-4 px-8 transition-all duration-300 hover:cursor-pointer hover:opacity-80"
            >
              <h1 className="font-bold text-color-white-secondary">
                Detaylı İncele
              </h1>
              <BsArrowRight className="text-[24px] text-color-white-secondary" />
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

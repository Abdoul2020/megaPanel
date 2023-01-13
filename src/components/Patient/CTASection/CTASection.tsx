import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";

type Props = {};

export default function CTASection({}: Props) {
  return (
    <div className="w-full bg-color-white-secondary flex justify-center items-center py-20">
      <div className="w-2/3 bg-color-main rounded-[30px] grid grid-cols-2 px-10 py-10">
        <div className="relative flex justify-center items-center">
          <div className="absolute w-full h-full flex justify-center items-center">
            <img
              src={require("../../../assets/images/dunya.png")}
              alt=""
              className="max-w-[70%]"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-start gap-10">
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-3xl font-bold text-color-white-secondary">
                MEGAVERSE NEDİR?
              </h1>
            </div>
            <p className="text-color-white-secondary">
              Megaverse Uluslararası Kişisel Gelişim Portalı,
              BülentGardiyanoğlu'nun bireysel olarak geliştirdiği, 10 yıllık
              emeği barındıran bir çalışma yöntemidir. Tüm teknik imkanlarıyla
              kişisel gelişim hizmeti vermek ve bu hizmetten yararlanmak
              isteyenlere çözüm için hazırlanmıştır!
            </p>
          </div>
          <motion.button
            initial={{ opacity: 0, x: "-50%" }}
            whileInView={{ opacity: 1, x: "0%" }}
            transition={{
              ease: "backInOut",
              duration: 0.3,
              reapat: 1,
            }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-2 bg-color-third rounded-[15px]
           py-4 px-8 hover:opacity-80 hover:cursor-pointer transition-all duration-300"
          >
            <h1 className="text-color-white-secondary font-bold">
              Detaylı İncele
            </h1>
            <BsArrowRight className="text-color-white-secondary text-[24px]" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

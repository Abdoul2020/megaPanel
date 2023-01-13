import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function ProcessSection({}: Props) {
  return (
    <div className="py-20 w-full relative bg-color-white-secondary flex flex-col justify-center items-center">
      <div className="w-2/3 flex flex-col justify-center items-start gap-21">
        <h1 className="text-2xl text-color-dark-primary font-bold">
          Sürecimiz Nasıl İlerliyor?
        </h1>
        <p className="text-color-dark-primary opacity-70">
          Voluptate ipsum exercitation ipsum Lorem mollit consequat adipisicing
          esse quis.
        </p>
      </div>
      <div className="z-10 w-2/3 py-20 relative flex justify-center items-center">
        <div className="h-full w-full absolute flex justify-center items-center">
          <img src={require("../../../assets/images/icons/kusak.png")} alt="" />
        </div>
        <div className="z-20 flex justify-center items-center gap-[200px]">
          <div className="flex flex-col justify-center items-center gap-8 relative">
            <div className="bg-color-white rounded-[50px] p-12 shadow-xl h-[200px] w-[200px]">
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  ease: "backInOut",
                  duration: 0.5,
                  reapat: 1,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
                src={require("../../../assets/images/icons/rating.png")}
                alt=""
              />
            </div>
            <div className="absolute top-full w-[150%] flex justify-center items-center py-8">
              <h1 className="text-xl font-bold opacity-80 text-color-dark-primary text-center">
                Sertifikalı Uzman Ara
              </h1>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-8 relative">
            <div className="bg-color-white rounded-[50px] p-12 shadow-xl h-[200px] w-[200px]">
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  ease: "backInOut",
                  duration: 0.6,
                  reapat: 1,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
                src={require("../../../assets/images/icons/medical-assistance.png")}
                className="bg-cover"
                alt=""
              />
            </div>
            <div className="absolute top-full w-[150%] flex justify-center items-center py-8">
              <h1 className="text-xl font-bold opacity-80 text-color-dark-primary text-center">
                Uzman Profilini Görüntüle
              </h1>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-8 relative">
            <div className="bg-color-white rounded-[50px] p-12 shadow-xl h-[200px] w-[200px]">
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  ease: "backInOut",
                  duration: 0.7,
                  reapat: 1,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
                src={require("../../../assets/images/icons/meeting.png")}
                alt=""
              />
            </div>
            <div className="absolute top-full w-[150%] flex justify-center items-center py-8">
              <h1 className="text-xl font-bold opacity-80 text-color-dark-primary text-center">
                Randevu Al
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

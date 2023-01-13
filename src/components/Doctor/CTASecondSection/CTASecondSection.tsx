import React from "react";
import { BsArrowRight } from "react-icons/bs";

type Props = {};

export default function CTASecondSection({}: Props) {
  return (
    <div className="w-full bg-color-white-secondary flex justify-center items-center py-20 pt-40">
      <div className="w-2/3 relative bg-doctor-color-main rounded-[30px] grid grid-cols-2 px-10 py-20">
        <div></div>
        <div className="flex flex-col justify-center items-start gap-10 z-20">
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="flex flex-col justify-center items-start">
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
          <button
            className="flex justify-center items-center gap-2 bg-color-third rounded-[15px]
           py-4 px-8 hover:opacity-80 hover:cursor-pointer transition-all duration-300"
          >
            <h1 className="text-color-white-secondary font-bold">Hemen Dene</h1>
            <BsArrowRight className="text-color-white-secondary text-[24px]" />
          </button>
        </div>
        <div className="absolute w-full h-full grid grid-cols-2">
          <div className="relative flex justify-center items-center">
            <img
              src={require("../../../assets/images/gorsel_3.png")}
              alt=""
              className="absolute bottom-0 max-w-[80%]"
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

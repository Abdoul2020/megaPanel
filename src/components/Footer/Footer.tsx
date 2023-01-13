import React from "react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiFillLinkedin,
} from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type Props = {};

export default function Footer({}: Props) {
  const forDoctors = useAppSelector((state) => state.options.forDoctors);
  const dispatch = useAppDispatch();
  return (
    <div
      className={`w-full relative ${
        forDoctors ? "bg-white" : "bg-color-white"
      } py-20 flex justify-center items-center`}
    >
      <div className="w-2/3 flex flex-col justify-center items-start">
        <div className="grid grid-flow-col gap-40 pb-20">
          <div className="col-span-2 flex flex-col justify-center items-start gap-6">
            <img
              src={require("../../assets/images/megaverse_logo_7.png")}
              alt=""
              className="h-20"
            />
            <p className="text-color-dark-primary opacity-50">
              Magna ullamco non cupidatat excepteur ad commodo nisi labore
              aliqua commodo. Consequat esse amet cupidatat fugiat aute amet
              consectetur tempor laborum. Ex non veniam qui sit laborum eiusmod
              minim aliqua laborum.
            </p>
            <div className="flex flex-col justify-center items-start gap-2">
              <h1 className="font-bold text-lg text-color-dark-primary opacity-80">
                Bizi takip edin
              </h1>
              <ul className="flex justify-center items-center gap-4">
                <li>
                  <AiFillInstagram className="text-color-main h-[30px] w-[30px] opacity-30" />
                </li>
                <li>
                  <AiFillTwitterCircle className="text-color-main h-[30px] w-[30px] opacity-30" />
                </li>
                <li>
                  <AiFillFacebook className="text-color-main h-[30px] w-[30px] opacity-30" />
                </li>
                <li>
                  <AiFillYoutube className="text-color-main h-[30px] w-[30px] opacity-30" />
                </li>
                <li>
                  <AiFillLinkedin className="text-color-main h-[30px] w-[30px] opacity-30" />
                </li>
              </ul>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="py-2 px-6 bg-color-main flex justify-center items-center gap-2 rounded-[15px]">
                <img
                  src={require("../../assets/images/play-logo-1.png")}
                  alt=""
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col justify-center items-start">
                  <h1 className="text-color-white text-xs">GET IT ON</h1>
                  <h1 className="text-color-white font-bold text-lg">
                    Google Play
                  </h1>
                </div>
              </div>
              <div className="py-2 px-6 bg-color-main flex justify-center items-center gap-2 rounded-[15px]">
                <img
                  src={require("../../assets/images/apple-logo-1.png")}
                  alt=""
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col justify-center items-start">
                  <h1 className="text-color-white text-xs">Download on the</h1>
                  <h1 className="text-color-white font-bold text-lg">
                    App Store
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex justify-center items-start gap-8">
            <div className="flex flex-col justify-center items-start gap-4">
              <h1 className="text-lg text-color-dark-primary font-bold opacity-80">
                Megaverse
              </h1>
              <ul className="flex flex-col justify-start items-start gap-2">
                <li className="text-base text-color-dark-primary opacity-50">
                  Hakkımızda
                </li>
                <li className="text-base text-color-dark-primary opacity-50">
                  İletişim
                </li>
                <li className="text-base text-color-dark-primary opacity-50">
                  Çerezlere İlişkin Aydınlatma Metni
                </li>
                <li className="text-base text-color-dark-primary opacity-50">
                  Kariyer
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center items-start gap-4">
              <h1 className="text-lg text-color-dark-primary font-bold opacity-80">
                Megaverse
              </h1>
              <ul className="flex flex-col justify-start items-start gap-2">
                <li className="text-base text-color-dark-primary opacity-50">
                  Hakkımızda
                </li>
                <li className="text-base text-color-dark-primary opacity-50">
                  İletişim
                </li>
                <li className="text-base text-color-dark-primary opacity-50">
                  Çerezlere İlişkin Aydınlatma Metni
                </li>
                <li className="text-base text-color-dark-primary opacity-50">
                  Kariyer
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center items-start gap-4">
              <h1 className="text-lg text-color-dark-primary font-bold opacity-80s">
                Megaverse
              </h1>
              <ul className="flex flex-col justify-start items-start gap-2">
                <li className="text-base text-color-dark-primary opacity-50">
                  Hakkımızda
                </li>
                <li className="text-base text-color-dark-primary opacity-50">
                  İletişim
                </li>
                <li className="text-base text-color-dark-primary opacity-50">
                  Çerezlere İlişkin Aydınlatma Metni
                </li>
                <li className="text-base text-color-dark-primary opacity-50">
                  Kariyer
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start items-start border-t-2 border-solid border-color-dark-primary border-opacity-10 pt-10">
          <h1>© 2022 Megaverse Teknoloji A.Ş. Tüm hakları saklıdır.</h1>
        </div>
      </div>
    </div>
  );
}

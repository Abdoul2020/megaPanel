import React from "react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiFillLinkedin,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

type Props = {};

export default function Footer({}: Props) {
  const forDoctors = useAppSelector((state) => state.options.forDoctors);
  return (
    <div
      className={`relative flex w-full items-center justify-center bg-color-white py-20`}
    >
      <div className="flex w-2/3 flex-col items-start justify-center">
        <div className="grid grid-flow-col grid-cols-5 gap-20 pb-20">
          <div className="col-span-3 flex flex-col items-start justify-center gap-6">
            <img
              src={require("../../assets/images/megaverse_logo_7.png")}
              alt=""
              className="h-20"
            />
            <p className="text-color-dark-primary opacity-50">
              Megaverse Uluslararası Kişisel Gelişim Portalı, Bülent
              Gardiyaoğlu’nun 10 yılı aşkın emeği ve birikimini tek bir çatıda
              toplayan, danışan ve danışmanları bir araya ge- tiren, her iki
              tarafa da kolaylıklar sağlayan bir kişisel gelişim portalıdır.
            </p>
            {/* <div className="flex flex-col items-start justify-center gap-2">
              <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
                Bizi takip edin
              </h1>
              <ul className="flex items-center justify-center gap-4">
                <li>
                  <AiFillInstagram className="h-[30px] w-[30px] text-color-main opacity-30" />
                </li>
                <li>
                  <AiFillTwitterCircle className="h-[30px] w-[30px] text-color-main opacity-30" />
                </li>
                <li>
                  <AiFillFacebook className="h-[30px] w-[30px] text-color-main opacity-30" />
                </li>
                <li>
                  <AiFillYoutube className="h-[30px] w-[30px] text-color-main opacity-30" />
                </li>
                <li>
                  <AiFillLinkedin className="h-[30px] w-[30px] text-color-main opacity-30" />
                </li>
              </ul>
            </div> */}
            {/* <div className="flex items-center justify-center gap-2">
              <div className="flex items-center justify-center gap-2 rounded-[15px] bg-color-main py-2 px-6">
                <img
                  src={require("../../assets/images/play-logo-1.png")}
                  alt=""
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-xs text-color-white">GET IT ON</h1>
                  <h1 className="text-lg font-bold text-color-white">
                    Google Play
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-[15px] bg-color-main py-2 px-6">
                <img
                  src={require("../../assets/images/apple-logo-1.png")}
                  alt=""
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-xs text-color-white">Download on the</h1>
                  <h1 className="text-lg font-bold text-color-white">
                    App Store
                  </h1>
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-span-2 flex items-start justify-start gap-8">
            <div className="flex flex-col items-start justify-start gap-4">
              <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
                Megaverse
              </h1>
              <ul className="flex flex-col items-start justify-start gap-2">
                <Link to="about">
                  <li className="text-base text-color-dark-primary opacity-50">
                    Hakkımızda
                  </li>
                </Link>
                <Link to="faq">
                  <li className="text-base text-color-dark-primary opacity-50">
                    S.S.S
                  </li>
                </Link>
                {/* <li className="text-base text-color-dark-primary opacity-50">
                  İletişim
                </li>
                <li className="text-base text-color-dark-primary opacity-50">
                  Çerezlere İlişkin Aydınlatma Metni
                </li>
                <li className="text-base text-color-dark-primary opacity-50">
                  Kariyer
                </li> */}
              </ul>
            </div>
            {/* <div className="flex flex-col justify-center items-start gap-4">
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
            </div> */}
          </div>
        </div>
        <div className="flex w-full items-start justify-start border-t-2 border-solid border-color-dark-primary border-opacity-10 pt-10 opacity-50">
          <h1>© 2022 Megaverse Teknoloji A.Ş. Tüm hakları saklıdır.</h1>
        </div>
      </div>
    </div>
  );
}

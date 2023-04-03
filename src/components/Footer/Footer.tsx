import { AiFillInstagram, AiFillMail, AiFillPhone } from "react-icons/ai";
import { FaPinterestP, FaTelegramPlane, FaTiktok } from "react-icons/fa";
import { RiLinkedinFill, RiTwitterFill, RiYoutubeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="relative flex w-full items-center justify-center bg-color-white px-6 xl:px-0">
      <div className="flex overflow-hidden relative w-full flex-col items-start justify-center xl:w-2/3">
        <img
          src={require("../../assets/images/megaverse_logo_3.png")}
          alt=""
          className="absolute left-0 bottom w-auto opacity-5"
        />
        <div className="flex w-full items-center justify-end border-b-2 border-solid border-color-dark-primary border-opacity-10 py-3 opacity-50">
          <ul className="flex items-start justify-start gap-4">
            <li className="flex items-center justify-center gap-2">
              <AiFillPhone className="text-color-main" />
              <a href="tel:+908503907262">
                <h1 className="text-base text-color-dark-primary opacity-50">
                  +90 (850) 390 7262
                </h1>
              </a>
            </li>
            <li className="flex items-center justify-center gap-2">
              <AiFillMail className="text-color-main" />
              <a href="mailto:info@megaverse.coach">
                <h1 className="text-base text-color-dark-primary opacity-50">
                  info@megaverse.coach
                </h1>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex grid-flow-col grid-cols-4 flex-col items-start justify-start gap-10 py-10 xl:grid xl:gap-20">
          <div className="col-span-2 flex flex-col items-start justify-center gap-6">
            <div className="flex w-full items-start justify-start">
              <img
                src={require("../../assets/images/megaverse_logo_7.png")}
                alt=""
                className="h-20"
              />
            </div>
            <p className="text-color-dark-primary opacity-50">
              Megaverse Uluslararası Kişisel Gelişim Portalı danışan ve
              danışmanları bir araya getiren, iyileşme yoluna adım atan herkesi
              kucaklayan, dünyayı daha güzel bir yer yapma misyonuna sahip bütün
              profesyonelleri bünyesine davet eden bir platformdur.
            </p>
            <div className="flex flex-col items-start justify-center gap-2">
              <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
                Bizi takip edin
              </h1>

              <ul className="flex flex-wrap items-center justify-start gap-4">
                <li>
                  <a href="https://twitter.com/megaversecoach">
                    <RiTwitterFill className="text-[32px] text-color-main opacity-50" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/megaversecoach"
                    target="_blank"
                  >
                    <AiFillInstagram className="text-[32px] text-color-main opacity-50" />
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/@megaversecoach" target="_blank">
                    <RiYoutubeFill className="text-[32px] text-color-main opacity-50" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/megaversecoach"
                    target="_blank"
                  >
                    <RiLinkedinFill className="text-[32px] text-color-main opacity-50" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://tr.pinterest.com/megaversecoach"
                    target="_blank"
                  >
                    <FaPinterestP className="text-[32px] text-color-main opacity-50" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@megaversecoach"
                    target="_blank"
                  >
                    <FaTiktok className="text-[30px] text-color-main opacity-50" />
                  </a>
                </li>
                <li>
                  <a href="https://t.me/megaversecoach" target="_blank">
                    <FaTelegramPlane className="text-[32px] text-color-main opacity-50" />
                  </a>
                </li>
              </ul>
            </div>
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
            {/* <div className="flex flex-col items-start justify-start gap-4">
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
              </ul>
            </div> */}
            <div className="flex flex-col items-start justify-center gap-4">
              <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
                Megaverse
              </h1>
              <ul className="flex flex-col items-start justify-start gap-2">
                <Link to="about">
                  <li className="text-base text-color-dark-primary opacity-50">
                    Hakkımızda
                  </li>
                </Link>
                <Link to="about">
                  <li className="text-base text-color-dark-primary opacity-50">
                    İletişim
                  </li>
                </Link>
                <Link to="faq">
                  <li className="text-base text-color-dark-primary opacity-50">
                    S.S.S
                  </li>
                </Link>
                {/* <Link to="about">
                  <li className="text-base text-color-dark-primary opacity-50">
                    KVKK
                  </li>
                </Link>
                <Link to="faq">
                  <li className="text-base text-color-dark-primary opacity-50">
                    Gizlilik Koşulları
                  </li>
                </Link>
                <Link to="faq">
                  <li className="text-base text-color-dark-primary opacity-50">
                    Kullanıcı Sözleşmesi
                  </li>
                </Link> */}
              </ul>
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
              <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
                Danışanlar için
              </h1>
              <ul className="flex flex-col items-start justify-start gap-2">
                <li className="flex items-center justify-center gap-2">
                  <AiFillPhone className="text-color-main" />
                  <a href="tel:+908503907262">
                    <h1 className="text-base text-color-dark-primary opacity-50">
                      +90 (850) 390 7262
                    </h1>
                  </a>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <AiFillMail className="text-color-main" />
                  <a href="mailto:info@megaverse.coach">
                    <h1 className="text-base text-color-dark-primary opacity-50">
                      info@megaverse.coach
                    </h1>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
              <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
                Uzmanlar için
              </h1>
              <ul className="flex flex-col items-start justify-start gap-2">
                <li className="flex items-center justify-center gap-2">
                  <AiFillPhone className="text-color-main" />
                  <a href="tel:+908503907262">
                    <h1 className="text-base text-color-dark-primary opacity-50">
                      +90 (850) 390 7262
                    </h1>
                  </a>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <AiFillMail className="text-color-main" />
                  <a href="mailto:info@megaverse.coach">
                    <h1 className="text-base text-color-dark-primary opacity-50">
                      info@megaverse.coach
                    </h1>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between border-t-2 border-solid border-color-dark-primary border-opacity-10 py-10 opacity-50">
          <h1>
            Megaverse Coach bir voipmax ltd şti iştirakidir COPYRIGHT Megaverse
            Coach 2023
          </h1>
          <img
            src={require("../../assets/images/odeme_yontemleri.webp")}
            alt=""
            className="h-[42px]"
          />
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCameraVideoFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdLanguage, MdLocationPin } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSmartphone } from "react-icons/fi";
import { FaClinicMedical } from "react-icons/fa";
import CalendarOnline from "../DoctorCard/CalendarOnline/CalendarOnline";
import CalendarLocation from "../DoctorCard/CalendarLocation/CalendarLocation";
import { BiLoaderAlt } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { AiFillHome } from "react-icons/ai";
import { GiDoctorFace, GiRotaryPhone } from "react-icons/gi";
import { GrLanguage } from "react-icons/gr";

type Props = {};

export default function DoctorDetail({}: Props) {
  const [informationFeature, setInformationFeature] = useState(0);
  const [online, setOnline] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(false);

  const handleCalendarChange = () => {
    setCalendarLoading(true);
    setOnline((value) => !value);
    setTimeout(() => {
      setCalendarLoading(false);
    }, 500);
  };
  const doctor = {
    id: 1,
    name: "Dr. Julia Jhone",
    specialty: "MBBS, MS - General Surgery, MCh",
    location: "G87P, Birmingham, UK",
    available: true,
    rate: 32,
  };
  return (
    <div className="snap-y snap-mandatory w-full bg-color-white-secondary flex flex-col justify-center items-center">
      <div className="w-full bg-color-white-secondary flex justify-center items-end">
        <div className="snap-y snap-mandatory mt-[25vh] w-2/3 grid grid-cols-5">
          <section
            id="profile"
            className="w-full flex flex-col justify-start items-start gap-6 col-span-3 pr-8"
          >
            <div className="w-full flex justify-start items-start gap-4">
              <div className="w-[150px] h-[150px] rounded-[15px]">
                <img
                  src={require(`../../../assets/images/team/team-${doctor.id}.jpg`)}
                  alt=""
                  className="w-[150px] rounded-[15px]"
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <div className="flex justify-center items-center gap-2">
                  <Link to={`/doctors/${doctor.id}`}>
                    <h1 className="hover:text-color-main transition-all duration-300 hover:cursor-pointer text-2xl font-bold text-color-dark-primary text-center">
                      {doctor.name}
                    </h1>
                  </Link>
                  <AiFillCheckCircle className="text-[24px] text-color-success-primary" />
                </div>
                <h1 className="text-color-dark-primary opacity-80 text-center text-lg">
                  {doctor.specialty}
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-2 justify-center items-start gap-6">
              <div className="flex justify-center items-center gap-2">
                <MdLocationPin className="text-color-main opacity-80 text-[24px]" />
                <h1 className="text-color-dark-primary opacity-80 text-lg">
                  {doctor.location}
                </h1>
              </div>
              <div className="flex justify-center items-center gap-2">
                <BsCameraVideoFill className="text-color-main opacity-80 text-[24px]" />
                <h1 className="text-color-dark-primary opacity-80 text-lg">
                  Online Görüşmeye Uygun
                </h1>
              </div>
              <div className="flex justify-start items-start gap-2">
                <CgSandClock className="text-color-main ml-3 opacity-80 text-[24px]" />
                <h1 className="text-color-dark-primary opacity-80 text-lg">
                  30 Dakika
                </h1>
              </div>
            </div>
            <div
              className="w-full pt-4 border-t-[1px] border-solid
             border-color-dark-primary border-opacity-10"
            >
              <ul className="w-full grid grid-cols-4">
                <Link to="#profile">
                  <li
                    className="flex flex-col justify-center items-center gap-2 relative pb-4 px-2 group hover:cursor-pointer"
                    onClick={() => setInformationFeature(0)}
                  >
                    <div
                      className={`flex justify-center items-center gap-2 transition-all duration-300 ${
                        informationFeature === 0 ? "opacity-80" : "opacity-50"
                      }`}
                    >
                      <GoPerson className="text-color-dark-primary text-[24px] font-bold" />
                    </div>
                    {informationFeature === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "100%" }}
                        transition={{
                          ease: "backInOut",
                          duration: 0.3,
                          reapat: 1,
                        }}
                        className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full bg-color-main"
                      ></motion.div>
                    ) : (
                      <div className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full"></div>
                    )}
                  </li>
                </Link>
                <Link to="#addresses">
                  <li
                    className="flex flex-col justify-center items-center gap-2 relative pb-4 px-2 group hover:cursor-pointer"
                    onClick={() => setInformationFeature(1)}
                  >
                    <h1
                      className={`text-color-dark-primary text-[16px] font-bold transition-all duration-300 ${
                        informationFeature === 1 ? "opacity-80" : "opacity-50"
                      }`}
                    >
                      Adresler
                    </h1>
                    {informationFeature === 1 ? (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "100%" }}
                        transition={{
                          ease: "backInOut",
                          duration: 0.3,
                          reapat: 1,
                        }}
                        className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full bg-color-main"
                      ></motion.div>
                    ) : (
                      <div className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full"></div>
                    )}
                  </li>
                </Link>
                <Link to="#resume">
                  <li
                    className="flex flex-col justify-center items-center gap-2 relative pb-4 px-2 group hover:cursor-pointer"
                    onClick={() => setInformationFeature(2)}
                  >
                    <h1
                      className={`text-color-dark-primary text-[16px] font-bold transition-all duration-300 ${
                        informationFeature === 2 ? "opacity-80" : "opacity-50"
                      }`}
                    >
                      Özgeçmiş
                    </h1>
                    {informationFeature === 2 ? (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "100%" }}
                        transition={{
                          ease: "backInOut",
                          duration: 0.3,
                          reapat: 1,
                        }}
                        className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full bg-color-main"
                      ></motion.div>
                    ) : (
                      <div className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full"></div>
                    )}
                  </li>
                </Link>
                <li
                  className="flex flex-col justify-center items-center gap-2 relative pb-4 px-2 group hover:cursor-pointer"
                  onClick={() => setInformationFeature(3)}
                >
                  <h1
                    className={`text-color-dark-primary text-[16px] font-bold transition-all duration-300 ${
                      informationFeature === 3 ? "opacity-80" : "opacity-50"
                    }`}
                  >
                    Görüşler
                  </h1>
                  {informationFeature === 3 ? (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "100%" }}
                      transition={{
                        ease: "backInOut",
                        duration: 0.3,
                        reapat: 1,
                      }}
                      className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full bg-color-main"
                    ></motion.div>
                  ) : (
                    <div className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full"></div>
                  )}
                </li>
              </ul>
            </div>
          </section>
          <div className="col-span-2 w-full h-full relative">
            <div
              className="absolute top-1/3 w-full bg-color-white shadow-sm grid grid-rows-3 
            transition-all duration-300 rounded-[25px] p-6"
            >
              <div
                className="row-span-1 flex flex-col justify-center items-center border-b-[1px] border-solid
             border-color-dark-primary border-opacity-10"
              >
                <div className="h-[75px] bg-color-third rounded-[30px] p-2">
                  <div className="h-full grid grid-cols-2 relative p-2">
                    <div
                      className="h-full p-3 px-10 flex justify-center items-center cursor-pointer"
                      onClick={handleCalendarChange}
                    >
                      <h1 className="h-full text-sm font-bold text-color-white z-50">
                        Online Görüşme
                      </h1>
                    </div>
                    <div
                      className="h-full py-3 px-10 flex justify-center items-center cursor-pointer"
                      onClick={handleCalendarChange}
                    >
                      <h1 className="h-full text-sm font-bold text-color-white z-50">
                        Yüz Yüze Randevu
                      </h1>
                    </div>
                    <div
                      className={`transition-all duration-500 ${
                        online ? "translate-x-0" : "translate-x-full"
                      } h-full w-1/2 bg-color-secondary absolute rounded-[25px] pointer-events-none`}
                    ></div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center py-6">
                  {online ? (
                    <div className="flex justify-between gap-4 items-center w-full px-2">
                      <div className="flex justify-center items-start gap-4">
                        <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                          <FiSmartphone className="text-[24px] text-color-main" />
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <h1 className="text-base text-color-dark-primary opacity-80 font-bold">
                            Online Konsültasyon.
                          </h1>
                          <h1 className="text-sm text-color-dark-primary opacity-50">
                            Evinden ayrılmadan doktoruna ulaş, görüntülü
                            görüşerek muayene ol.
                          </h1>
                        </div>
                      </div>
                      <h1 className="text-xl text-color-dark-primary opacity-90">
                        350₺
                      </h1>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-between gap-4 items-start w-full px-2">
                      <div className="flex justify-center items-start gap-4">
                        <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                          <FaClinicMedical className="text-[24px] text-color-main" />
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <h1 className="text-sm text-color-dark-primary opacity-50">
                            Klinik Bilgisi
                          </h1>
                          <h1 className="text-base text-color-dark-primary opacity-80 font-bold">
                            MİHRİMAHSULTAN TIP MERKEZİ
                          </h1>
                        </div>
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        <MdLocationPin className="text-color-main text-[16px]" />
                        <h1>Mimar Sinan, Paşa Limanı Cd. No:4, 34664 Üsk</h1>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row-span-2 w-full">
                <div className="relative flex justify-center items-center w-full h-full">
                  {/* {online ? <CalendarOnline /> : <CalendarLocation />} */}
                  <div
                    className={`${
                      calendarLoading ? "flex" : "hidden"
                    } absolute top-0 left-0 h-full w-full bg-color-white z-10`}
                  >
                    <div className="h-full w-full flex justify-center items-center">
                      <div className="animate-spin">
                        <BiLoaderAlt className="text-color-main text-[48px] text-opacity-80" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[75vh] bg-color-white-secondary w-full justify-center py-20 flex items-start">
        <div className="w-2/3 grid grid-cols-5">
          <div className="snap-y snap-mandatory col-span-3 pr-8 flex flex-col justify-start items-center gap-8">
            <section
              className="snap-center w-full flex flex-col justify-center items-start gap-4"
              id="addresses"
            >
              <h1 className="font-bold text-xl text-color-main">Adresler</h1>
              <div className="w-full bg-color-white rounded-[25px] p-6 shadow-sm flex flex-col justify-center items-start gap-6">
                <div className="flex justify-center items-start gap-4">
                  <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                    <FaClinicMedical className="text-[24px] text-color-main" />
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <h1 className="text-sm text-color-dark-primary opacity-50">
                      Klinik Bilgisi
                    </h1>
                    <h1 className="text-base text-color-dark-primary opacity-80 font-bold">
                      MİHRİMAHSULTAN TIP MERKEZİ
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-start w-full">
                  <div
                    className="w-full flex flex-col justify-center items-start gap-4 py-10 border-b-[1px]
                   border-solid border-color-dark-primary border-opacity-10"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <AiFillHome className="text-color-main text-lg" />
                      <h1 className="text-sm text-color-dark-primary opacity-80 font-bold">
                        Açık Adres
                      </h1>
                    </div>
                    <p className="text-base text-color-dark-primary opacity-50">
                      Mimar Sinan, Paşa Limanı Cd. No:4, 34664 Üsküdar
                    </p>
                  </div>
                  <div className="w-full flex flex-col justify-center items-start gap-4 py-10">
                    <div className="flex justify-center items-center gap-2">
                      <GiRotaryPhone className="text-color-main text-lg" />
                      <h1 className="text-sm text-color-dark-primary opacity-80 font-bold">
                        İletişim Numarası
                      </h1>
                    </div>
                    <div className="flex justify-center items-center text-color-dark-primary opacity-50 gap-2">
                      <BsFillTelephoneFill />
                      <h1 className="text-sm text-color-dark-primary opacity-80">
                        +90 2163417090
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section
              className="snap-center w-full flex flex-col justify-center items-start gap-4"
              id="resume"
            >
              <h1 className="font-bold text-xl text-color-main">Özgeçmiş</h1>
              <div className="w-full bg-color-white rounded-[25px] p-6 shadow-sm flex flex-col justify-center items-start gap-6">
                <div className="flex justify-center items-start gap-4">
                  <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                    <GiDoctorFace className="text-[24px] text-color-main" />
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <h1 className="text-sm text-color-dark-primary opacity-50">
                      Doktor Bilgisi
                    </h1>
                    <h1 className="text-base text-color-dark-primary opacity-80 font-bold">
                      Uzm. Dr. GÜRBÜZ ÇETİNDAĞ
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-start w-full">
                  <div
                    className="w-full flex flex-col justify-center items-start gap-4 py-10 border-b-[1px]
                   border-solid border-color-dark-primary border-opacity-10"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <GoPerson className="text-color-main text-lg" />
                      <h1 className="text-sm text-color-dark-primary opacity-80 font-bold">
                        Hakkımda
                      </h1>
                    </div>
                    <p className="text-base text-color-dark-primary opacity-50">
                      Minim dolore aute deserunt ullamco aliquip anim. Id dolor
                      eu est amet dolor magna culpa consequat sit velit qui.
                      Consectetur esse nulla eu qui duis tempor do tempor ut
                      incididunt quis exercitation aliquip sunt. Adipisicing
                      aute ipsum reprehenderit do elit consequat laborum. Amet
                      Lorem proident esse consectetur do magna sit non est
                      officia reprehenderit reprehenderit eu. Irure id ut
                      exercitation amet veniam aliquip dolore aliqua ad. Labore
                      minim nisi ipsum eiusmod aliqua cupidatat anim quis nisi.
                    </p>
                  </div>
                  <div
                    className="w-full flex flex-col justify-center items-start gap-4 py-10 border-b-[1px]
                   border-solid border-color-dark-primary border-opacity-10"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <MdLanguage className="text-color-main text-lg" />
                      <h1 className="text-sm text-color-dark-primary opacity-80 font-bold">
                        Bilinen Diller
                      </h1>
                    </div>
                    <p className="text-base text-color-dark-primary opacity-50">
                      Türkçe, İngilizce
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </div>
  );
}

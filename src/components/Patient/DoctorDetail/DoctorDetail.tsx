import React, { useState, useEffect, useRef } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCameraVideoFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdLanguage, MdLocationPin } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSmartphone } from "react-icons/fi";
import { FaClinicMedical } from "react-icons/fa";
import CalendarOnline from "../DoctorCard/CalendarOnline/CalendarOnline";
import CalendarLocation from "../DoctorCard/CalendarLocation/CalendarLocation";
import { BiLoaderAlt, BiTimeFive } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { AiFillHome } from "react-icons/ai";
import { GiDoctorFace, GiRotaryPhone } from "react-icons/gi";
import { GrLanguage } from "react-icons/gr";
import { Doctor } from "../../../common/types/Doctor.entity";
import {
  fetchExpert,
  fetchExpertProfilePicture,
} from "../../../features/doctorSlice/doctorAPI";
import { IoTimeSharp } from "react-icons/io5";

type Props = {};

export default function DoctorDetail({}: Props) {
  const location = useLocation();
  const [informationFeature, setInformationFeature] = useState(0);
  const [expert, setExpert] = useState<Doctor | null>(null);
  const { id } = useParams();

  const profileRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);
  const addressesRef = useRef<HTMLInputElement>(null);

  const [online, setOnline] = useState(true);
  const [calendarLoading, setCalendarLoading] = useState(false);

  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const handleCalendarChange = () => {
    if (
      expert?.expert_operating_type !== 1 &&
      expert?.expert_operating_type !== 2
    ) {
      setCalendarLoading(true);
      setOnline((value) => !value);
      setTimeout(() => {
        setCalendarLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const fetchExpertResponse = await fetchExpert(id);
      const fetchExpertSuccess = fetchExpertResponse.success;
      if (fetchExpertSuccess) {
        const data = fetchExpertResponse.data.data;
        setExpert(data);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      setProfileImageLoader(true);
      const authExpertDownloadProfilePictureResponse =
        await fetchExpertProfilePicture(expert?._id);
      setProfileImageLoader(true);
      const authExpertDownloadProfilePictureSuccess =
        authExpertDownloadProfilePictureResponse.success;

      if (authExpertDownloadProfilePictureSuccess) {
        const base64 = authExpertDownloadProfilePictureResponse.data.data;
        setProfileImageBase64(base64);
      } else {
        console.log({ authExpertDownloadProfilePictureResponse });
      }
    }
    if (expert && expert.expert_avatar_path !== "") {
      fetchData();
    }
    setOnline(
      expert?.expert_operating_type === 2 || expert?.expert_operating_type === 0
    );
  }, [expert]);

  useEffect(() => {
    if (location.hash === "#profile") {
      if (profileRef.current) {
        profileRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    } else if (location.hash === "#resume") {
      if (resumeRef.current) {
        resumeRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    } else if (location.hash === "#addresses") {
      if (addressesRef.current) {
        addressesRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [location]);

  return (
    <div className="relative flex w-full snap-y snap-mandatory flex-col items-center justify-center bg-color-white-secondary px-10 pt-[90px] xl:px-0">
      <div className="flex w-full items-end justify-center bg-color-white-secondary">
        <div className="mt-[90px] flex w-full snap-y snap-mandatory items-start justify-start xl:w-3/4">
          <section
            id="profile"
            ref={profileRef}
            className="col-span-3 flex w-full flex-col items-start justify-start gap-6"
          >
            <div className="flex w-full items-start justify-start gap-4">
              <div className="h-[150px] w-[150px] overflow-hidden rounded-[15px]">
                {profileImageBase64 ? (
                  <img
                    src={`data:image/jpeg;base64,${profileImageBase64}`}
                    alt=""
                    className="h-full w-full rounded-[20px] transition-all duration-300 hover:scale-110"
                  />
                ) : (
                  <img
                    src={require("../../../assets/images/doc_pp.jpg")}
                    alt=""
                    className="h-full w-full rounded-[20px]"
                  />
                )}
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <h1 className="text-lg font-bold uppercase text-color-dark-primary text-opacity-50 group-hover:text-opacity-80">
                      {`${
                        expert?.expert_title
                          ? expert?.expert_title.title_title
                          : ""
                      }`}
                    </h1>
                    <h1 className="text-base uppercase text-color-dark-primary group-hover:text-opacity-80">
                      {`${expert?.expert_name} ${expert?.expert_surname}`}
                    </h1>
                  </div>
                </div>
                <ul className="flex max-w-[400px] flex-wrap items-start justify-start gap-4 gap-y-0">
                  {expert?.expert_branch.map((branch) => {
                    return (
                      <h1 className="font-bold text-color-dark-primary opacity-50">
                        {branch.branch_title}
                      </h1>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="flex flex flex-col items-start justify-start gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
              <div className="flex items-start justify-start gap-1">
                <MdLocationPin
                  className={`${
                    expert?.expert_operating_type !== 2
                      ? "text-color-main"
                      : "text-color-dark-primary"
                  } text-[24px] opacity-80`}
                />
                <h1 className="text-color-dark-primary opacity-80">
                  {expert?.expert_city_location
                    ? expert?.expert_city_location
                    : ""}
                </h1>
              </div>
              <div className="flex items-center justify-start gap-1">
                <BsCameraVideoFill
                  className={`${
                    expert?.expert_operating_type === 2 ||
                    expert?.expert_operating_type === 0
                      ? "text-color-main"
                      : "text-color-dark-primary"
                  } text-[24px] opacity-80`}
                />
                <h1 className="text-color-dark-primary opacity-80">
                  {expert?.expert_operating_type === 2 ||
                  expert?.expert_operating_type === 0
                    ? "Online Görüşmeye Uygun"
                    : "Online Görüşmeye Uygun Değil"}
                </h1>
              </div>
              <div className="flex items-start justify-start gap-2">
                <IoTimeSharp className="text-[24px] text-color-main opacity-80" />
                <h1 className="text-lg text-color-dark-primary opacity-80">
                  30 Dakika
                </h1>
              </div>
            </div>
            <div
              className="sticky top-0 w-full border-t-[1px] border-solid border-color-dark-primary
             border-opacity-10 pt-4"
            >
              <ul className="grid w-full grid-cols-3">
                <Link to="#profile">
                  <li
                    className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-4 hover:cursor-pointer"
                    onClick={() => setInformationFeature(0)}
                  >
                    <div
                      className={`flex items-center justify-center gap-2 transition-all duration-300 ${
                        informationFeature === 0 ? "opacity-80" : "opacity-50"
                      }`}
                    >
                      <GoPerson className="text-[24px] font-bold text-color-dark-primary" />
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
                        className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
                      ></motion.div>
                    ) : (
                      <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
                    )}
                  </li>
                </Link>
                <Link to="#addresses">
                  <li
                    className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-4 hover:cursor-pointer"
                    onClick={() => setInformationFeature(1)}
                  >
                    <h1
                      className={`text-[16px] font-bold text-color-dark-primary transition-all duration-300 ${
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
                        className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
                      ></motion.div>
                    ) : (
                      <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
                    )}
                  </li>
                </Link>
                <Link to="#resume">
                  <li
                    className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-4 hover:cursor-pointer"
                    onClick={() => setInformationFeature(2)}
                  >
                    <h1
                      className={`text-[16px] font-bold text-color-dark-primary transition-all duration-300 ${
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
                        className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
                      ></motion.div>
                    ) : (
                      <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
                    )}
                  </li>
                </Link>
                {/* <li
                  className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-4 hover:cursor-pointer"
                  onClick={() => setInformationFeature(3)}
                >
                  <h1
                    className={`text-[16px] font-bold text-color-dark-primary transition-all duration-300 ${
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
                      className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
                    ></motion.div>
                  ) : (
                    <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
                  )}
                </li> */}
              </ul>
            </div>
          </section>
        </div>
      </div>
      <div className="flex min-h-[75vh] w-full items-start justify-center bg-color-white-secondary py-20">
        <div className="flex w-full flex-col items-start justify-start gap-10 lg:grid lg:grid-cols-5 xl:w-3/4">
          <div className="col-span-3 flex w-full snap-y snap-mandatory flex-col items-center justify-start gap-8">
            <section
              className="flex w-full snap-center flex-col items-start justify-center gap-4"
              id="addresses"
              ref={addressesRef}
            >
              <h1 className="text-xl font-bold text-color-main">Adresler</h1>
              <div className="flex w-full flex-col items-start justify-center gap-6 rounded-[25px] bg-color-white p-6 shadow-sm">
                <div className="flex items-start justify-center gap-4">
                  <div className="rounded-xl border-4 border-solid border-color-main p-2">
                    <FaClinicMedical className="text-[24px] text-color-main" />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <h1 className="text-sm text-color-dark-primary opacity-50">
                      Klinik Bilgisi
                    </h1>
                    {/* <h1 className="text-base font-bold text-color-dark-primary opacity-80">
                      MİHRİMAHSULTAN TIP MERKEZİ
                    </h1> */}
                  </div>
                </div>
                <div className="flex w-full flex-col items-start justify-center">
                  <div className="flex w-full flex-col items-start justify-center gap-4 py-10">
                    <div className="flex items-center justify-center gap-2">
                      <AiFillHome className="text-lg text-color-main" />
                      <h1 className="text-sm font-bold text-color-dark-primary opacity-80">
                        Açık Adres
                      </h1>
                    </div>
                    <p className="text-base text-color-dark-primary opacity-50">
                      Mimar Sinan, Paşa Limanı Cd. No:4, 34664 Üsküdar
                    </p>
                  </div>
                  {/* <div
                    className="flex w-full flex-col items-start justify-center gap-4 border-t-[1px] border-solid border-color-dark-primary
                   border-opacity-10 py-10"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <GiRotaryPhone className="text-lg text-color-main" />
                      <h1 className="text-sm font-bold text-color-dark-primary opacity-80">
                        İletişim Numarası
                      </h1>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-color-dark-primary opacity-50">
                      <BsFillTelephoneFill />
                      <h1 className="text-sm text-color-dark-primary opacity-80">
                        {expert?.expert_tel}
                      </h1>
                    </div>
                  </div> */}
                </div>
              </div>
            </section>
            <section
              className="flex w-full snap-center flex-col items-start justify-center gap-4"
              id="resume"
              ref={resumeRef}
            >
              <h1 className="text-xl font-bold text-color-main">Özgeçmiş</h1>
              <div className="flex w-full flex-col items-start justify-center gap-6 rounded-[25px] bg-color-white p-6 shadow-sm">
                <div className="flex items-start justify-center gap-4">
                  <div className="rounded-xl border-4 border-solid border-color-main p-2">
                    <GiDoctorFace className="text-[24px] text-color-main" />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <h1 className="text-sm text-color-dark-primary opacity-50">
                      Doktor Bilgisi
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                      <h1 className="text-lg font-bold uppercase text-color-dark-primary text-opacity-50 group-hover:text-opacity-80">
                        {`${
                          expert?.expert_title
                            ? expert?.expert_title.title_title
                            : ""
                        }`}
                      </h1>
                      <h1 className="text-base uppercase text-color-dark-primary group-hover:text-opacity-80">
                        {`${expert?.expert_name} ${expert?.expert_surname}`}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start justify-center">
                  <div className="flex w-full flex-col items-start justify-center gap-4 py-10">
                    <div className="flex items-center justify-center gap-2">
                      <GoPerson className="text-lg text-color-main" />
                      <h1 className="text-sm font-bold text-color-dark-primary opacity-80">
                        Hakkımda
                      </h1>
                    </div>
                    <p className="text-base text-color-dark-primary opacity-50">
                      {expert?.expert_about_me}
                    </p>
                  </div>
                  {/* <div
                    className="flex w-full flex-col items-start justify-center gap-4 border-t-[1px] border-solid
                   border-color-dark-primary border-opacity-10 py-10"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <MdLanguage className="text-lg text-color-main" />
                      <h1 className="text-sm font-bold text-color-dark-primary opacity-80">
                        Bilinen Diller
                      </h1>
                    </div>
                    <p className="text-base text-color-dark-primary opacity-50">
                      Türkçe, İngilizce
                    </p>
                  </div> */}
                </div>
              </div>
            </section>
          </div>
          <div className="sticky col-span-2 flex h-full w-full flex-col items-start justify-start gap-4">
            <h1 className="pointer-events-none text-xl font-bold text-color-main opacity-0">
              Adresler
            </h1>
            <div
              className="grid w-full grid-rows-3 rounded-[25px] bg-color-white 
            p-6 shadow-sm transition-all duration-300"
            >
              <div
                className="row-span-1 flex flex-col items-center justify-center border-b-[1px] border-solid
             border-color-dark-primary border-opacity-10"
              >
                <div className="h-[75px] w-full rounded-[30px] bg-color-third p-2">
                  <div className="relative grid h-full grid-cols-2 p-2">
                    <div
                      className="flex h-full cursor-pointer items-center justify-center p-3"
                      onClick={handleCalendarChange}
                    >
                      <h1 className="z-50 h-full text-sm font-bold text-color-white">
                        Online Görüşme
                      </h1>
                    </div>
                    <div
                      className="flex h-full cursor-pointer items-center justify-center py-3"
                      onClick={handleCalendarChange}
                    >
                      <h1 className="z-50 h-full text-sm font-bold text-color-white">
                        Yüz Yüze Randevu
                      </h1>
                    </div>
                    <div
                      className={`transition-all duration-500 ${
                        online ? "translate-x-0" : "translate-x-full"
                      } pointer-events-none absolute h-full w-1/2 rounded-[25px] bg-color-secondary`}
                    ></div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center py-6">
                  {online ? (
                    <div className="flex w-full items-center justify-between gap-4 px-2">
                      <div className="flex items-start justify-center gap-4">
                        <div className="rounded-xl border-4 border-solid border-color-main p-2">
                          <FiSmartphone className="text-[24px] text-color-main" />
                        </div>
                        <div className="flex flex-col items-start justify-start">
                          <h1 className="text-base font-bold text-color-dark-primary opacity-80">
                            Online Konsültasyon.
                          </h1>
                          <h1 className="text-sm text-color-dark-primary opacity-50">
                            Evinden ayrılmadan doktoruna ulaş, görüntülü
                            görüşerek muayene ol.
                          </h1>
                        </div>
                      </div>
                      {/* <h1 className="text-xl text-color-dark-primary opacity-90">
                        350₺
                      </h1> */}
                    </div>
                  ) : (
                    <div className="flex w-full flex-col items-start justify-between gap-4 px-2">
                      <div className="flex items-start justify-center gap-4">
                        <div className="rounded-xl border-4 border-solid border-color-main p-2">
                          <FaClinicMedical className="text-[24px] text-color-main" />
                        </div>
                        <div className="flex flex-col items-start justify-start">
                          <h1 className="text-base font-bold text-color-dark-primary opacity-80">
                            Yüz Yüze Konsültasyon.
                          </h1>
                          <h1 className="text-sm text-color-dark-primary opacity-50">
                            Yüz Yüze görüşerek muayene ol.
                          </h1>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <MdLocationPin className="text-[16px] text-color-main" />
                        <h1>{expert?.expert_physical_location}</h1>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row-span-2 w-full">
                <div className="relative flex h-full w-full items-start justify-center py-10">
                  {online ? (
                    <CalendarOnline expert={expert} />
                  ) : (
                    <CalendarLocation expert={expert} />
                  )}
                  <div
                    className={`${
                      calendarLoading ? "flex" : "hidden"
                    } absolute top-0 left-0 z-10 h-full w-full bg-color-white`}
                  >
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="animate-spin">
                        <BiLoaderAlt className="text-[48px] text-color-main text-opacity-80" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

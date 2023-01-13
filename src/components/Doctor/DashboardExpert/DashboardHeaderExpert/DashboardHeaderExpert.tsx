import React, { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { addAuthExpertObject } from "../../../../features/authExpert/authExpertSlice";
import { unauthenticateExpert } from "../../../../helpers/authExpertHelper";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";
import { AiFillSafetyCertificate, AiFillSchedule } from "react-icons/ai";
import { GrStatusGoodSmall } from "react-icons/gr";
import { HiArrowUturnLeft, HiArrowUturnRight } from "react-icons/hi2";
import { getCookie } from "../../../../helpers/authHelper";
import { authExpertDownloadProfilePicture } from "../../../../features/authExpert/authExpertAPI";

type Props = {};

export default function DashboardHeaderExpert({}: Props) {
  const navigate = useNavigate();
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [navElem, setNavElem] = useState(0);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);
  // useEffect(() => {
  //   async function fetchData() {
  //     const token = getCookie("m_t");
  //     const authClientProfileResponse = await authGetProfile(token);
  //     const success = authClientProfileResponse.success;
  //     if (success) {
  //       // dispatch(addAuthObject(authClientProfileResponse.data.data));
  //     }
  //   }
  //   fetchData();
  // }, []);

  // const handleWheel = (e: any) => {
  //   if (e.deltaY < 0) {
  //     navElem === 2 ? setNavElem(0) : setNavElem((value) => value + 1);
  //   } else if (e.deltaY > 0) {
  //     navElem === 0 ? setNavElem(2) : setNavElem((value) => value - 1);
  //   }
  // };

  useEffect(() => {
    if (
      location.pathname === "/for-doctors/dashboard" ||
      location.pathname === "/for-doctors/dashboard/"
    ) {
      setNavElem(0);
    } else if (
      location.pathname.startsWith("/for-doctors/dashboard/appointments") &&
      !location.pathname.startsWith("/for-doctors/dashboard/appointments-chart")
    ) {
      setNavElem(1);
    } else if (
      location.pathname.startsWith("/for-doctors/dashboard/myappointments")
    ) {
      setNavElem(2);
    } else if (
      location.pathname.startsWith("/for-doctors/dashboard/appointments-chart")
    ) {
      setNavElem(3);
    } else if (
      location.pathname.startsWith("/for-doctors/dashboard/certificates")
    ) {
      setNavElem(4);
    } else if (
      location.pathname.startsWith("/for-doctors/dashboard/settings")
    ) {
      setNavElem(5);
    } else {
      setNavElem(0);
    }
  }, [location]);

  useEffect(() => {
    async function fetchData() {
      const tokenExpert = getCookie("m_e_t");

      setProfileImageLoader(true);
      const authExpertDownloadProfilePictureResponse =
        await authExpertDownloadProfilePicture(tokenExpert);
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
    if (authExpertObject?.expert_avatar_path !== "") {
      fetchData();
    }
  }, [authExpertObject]);

  const handleLogout = () => {
    dispatch(addAuthExpertObject(undefined));
    unauthenticateExpert(() => {
      navigate("/for-doctors/login");
    });
  };
  return (
    <div
      className="min-w-[300px] h-screen flex flex-col justify-between items-center gap-10 border-r-[1px]
      py-10 border-solid border-color-dark-primary border-opacity-10"
      // onWheel={handleWheel}
    >
      <Link to="/for-doctors">
        <img
          src={require("../../../../assets/images/megaverse_logo_2.png")}
          alt="megaverse"
          className="h-10 mb-10"
        />
      </Link>
      <div className="flex flex-col w-full h-full justify-start items-center gap-12">
        <Link to="/for-doctors" className="w-full">
          <div
            className="hover:opacity-80 hover:cursor-pointer px-10 w-full 
            flex justify-start items-center gap-4 relative"
          >
            <RiArrowGoBackLine className="text-[24px] text-color-main" />
            <h1 className="text-lg text-color-dark-primary font-bold opacity-60">
              Ana Sayfa
            </h1>
          </div>
        </Link>
        <ul className="w-full h-full flex flex-col justify-start items-start gap-4">
          {/* <Link to="/for-doctors/dashboard" className="w-full">
            <li className="hover:opacity-80 hover:cursor-pointer py-2 px-10 w-full flex justify-start items-center gap-4 relative">
              <MdSpaceDashboard className="text-[24px] text-color-main" />
              <h1 className="text-lg text-color-dark-primary font-bold opacity-60">
                Panelim
              </h1>
              {navElem === 0 ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "100%" }}
                  transition={{
                    ease: "backInOut",
                    duration: 0.3,
                    reapat: 1,
                  }}
                  className="h-full absolute right-0 top-0 w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="h-full absolute right-0 top-0 w-1"></div>
              )}
            </li>
          </Link> */}
          <Link to="/for-doctors/dashboard/appointments" className="w-full">
            <li className="hover:opacity-80 hover:cursor-pointer py-2 px-10 w-full flex justify-start items-center gap-4 relative">
              <FaClock className="text-[24px] text-color-main" />
              <div className="w-full flex justify-start items-center gap-2">
                <h1 className="text-color-dark-primary font-bold text-lg opacity-60">
                  Randevularım
                </h1>
                <HiArrowUturnRight className="text-color-dark-primary font-bold opacity-60 text-[24px]" />
              </div>
              {navElem === 1 ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "100%" }}
                  transition={{
                    ease: "backInOut",
                    duration: 0.3,
                    reapat: 1,
                  }}
                  className="h-full absolute right-0 top-0 w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="h-full absolute right-0 top-0 w-1"></div>
              )}
            </li>
          </Link>
          <Link to="/for-doctors/dashboard/myappointments" className="w-full">
            <li className="hover:opacity-80 hover:cursor-pointer py-2 px-10 w-full flex justify-start items-center gap-4 relative">
              <FaClock className="text-[24px] text-color-main" />
              <div className="w-full flex justify-start items-center gap-2">
                <h1 className="text-color-dark-primary font-bold text-lg opacity-60">
                  Randevularım
                </h1>
                <HiArrowUturnLeft className="text-color-dark-primary font-bold opacity-60 text-[24px]" />
              </div>
              {navElem === 2 ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "100%" }}
                  transition={{
                    ease: "backInOut",
                    duration: 0.3,
                    reapat: 1,
                  }}
                  className="h-full absolute right-0 top-0 w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="h-full absolute right-0 top-0 w-1"></div>
              )}
            </li>
          </Link>
          <Link
            to="/for-doctors/dashboard/appointments-chart"
            className="w-full"
          >
            <li className="hover:opacity-80 hover:cursor-pointer py-2 px-10 w-full flex justify-start items-center gap-4 relative">
              <AiFillSchedule className="text-[24px] text-color-main" />
              <div className="relative">
                <h1 className="text-lg text-color-dark-primary font-bold opacity-60">
                  Randevu Çizelgem
                </h1>
                {authExpertObject?.expert_appointment_schedule ? (
                  <div></div>
                ) : (
                  <GrStatusGoodSmall className="text-[12px] opacity-80 text-color-warning-primary absolute bottom-full left-full" />
                )}
              </div>

              {navElem === 3 ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "100%" }}
                  transition={{
                    ease: "backInOut",
                    duration: 0.3,
                    reapat: 1,
                  }}
                  className="h-full absolute right-0 top-0 w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="h-full absolute right-0 top-0 w-1"></div>
              )}
            </li>
          </Link>
          <Link to="/for-doctors/dashboard/certificates" className="w-full">
            <li className="hover:opacity-80 hover:cursor-pointer py-2 px-10 w-full flex justify-start items-center gap-4 relative">
              <AiFillSafetyCertificate className="text-[24px] text-color-main" />
              <div className="relative">
                <h1 className="text-lg text-color-dark-primary font-bold opacity-60">
                  Sertifikalarım
                </h1>
                {authExpertObject?.expert_appointment_schedule ? (
                  <div></div>
                ) : (
                  <GrStatusGoodSmall className="text-[12px] opacity-80 text-color-warning-primary absolute bottom-full left-full" />
                )}
              </div>

              {navElem === 4 ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "100%" }}
                  transition={{
                    ease: "backInOut",
                    duration: 0.3,
                    reapat: 1,
                  }}
                  className="h-full absolute right-0 top-0 w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="h-full absolute right-0 top-0 w-1"></div>
              )}
            </li>
          </Link>
          <Link to="/for-doctors/dashboard/settings" className="w-full">
            <li className="hover:opacity-80 hover:cursor-pointer py-2 px-10 w-full flex justify-start items-center gap-4 relative">
              <IoSettings className="text-[24px] text-color-main" />
              <div className="relative">
                <h1 className="text-lg text-color-dark-primary font-bold opacity-60">
                  Hesap Bilgilerim
                </h1>
                {authExpertObject?.expert_name !== undefined &&
                authExpertObject?.expert_name !== "" &&
                authExpertObject?.expert_surname !== undefined &&
                authExpertObject?.expert_surname !== "" &&
                authExpertObject?.expert_email !== undefined &&
                authExpertObject?.expert_email !== "" &&
                authExpertObject?.expert_title !== undefined &&
                authExpertObject?.expert_expertise !== undefined &&
                authExpertObject?.expert_physical_location !== undefined &&
                authExpertObject?.expert_physical_location !== "" &&
                authExpertObject?.expert_session_fee !== undefined &&
                authExpertObject?.expert_session_fee !== "" &&
                authExpertObject?.expert_company !== undefined &&
                authExpertObject?.expert_company !== "" &&
                authExpertObject?.expert_tel !== undefined &&
                authExpertObject?.expert_tel !== "" &&
                authExpertObject?.expert_operating_type !== undefined &&
                authExpertObject?.expert_about_me !== undefined &&
                authExpertObject?.expert_about_me !== "" &&
                authExpertObject?.expert_city_location !== undefined &&
                authExpertObject?.expert_avatar_path !== undefined &&
                authExpertObject?.expert_avatar_path !== "" ? (
                  <div></div>
                ) : (
                  <GrStatusGoodSmall className="text-[12px] opacity-80 text-color-warning-primary absolute bottom-full left-full" />
                )}
              </div>
              {navElem === 5 ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "100%" }}
                  transition={{
                    ease: "backInOut",
                    duration: 0.3,
                    reapat: 1,
                  }}
                  className="h-full absolute right-0 top-0 w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="h-full absolute right-0 top-0 w-1"></div>
              )}
            </li>
          </Link>
        </ul>
      </div>
      <div className="px-6 w-full flex flex-col justify-center items-start gap-10">
        <div className="flex justify-center items-center gap-4 transition-all duration-300 group cursor-pointer">
          {profileImageBase64 ? (
            <img
              src={`data:image/jpeg;base64,${profileImageBase64}`}
              className="w-[75px] h-[75px] rounded-[15px]"
              alt=""
            />
          ) : (
            <button className="p-4 rounded-[15px] bg-color-secondary group-hover:bg-color-third transition-all duration-300">
              <BsFillPersonFill className="text-color-white text-[24px]" />
            </button>
          )}

          <div>
            <h1 className="text-color-dark-primary text-sm text-opacity-60 font-bold">
              Hoşgeldin
            </h1>
            <div>
              <h1 className="font-bold text-color-dark-primary text-base text-opacity-50">
                {`${
                  authExpertObject !== undefined
                    ? authExpertObject.expert_title
                      ? authExpertObject.expert_title.title_title
                      : ""
                    : ""
                } `}
              </h1>
              <h1>{`${
                authExpertObject !== undefined
                  ? authExpertObject.expert_name
                  : ""
              } ${
                authExpertObject !== undefined
                  ? authExpertObject?.expert_surname
                  : ""
              }`}</h1>
            </div>
          </div>
        </div>
        <button
          className="w-full flex justify-center items-center p-4 rounded-[15px] bg-color-third hover:bg-color-secondary 
                transition-all duration-300"
          onClick={handleLogout}
        >
          <FiLogOut className="text-color-white text-[24px]" />
        </button>
      </div>
    </div>
  );
}

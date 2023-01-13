import React, { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  authClientDownloadProfilePicture,
  authGetProfile,
} from "../../../../features/auth/authAPI";
import { addAuthObject } from "../../../../features/auth/authSlice";
import { getCookie, unauthenticate } from "../../../../helpers/authHelper";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";

type Props = {};

export default function DashboardHeaderPatient({}: Props) {
  const navigate = useNavigate();
  const authObject = useAppSelector((state) => state.auth.auth_object);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [navElem, setNavElem] = useState(0);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLodaer, setProfileImageLoader] = useState(false);
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
      location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/"
    ) {
      setNavElem(0);
    } else if (
      location.pathname === "/dashboard/appointments" ||
      location.pathname === "/dashboard/appointments/"
    ) {
      setNavElem(1);
    } else if (
      location.pathname === "/dashboard/settings" ||
      location.pathname === "/dashboard/settings/"
    ) {
      setNavElem(2);
    } else {
      setNavElem(0);
    }
  }, [location]);

  useEffect(() => {
    async function fetchData() {
      const token = getCookie("m_t");

      setProfileImageLoader(true);
      const authClientDownloadProfilePictureResponse =
        await authClientDownloadProfilePicture(token);
      setProfileImageLoader(true);
      const authExpertDownloadProfilePictureSuccess =
        authClientDownloadProfilePictureResponse.success;

      if (authExpertDownloadProfilePictureSuccess) {
        const base64 = authClientDownloadProfilePictureResponse.data.data;
        setProfileImageBase64(base64);
      } else {
        console.log({ authClientDownloadProfilePictureResponse });
      }
    }
    if (authObject?.client_avatar_path !== "") {
      fetchData();
    }
  }, [authObject]);

  const handleLogout = () => {
    dispatch(addAuthObject(undefined));
    unauthenticate(() => {
      navigate("/login");
    });
  };
  return (
    <div
      className="h-screen flex flex-col justify-between items-center gap-10 border-r-[1px]
      py-10 border-solid border-color-dark-primary border-opacity-10"
      // onWheel={handleWheel}
    >
      <Link to="/">
        <img
          src={require("../../../../assets/images/megaverse_logo_2.png")}
          alt="megaverse"
          className="h-10 mb-10"
        />
      </Link>
      <div className="flex flex-col w-full h-full justify-start items-center gap-12">
        <Link to="/" className="w-full">
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
          {/* <Link to="/dashboard" className="w-full">
            <li
              className="hover:opacity-80 hover:cursor-pointer py-2 px-10 w-full flex justify-start items-center gap-4 relative"
              onClick={() => setNavElem(0)}
            >
              <MdSpaceDashboard className="text-[24px] text-color-main" />
              <h1 className="text-lg text-color-dark-primary font-bold opacity-60">
                Dashboard
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
          <Link to="/dashboard/appointments" className="w-full">
            <li
              className="hover:opacity-80 hover:cursor-pointer py-2 px-10 w-full flex justify-start items-center gap-4 relative"
              onClick={() => setNavElem(1)}
            >
              <FaClock className="text-[24px] text-color-main" />
              <h1 className="text-lg text-color-dark-primary font-bold opacity-60">
                Randevularım
              </h1>
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
          <Link to="/dashboard/settings" className="w-full">
            <li
              className="hover:opacity-80 hover:cursor-pointer py-2 px-10 w-full flex justify-start items-center gap-4 relative"
              onClick={() => setNavElem(2)}
            >
              <IoSettings className="text-[24px] text-color-main" />
              <h1 className="text-lg text-color-dark-primary font-bold opacity-60">
                Hesap Bilgilerim
              </h1>
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
            <h1 className="text-color-dark-primary uppercase text-base font-bold group-hover:text-opacity-80">
              {`${authObject !== undefined ? authObject.client_name : ""} ${
                authObject !== undefined ? authObject?.client_surname : ""
              }`}
            </h1>
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

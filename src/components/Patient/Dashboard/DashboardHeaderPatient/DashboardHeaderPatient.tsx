import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Alert } from "../../../../common/types/Alert";
import {
  authClientDownloadProfilePicture
} from "../../../../features/auth/authAPI";
import { addAuthObject } from "../../../../features/auth/authSlice";
import { addAuthExpertObject } from "../../../../features/authExpert/authExpertSlice";
import { updateAlert } from "../../../../features/options/optionsSlice";
import { unauthenticatehardExpert } from "../../../../helpers/authExpertHelper";
import {
  getCookie,
  removeCookie,
  unauthenticate,
  unauthenticatehard
} from "../../../../helpers/authHelper";

type Props = {};

export default function DashboardHeaderPatient({}: Props) {
  const navigate = useNavigate();
  const authObject = useAppSelector((state) => state.auth.auth_object);
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
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
        if (
          authClientDownloadProfilePictureResponse.data.response.data.message &&
          authClientDownloadProfilePictureResponse.data.response.data
            .message === "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode:
              authClientDownloadProfilePictureResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthObject(undefined));
          unauthenticate(navigate("/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: authClientDownloadProfilePictureResponse.data.response.data
              .message,
            active: true,
            statusCode:
              authClientDownloadProfilePictureResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
      }
    }
    if (
      authObject &&
      authObject?.client_avatar_path !== "" &&
      authObject?.client_avatar_path !== undefined
    ) {
      fetchData();
    }
  }, [authObject]);

  const handleLogout = () => {
    if (authExpertObject) {
      dispatch(addAuthExpertObject(undefined));
      unauthenticatehardExpert(() => {
        navigate("/experts/login");
      });
      removeCookie("m_t");
    } else if (authObject) {
      dispatch(addAuthObject(undefined));
      unauthenticatehard(() => {
        navigate("/login");
      });
      removeCookie("m_e_t");
    }
  };
  return (
    <div
      className="hidden lg:flex h-screen min-w-[300px] flex-col items-center justify-between gap-10 border-r-[1px]
      border-solid border-color-dark-primary border-opacity-10 py-10"
      // onWheel={handleWheel}
    >
      <Link to="/">
        <img
          src={require("../../../../assets/images/megaverse_logo_2.png")}
          alt="megaverse"
          className="mb-10 h-10"
        />
      </Link>
      <div className="flex h-full w-full flex-col items-center justify-start gap-12">
        <Link to="/" className="w-full">
          <div
            className="relative flex w-full items-center 
            justify-start gap-4 px-10 hover:cursor-pointer hover:opacity-80"
          >
            <RiArrowGoBackLine className="text-[24px] text-color-main" />
            <h1 className="text-lg font-bold text-color-dark-primary opacity-60">
              Ana Sayfa
            </h1>
          </div>
        </Link>
        <ul className="flex h-full w-full flex-col items-start justify-start gap-4">
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
              className="relative flex w-full items-center justify-start gap-4 py-2 px-10 hover:cursor-pointer hover:opacity-80"
              onClick={() => setNavElem(1)}
            >
              <FaClock className="text-[24px] text-color-main" />
              <h1 className="text-lg font-bold text-color-dark-primary opacity-60">
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
                  className="absolute right-0 top-0 h-full w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="absolute right-0 top-0 h-full w-1"></div>
              )}
            </li>
          </Link>
          <Link to="/dashboard/settings" className="w-full">
            <li
              className="relative flex w-full items-center justify-start gap-4 py-2 px-10 hover:cursor-pointer hover:opacity-80"
              onClick={() => setNavElem(2)}
            >
              <IoSettings className="text-[24px] text-color-main" />
              <h1 className="text-lg font-bold text-color-dark-primary opacity-60">
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
                  className="absolute right-0 top-0 h-full w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="absolute right-0 top-0 h-full w-1"></div>
              )}
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-10 px-6">
        <div className="group flex cursor-pointer items-center justify-center gap-4 transition-all duration-300">
          {profileImageBase64 ? (
            <img
              src={`data:image/jpeg;base64,${profileImageBase64}`}
              className="h-[75px] w-[75px] rounded-[15px]"
              alt=""
            />
          ) : (
            <button className="rounded-[15px] bg-color-secondary p-4 transition-all duration-300 group-hover:bg-color-third">
              <BsFillPersonFill className="text-[24px] text-color-white" />
            </button>
          )}
          <div>
            <h1 className="text-sm font-bold text-color-dark-primary text-opacity-60">
              Hoşgeldin
            </h1>
            <h1 className="text-sm font-bold uppercase text-color-dark-primary group-hover:text-opacity-80">
              {`${authObject !== undefined ? authObject.client_name : ""} ${
                authObject !== undefined ? authObject?.client_surname : ""
              }`}
            </h1>
          </div>
        </div>
        <button
          className="flex w-full items-center justify-center rounded-[15px] bg-color-third p-4 transition-all 
                duration-300 hover:bg-color-danger-primary"
          onClick={handleLogout}
        >
          <FiLogOut className="text-[24px] text-color-white" />
        </button>
      </div>
    </div>
  );
}

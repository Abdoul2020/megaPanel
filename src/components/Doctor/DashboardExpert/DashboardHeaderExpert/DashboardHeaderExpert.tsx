import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiFillSafetyCertificate, AiFillSchedule } from "react-icons/ai";
import {
  BsCheckCircleFill,
  BsCheckLg,
  BsExclamationCircleFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GrStatusGoodSmall } from "react-icons/gr";
import { HiArrowUturnLeft, HiArrowUturnRight } from "react-icons/hi2";
import { IoCopy, IoSettings } from "react-icons/io5";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Alert } from "../../../../common/types/Alert";
import { addAuthObject } from "../../../../features/auth/authSlice";
import { authExpertDownloadProfilePicture } from "../../../../features/authExpert/authExpertAPI";
import { addAuthExpertObject } from "../../../../features/authExpert/authExpertSlice";
import { updateAlert } from "../../../../features/options/optionsSlice";
import {
  unauthenticateExpert,
  unauthenticatehardExpert,
} from "../../../../helpers/authExpertHelper";
import {
  getCookie,
  removeCookie,
  unauthenticatehard,
} from "../../../../helpers/authHelper";
import Tooltip from "@mui/material/Tooltip";

type Props = {};

export default function DashboardHeaderExpert({}: Props) {
  const navigate = useNavigate();
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const authObject = useAppSelector((state) => state.auth.auth_object);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [navElem, setNavElem] = useState(0);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const [referenceIdCopied, setReferenceIdCopied] = useState(false);
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
      location.pathname === "/experts/dashboard" ||
      location.pathname === "/experts/dashboard/"
    ) {
      setNavElem(0);
    } else if (
      location.pathname.startsWith("/experts/dashboard/appointments") &&
      !location.pathname.startsWith("/experts/dashboard/appointments-chart")
    ) {
      setNavElem(1);
    } else if (
      location.pathname.startsWith("/experts/dashboard/myappointments")
    ) {
      setNavElem(2);
    } else if (
      location.pathname.startsWith("/experts/dashboard/appointments-chart")
    ) {
      setNavElem(3);
    } else if (
      location.pathname.startsWith("/experts/dashboard/certificates")
    ) {
      setNavElem(4);
    } else if (location.pathname.startsWith("/experts/dashboard/settings")) {
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
        if (
          authExpertDownloadProfilePictureResponse.data.response.data.message &&
          authExpertDownloadProfilePictureResponse.data.response.data
            .message === "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode:
              authExpertDownloadProfilePictureResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthExpertObject(undefined));
          unauthenticateExpert(navigate("/experts/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: authExpertDownloadProfilePictureResponse.data.response.data
              .message,
            active: true,
            statusCode:
              authExpertDownloadProfilePictureResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
      }
    }
    if (
      authExpertObject?.expert_avatar_path !== "" &&
      authExpertObject?.expert_avatar_path !== undefined
    ) {
      fetchData();
    }
  }, [authExpertObject]);

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
  const copyToClipboard = (text?: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setReferenceIdCopied(true);
      setTimeout(() => {
        setReferenceIdCopied(false);
      }, 3000);
    }
  };
  return (
    <div
      className="hidden h-screen min-w-[300px] flex-col items-center justify-between gap-10 border-r-[1px] border-solid
      border-color-dark-primary border-opacity-10 py-10 lg:flex"
      // onWheel={handleWheel}
    >
      <Link to="/experts">
        <img
          src={require("../../../../assets/images/megaverse_logo_2.png")}
          alt="megaverse"
          className="mb-10 h-10"
        />
      </Link>
      <div className="flex h-full w-full flex-col items-center justify-start gap-12">
        <Link to="/experts" className="w-full">
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
          {/* <Link to="/experts/dashboard" className="w-full">
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
          <Link to="/experts/dashboard/appointments" className="w-full">
            <li className="relative flex w-full items-center justify-start gap-4 py-2 px-10 hover:cursor-pointer hover:opacity-80">
              <FaClock className="text-[24px] text-color-main" />
              <div className="flex w-full items-center justify-start gap-2">
                <h1 className="text-lg font-bold text-color-dark-primary opacity-60">
                  Randevularım
                </h1>
                <HiArrowUturnRight className="text-[24px] font-bold text-color-dark-primary opacity-60" />
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
                  className="absolute right-0 top-0 h-full w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="absolute right-0 top-0 h-full w-1"></div>
              )}
            </li>
          </Link>
          <Link to="/experts/dashboard/myappointments" className="w-full">
            <li className="relative flex w-full items-center justify-start gap-4 py-2 px-10 hover:cursor-pointer hover:opacity-80">
              <FaClock className="text-[24px] text-color-main" />
              <div className="flex w-full items-center justify-start gap-2">
                <h1 className="text-lg font-bold text-color-dark-primary opacity-60">
                  Randevularım
                </h1>
                <HiArrowUturnLeft className="text-[24px] font-bold text-color-dark-primary opacity-60" />
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
                  className="absolute right-0 top-0 h-full w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="absolute right-0 top-0 h-full w-1"></div>
              )}
            </li>
          </Link>
          <Link to="/experts/dashboard/appointments-chart" className="w-full">
            <li className="relative flex w-full items-center justify-start gap-4 py-2 px-10 hover:cursor-pointer hover:opacity-80">
              <AiFillSchedule className="text-[24px] text-color-main" />
              <div className="relative">
                <h1 className="text-lg font-bold text-color-dark-primary opacity-60">
                  Randevu Çizelgem
                </h1>
                {authExpertObject?.expert_appointment_schedule ? (
                  <div></div>
                ) : (
                  <GrStatusGoodSmall className="absolute bottom-full left-full text-[12px] text-color-warning-primary opacity-80" />
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
                  className="absolute right-0 top-0 h-full w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="absolute right-0 top-0 h-full w-1"></div>
              )}
            </li>
          </Link>
          <Link to="/experts/dashboard/certificates" className="w-full">
            <li className="relative flex w-full items-center justify-start gap-4 py-2 px-10 hover:cursor-pointer hover:opacity-80">
              <AiFillSafetyCertificate className="text-[24px] text-color-main" />
              <div className="relative">
                <h1 className="text-lg font-bold text-color-dark-primary opacity-60">
                  Sertifikalarım
                </h1>
                {/* {authExpertObject?.expert_certificates &&
                authExpertObject?.expert_certificates.length > 0 ? (
                  <div></div>
                ) : (
                  <GrStatusGoodSmall className="absolute bottom-full left-full text-[12px] text-color-warning-primary opacity-80" />
                )} */}
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
                  className="absolute right-0 top-0 h-full w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="absolute right-0 top-0 h-full w-1"></div>
              )}
            </li>
          </Link>
          <Link to="/experts/dashboard/settings" className="w-full">
            <li className="relative flex w-full items-center justify-start gap-4 py-2 px-10 hover:cursor-pointer hover:opacity-80">
              <IoSettings className="text-[24px] text-color-main" />
              <div className="relative">
                <h1 className="text-lg font-bold text-color-dark-primary opacity-60">
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
                authExpertObject?.expert_tel !== undefined &&
                authExpertObject?.expert_tel !== "" &&
                authExpertObject?.expert_operating_type !== undefined &&
                authExpertObject?.expert_about_me !== undefined &&
                authExpertObject?.expert_about_me !== "" &&
                authExpertObject?.expert_city !== undefined &&
                authExpertObject?.expert_city !== "" &&
                authExpertObject?.expert_country !== undefined &&
                authExpertObject?.expert_country !== "" &&
                authExpertObject?.expert_postal_code !== undefined &&
                authExpertObject?.expert_postal_code !== "" &&
                authExpertObject?.expert_avatar_path !== undefined &&
                authExpertObject?.expert_avatar_path !== "" ? (
                  <div></div>
                ) : (
                  <GrStatusGoodSmall className="absolute bottom-full left-full text-[12px] text-color-warning-primary opacity-80" />
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
                  className="absolute right-0 top-0 h-full w-1 bg-color-main"
                ></motion.div>
              ) : (
                <div className="absolute right-0 top-0 h-full w-1"></div>
              )}
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-6 px-6">
        <div className="group flex cursor-pointer items-center justify-center gap-4 transition-all duration-300">
          {profileImageBase64 ? (
            <div className="relative h-[75px] w-[75px] rounded-[15px]">
              <img
                src={`data:image/jpeg;base64,${profileImageBase64}`}
                className="h-[75px] w-[75px] rounded-[15px]"
                alt=""
              />
              <div className="absolute -top-[5px] -right-[5px]">
                {authExpertObject?.expert_status === 1 ? (
                  <Tooltip title="Hesabınız onaylandı." placement="right-start">
                    <div>
                      <BsCheckCircleFill className="text-color-success-primary" />
                    </div>
                  </Tooltip>
                ) : authExpertObject?.expert_status === 0 ? (
                  <Tooltip
                    title="Hesabınız onay bekliyor."
                    placement="right-start"
                  >
                    <div>
                      <BsExclamationCircleFill className="text-color-warning-primary" />
                    </div>
                  </Tooltip>
                ) : (
                  <Tooltip
                    title="Hesabınız reddedildi."
                    placement="right-start"
                  >
                    <div>
                      <BsExclamationCircleFill className="text-color-danger-primary" />
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
          ) : (
            <div className="relative">
              <button className="rounded-[15px] bg-color-secondary p-4 transition-all duration-300 group-hover:bg-color-third">
                <BsFillPersonFill className="text-[24px] text-color-white" />
              </button>
              <div className="absolute -top-[5px] -right-[5px]">
                {authExpertObject?.expert_status === 1 ? (
                  <Tooltip title="Hesabınız onaylandı." placement="right-start">
                    <div>
                      <BsCheckCircleFill className="text-color-success-primary" />
                    </div>
                  </Tooltip>
                ) : authExpertObject?.expert_status === 0 ? (
                  <Tooltip
                    title="Hesabınız onay bekliyor."
                    placement="right-start"
                  >
                    <div>
                      <BsExclamationCircleFill className="text-color-warning-primary" />
                    </div>
                  </Tooltip>
                ) : (
                  <Tooltip
                    title="Hesabınız reddedildi."
                    placement="right-start"
                  >
                    <div>
                      <BsExclamationCircleFill className="text-color-danger-primary" />
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
          )}

          <div>
            <h1 className="text-sm font-bold text-color-dark-primary text-opacity-60">
              Hoşgeldin
            </h1>
            <div className="flex flex-wrap items-start justify-start">
              <h1 className="text-sm font-bold text-color-dark-primary text-opacity-50">
                {`${
                  authExpertObject !== undefined
                    ? authExpertObject.expert_title
                      ? authExpertObject.expert_title.title_title
                      : ""
                    : ""
                } `}
              </h1>
              <h1 className="text-sm text-color-dark-primary">{`${
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
        <div className="flex w-full flex-col items-start justify-start">
          <div
            className="flex w-full cursor-pointer items-center justify-center gap-1 opacity-80 transition-all duration-100 ease-in-out hover:opacity-50"
            onClick={() =>
              copyToClipboard(authExpertObject?.expert_reference_id)
            }
          >
            <h1 className="text-base font-bold uppercase text-color-dark-primary">
              {authExpertObject?.expert_reference_id}
            </h1>
            {referenceIdCopied ? (
              <BsCheckLg className="text-color-main" />
            ) : (
              <IoCopy className="text-color-dark-primary" />
            )}
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
    </div>
  );
}

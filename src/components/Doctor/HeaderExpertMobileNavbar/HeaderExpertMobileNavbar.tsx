import { Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BsArrowRight,
  BsCheckCircleFill,
  BsExclamationCircleFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { FaStethoscope } from "react-icons/fa";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addAuthObject } from "../../../features/auth/authSlice";
import { addAuthExpertObject } from "../../../features/authExpert/authExpertSlice";
import { fetchClientProfilePicture } from "../../../features/clients/clientsAPI";
import { fetchExpertProfilePicture } from "../../../features/doctorSlice/doctorAPI";
import {
  updateDoctorState,
  updateHeaderMobileExpert,
} from "../../../features/options/optionsSlice";
import { unauthenticatehardExpert } from "../../../helpers/authExpertHelper";
import { removeCookie, unauthenticatehard } from "../../../helpers/authHelper";

type Props = {};

export default function HeaderExpertMobileNavbar({}: Props) {
  const navigate = useNavigate();
  const forDoctors = useAppSelector((state) => state.options.forDoctors);
  const pathname = useAppSelector((state) => state.options.pathname);

  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const [patientProfileImageBase64, setPatientProfileImageBase64] =
    useState(null);
  const [patientProfileImageLoader, setPatientProfileImageLoader] =
    useState(false);

  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const authObject = useAppSelector((state) => state.auth.auth_object);

  const dispatch = useAppDispatch();
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
  useEffect(() => {
    async function fetchData() {
      setProfileImageLoader(true);
      const authExpertDownloadProfilePictureResponse =
        await fetchExpertProfilePicture(authExpertObject?._id);
      setProfileImageLoader(false);
      const authExpertDownloadProfilePictureSuccess =
        authExpertDownloadProfilePictureResponse.success;

      if (authExpertDownloadProfilePictureSuccess) {
        const base64 = authExpertDownloadProfilePictureResponse.data.data;
        setProfileImageBase64(base64);
      } else {
        // console.log({ authExpertDownloadProfilePictureResponse });
      }
    }
    if (
      authExpertObject &&
      authExpertObject.expert_avatar_path !== "" &&
      authExpertObject.expert_avatar_path !== undefined
    ) {
      fetchData();
    }
  }, [authExpertObject]);

  useEffect(() => {
    async function fetchData() {
      if (authObject) {
        setPatientProfileImageLoader(true);
        const authClientDownloadProfilePictureResponse =
          await fetchClientProfilePicture(authObject?._id);
        setPatientProfileImageLoader(true);
        const authClientDownloadProfilePictureSuccess =
          authClientDownloadProfilePictureResponse.success;

        if (authClientDownloadProfilePictureSuccess) {
          const base64 = authClientDownloadProfilePictureResponse.data.data;
          setPatientProfileImageBase64(base64);
        } else {
          // console.log({ authClientDownloadProfilePictureResponse });
        }
      }
    }
    if (
      authObject &&
      authObject.client_avatar_path !== "" &&
      authObject.client_avatar_path !== undefined
    ) {
      fetchData();
    }
  }, [authObject]);
  const handleHeaderMobileExpertClose = () => {
    dispatch(updateHeaderMobileExpert(false));
  };
  return (
    <div className="relative h-full max-w-[350px] overflow-hidden bg-doctor-color-main bg-opacity-50 px-10 py-10">
      <div className="absolute -z-10 -bottom-[10%] -left-[10%] h-auto w-3/4">
        <FaStethoscope className="h-full w-full text-color-dark-primary text-opacity-10" />
      </div>
      <div className="flex z-50 h-full w-full flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-center gap-4">
          <Link to="/experts" onClick={handleHeaderMobileExpertClose}>
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                ease: "backInOut",
                duration: 0.5,
                reapat: 1,
              }}
              viewport={{ once: true }}
              src={require("../../../assets/images/megaverse_logo_4.png")}
              alt=""
              className="h-10"
            />
          </Link>
          {authExpertObject !== undefined || authObject !== undefined ? (
            <div></div>
          ) : (
            <Link
              to="/"
              onClick={() => {
                dispatch(updateDoctorState());
                handleHeaderMobileExpertClose();
              }}
            >
              <div
                className={`group z-20 flex cursor-pointer items-center justify-center gap-4 rounded-[15px] bg-color-secondary px-4 py-[16px] transition-all duration-500 hover:bg-color-white`}
              >
                <FiSearch
                  fontSize={15}
                  className="text-color-white transition-all duration-500 group-hover:text-color-secondary"
                />
                <button className="z-30">
                  <h1 className="text-sm font-normal text-color-white transition-all duration-500 group-hover:text-color-secondary">
                    Uzman ara
                  </h1>
                </button>
              </div>
            </Link>
          )}
          <motion.ul
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              ease: "backInOut",
              duration: 0.7,
              reapat: 1,
            }}
            viewport={{ once: true }}
            className={`flex items-center justify-center gap-8 ${
              pathname.includes("register") ||
              pathname.includes("login") ||
              pathname.includes("forgot-password")
                ? "hidden"
                : "flex"
            }`}
          >
            <Link
              to="/experts#features"
              onClick={handleHeaderMobileExpertClose}
            >
              <li className="hover:cursor-pointer hover:opacity-80">
                <h1
                  className={
                    forDoctors ? "text-color-main" : "text-color-white"
                  }
                >
                  Özellikler
                </h1>
              </li>
            </Link>
            <Link to="/experts#faq" onClick={handleHeaderMobileExpertClose}>
              <li className="hover:cursor-pointer hover:opacity-80">
                <h1
                  className={
                    forDoctors ? "text-color-main" : "text-color-white"
                  }
                >
                  S.S.S
                </h1>
              </li>
            </Link>
            {/* <li className="hover:cursor-pointer hover:opacity-80">
              <h1
                className={forDoctors ? "text-color-main" : "text-color-white"}
              >
                Fiyatlar
              </h1>
            </li> */}
            {/* <li className="hover:cursor-pointer hover:opacity-80">
              <h1
                className={forDoctors ? "text-color-main" : "text-color-white"}
              >
                Destek
              </h1>
            </li> */}
          </motion.ul>
        </div>
        {pathname.includes("register") ||
        pathname.includes("login") ||
        pathname.includes("forgot-password") ? (
          pathname.includes("register") ? (
            <Link
              to={forDoctors ? "/register" : "/experts/register"}
              onClick={() => {
                dispatch(updateDoctorState());
                handleHeaderMobileExpertClose();
              }}
            >
              <div
                className="group group z-20 flex cursor-pointer
        items-center  justify-center gap-4 rounded-[15px] bg-color-third
           px-8 py-4 transition-all duration-500 hover:bg-color-secondary"
              >
                <FiSearch
                  fontSize={15}
                  className="text-color-white transition-all duration-500"
                />
                <button className="z-30">
                  <h1 className="text-sm font-normal text-color-white transition-all duration-500">
                    {forDoctors
                      ? "Danışan Olarak Kaydol"
                      : "Uzman Olarak Kaydol"}
                  </h1>
                </button>
              </div>
            </Link>
          ) : pathname.includes("login") ? (
            <Link
              to="/login"
              onClick={() => {
                dispatch(updateDoctorState());
                handleHeaderMobileExpertClose();
              }}
            >
              <div
                className="group group z-20 flex cursor-pointer
        items-center  justify-center gap-4 rounded-[15px] bg-color-third
           px-8 py-4 transition-all duration-500 hover:bg-color-secondary"
              >
                <FiSearch
                  fontSize={15}
                  className="text-color-white transition-all duration-500"
                />
                <button className="z-30">
                  <h1 className="text-sm font-normal text-color-white transition-all duration-500">
                    Danışan Olarak Gir
                  </h1>
                </button>
              </div>
            </Link>
          ) : (
            <div></div>
          )
        ) : (
          <div>
            {authObject !== undefined || authExpertObject !== undefined ? (
              <div>
                {authExpertObject !== undefined ? (
                  <div className="flex items-center justify-center gap-8">
                    <Link to="/experts/dashboard">
                      <div className="group flex cursor-pointer items-center justify-center gap-4 transition-all duration-300">
                        {profileImageBase64 ? (
                          <div className="relative h-[50px] w-[50px] rounded-[15px]">
                            <img
                              src={`data:image/jpeg;base64,${profileImageBase64}`}
                              className="h-[50px] w-[50px] rounded-[15px]"
                              alt=""
                            />
                            <div className="absolute -top-[5px] -right-[5px]">
                              {authExpertObject?.expert_status === 1 ? (
                                <Tooltip
                                  title="Hesabınız onaylandı."
                                  placement="right-start"
                                >
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
                            <button className="flex h-full w-full items-center justify-center rounded-[15px] bg-color-secondary p-4 transition-all duration-300 group-hover:bg-color-third">
                              <BsFillPersonFill className="text-[40px] text-color-white" />
                            </button>
                            <div className="absolute -top-[5px] -right-[5px]">
                              {authExpertObject?.expert_status === 1 ? (
                                <Tooltip
                                  title="Hesabınız onaylandı."
                                  placement="right-start"
                                >
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
                        <div className="flex flex-col items-start justify-start">
                          <h1 className="text-xs font-bold uppercase text-color-dark-primary text-opacity-50 group-hover:text-opacity-80">
                            {`${
                              authExpertObject.expert_title
                                ? authExpertObject.expert_title.title_title
                                : ""
                            }`}
                          </h1>
                          <h1 className="text-xs uppercase text-color-dark-primary group-hover:text-opacity-80">
                            {`${authExpertObject.expert_name} ${authExpertObject.expert_surname}`}
                          </h1>
                        </div>
                      </div>
                    </Link>
                    <button
                      className="rounded-[15px] bg-color-third p-4 transition-all 
                duration-300 hover:bg-color-danger-primary"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="text-[24px] text-color-white" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-8">
                    <Link to="/dashboard">
                      <div className="group flex cursor-pointer items-center justify-center gap-4 transition-all duration-300">
                        <div className="min-h-[50px] min-w-[50px] overflow-hidden rounded-[20px]">
                          {patientProfileImageBase64 ? (
                            <img
                              src={`data:image/jpeg;base64,${patientProfileImageBase64}`}
                              className="h-[50px] w-[50px] rounded-[15px]"
                              alt=""
                            />
                          ) : (
                            <button className="flex h-full w-full items-center justify-center rounded-[15px] bg-color-secondary p-4 transition-all duration-300 group-hover:bg-color-third">
                              <BsFillPersonFill className="text-[40px] text-color-white" />
                            </button>
                          )}
                        </div>
                        <h1 className="text-base uppercase text-color-white group-hover:text-opacity-80">
                          {`${authObject?.client_name} ${authObject?.client_surname}`}
                        </h1>
                      </div>
                    </Link>
                    <button
                      className="rounded-[15px] bg-color-third p-4 transition-all 
                duration-300 hover:bg-color-danger-primary"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="text-[24px] text-color-white" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={forDoctors ? "/experts/register" : "/register"}
                  onClick={handleHeaderMobileExpertClose}
                >
                  <button className="group cursor-pointer rounded-[15px] bg-color-third px-4 py-4 transition-all duration-500 hover:bg-color-secondary">
                    <h1 className="text-sm font-normal text-color-white">
                      Hemen Kaydol
                    </h1>
                  </button>
                </Link>
                <Link
                  to={forDoctors ? "/experts/login" : "/login"}
                  onClick={handleHeaderMobileExpertClose}
                >
                  <button
                    className={`flex items-center justify-center gap-2 rounded-[15px] border-[1px] border-solid px-4 py-4 ${
                      forDoctors || pathname !== "/"
                        ? "border-color-main"
                        : "border-color-white"
                    } hover:bg-color-white ${
                      forDoctors
                        ? "hover:border-color-white"
                        : "hover:border-color-main"
                    } group cursor-pointer transition-all duration-500`}
                  >
                    <h1
                      className={`text-sm font-normal ${
                        forDoctors || pathname !== "/"
                          ? "text-color-main"
                          : "text-color-white"
                      } transition-all duration-500 group-hover:text-color-secondary`}
                    >
                      Giriş Yap
                    </h1>
                    <BsArrowRight
                      className={`${
                        forDoctors || pathname !== "/"
                          ? "text-color-main"
                          : "text-color-white"
                      } transition-all duration-500 group-hover:text-color-secondary`}
                      fontSize={20}
                    />
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

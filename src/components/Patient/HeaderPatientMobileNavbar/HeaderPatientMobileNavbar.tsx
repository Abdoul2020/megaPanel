import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsArrowRight, BsFillPersonFill } from "react-icons/bs";
import { FaStethoscope } from "react-icons/fa";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addAuthObject } from "../../../features/auth/authSlice";
import { addAuthExpertObject } from "../../../features/authExpert/authExpertSlice";
import { fetchClientProfilePicture } from "../../../features/clients/clientsAPI";
import { fetchExpertProfilePicture } from "../../../features/doctorSlice/doctorAPI";
import {
  updateDoctorState,
  updateHeaderMobilePatient,
} from "../../../features/options/optionsSlice";
import {
  removeCookie,
  unauthenticatehardExpert,
} from "../../../helpers/authExpertHelper";
import { unauthenticatehard } from "../../../helpers/authHelper";

type Props = {};

export default function HeaderPatientMobileNavbar({}: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const forDoctors = useAppSelector((state) => state.options.forDoctors);
  const pathname = useAppSelector((state) => state.options.pathname);
  const authObject = useAppSelector((state) => state.auth.auth_object);
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );

  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const [expertProfileImageBase64, setExpertProfileImageBase64] =
    useState(null);
  const [expertProfileImageLoader, setExpertProfileImageLoader] =
    useState(false);

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    if (authExpertObject) {
      dispatch(addAuthExpertObject(undefined));
      unauthenticatehardExpert(() => {
        navigate("/for-doctors/login");
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
  // useEffect(() => {
  //   console.log(authObject);
  // }, [authObject]);

  useEffect(() => {
    async function fetchData() {
      if (authObject) {
        setProfileImageLoader(true);
        const authClientDownloadProfilePictureResponse =
          await fetchClientProfilePicture(authObject._id);
        setProfileImageLoader(true);
        const authClientDownloadProfilePictureSuccess =
          authClientDownloadProfilePictureResponse.success;

        if (authClientDownloadProfilePictureSuccess) {
          const base64 = authClientDownloadProfilePictureResponse.data.data;
          setProfileImageBase64(base64);
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

  useEffect(() => {
    async function fetchData() {
      if (authExpertObject) {
        setExpertProfileImageLoader(true);
        const authExpertDownloadProfilePictureResponse =
          await fetchExpertProfilePicture(authExpertObject._id);
        setExpertProfileImageLoader(false);
        const authExpertDownloadProfilePictureSuccess =
          authExpertDownloadProfilePictureResponse.success;

        if (authExpertDownloadProfilePictureSuccess) {
          const base64 = authExpertDownloadProfilePictureResponse.data.data;
          setExpertProfileImageBase64(base64);
        } else {
          // console.log({ authExpertDownloadProfilePictureResponse });
        }
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
  const handleHeaderMobilePatientClose = () => {
    dispatch(updateHeaderMobilePatient(false));
  };
  return (
    <div className="flex h-full max-w-[350px] flex-col items-center justify-between px-10 py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <Link to="/" onClick={handleHeaderMobilePatientClose}>
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
            to="/for-doctors"
            onClick={() => {
              dispatch(updateDoctorState());
              handleHeaderMobilePatientClose();
            }}
          >
            <div
              className={`${
                pathname === "/for-doctors" || pathname === "/"
                  ? "flex"
                  : "hidden"
              } group z-20 flex cursor-pointer items-center justify-center gap-4 rounded-[15px] bg-color-secondary px-4 py-[16px] transition-all duration-500 hover:bg-color-white`}
            >
              <FaStethoscope
                fontSize={15}
                className="text-color-white transition-all duration-500 group-hover:text-color-secondary"
              />
              <button className="z-30">
                <h1 className="text-sm font-normal text-color-white transition-all duration-500 group-hover:text-color-secondary">
                  Uzman mısınız?
                </h1>
              </button>
            </div>
          </Link>
        )}
      </div>
      {pathname.includes("register") ||
      pathname.includes("login") ||
      pathname.includes("forgot-password") ? (
        pathname.includes("register") ? (
          <Link
            to={forDoctors ? "/register" : "/for-doctors/register"}
            onClick={() => {
              dispatch(updateDoctorState());
              handleHeaderMobilePatientClose();
            }}
          >
            <div
              className="group group z-20 flex cursor-pointer
        items-center  justify-center gap-4 rounded-[15px] bg-color-third
           px-8 py-4 transition-all duration-500 hover:bg-color-secondary"
            >
              {forDoctors ? (
                <FiSearch
                  fontSize={15}
                  className="text-color-white transition-all duration-500"
                />
              ) : (
                <FaStethoscope
                  fontSize={15}
                  className="text-color-white transition-all duration-500"
                />
              )}
              <button className="z-30">
                <h1 className="text-sm font-normal text-color-white transition-all duration-500">
                  {forDoctors ? "Danışan Olarak Kaydol" : "Uzman Olarak Kaydol"}
                </h1>
              </button>
            </div>
          </Link>
        ) : pathname.includes("login") ? (
          <Link
            to="/for-doctors/login"
            onClick={() => {
              dispatch(updateDoctorState());
              handleHeaderMobilePatientClose();
            }}
          >
            <div
              className="group group z-20 flex cursor-pointer
        items-center  justify-center gap-4 rounded-[15px] bg-color-third
           px-8 py-4 transition-all duration-500 hover:bg-color-secondary"
            >
              {forDoctors ? (
                <FiSearch
                  fontSize={15}
                  className="text-color-white transition-all duration-500"
                />
              ) : (
                <FaStethoscope
                  fontSize={15}
                  className="text-color-white transition-all duration-500"
                />
              )}
              <button className="z-30">
                <h1 className="text-sm font-normal text-color-white transition-all duration-500">
                  Uzman Olarak Gir
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
                  <Link to="/for-doctors/dashboard">
                    <div className="group flex cursor-pointer items-center justify-center gap-4 transition-all duration-300">
                      <div className="min-h-[50px] min-w-[50px] overflow-hidden rounded-[20px]">
                        {expertProfileImageBase64 ? (
                          <img
                            src={`data:image/jpeg;base64,${expertProfileImageBase64}`}
                            className="h-[50px] w-[50px] rounded-[15px]"
                            alt=""
                          />
                        ) : (
                          <button className="flex h-full w-full items-center justify-center rounded-[15px] bg-color-secondary p-4 transition-all duration-300 group-hover:bg-color-third">
                            <BsFillPersonFill className="text-[40px] text-color-white" />
                          </button>
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <h1 className="text-base font-bold uppercase text-color-dark-primary text-opacity-50 group-hover:text-opacity-80">
                          {`${
                            authExpertObject.expert_title
                              ? authExpertObject.expert_title.title_title
                              : ""
                          }`}
                        </h1>
                        <h1 className="text-base uppercase text-color-dark-primary group-hover:text-opacity-80">
                          {`${authExpertObject.expert_name} ${authExpertObject.expert_surname}`}
                        </h1>
                      </div>
                    </div>
                  </Link>
                  <button
                    className="rounded-[15px] bg-color-third p-4 transition-all 
                duration-300 hover:bg-color-danger-primary"
                    onClick={() => {
                      handleHeaderMobilePatientClose();
                      handleLogout();
                    }}
                  >
                    <FiLogOut className="text-[24px] text-color-white" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  <Link to="/dashboard">
                    <div className="group flex cursor-pointer items-center justify-center gap-4 transition-all duration-300">
                      <div className="min-h-[50px] min-w-[50px] overflow-hidden rounded-[20px]">
                        {profileImageBase64 ? (
                          <img
                            src={`data:image/jpeg;base64,${profileImageBase64}`}
                            className="h-[50px] w-[50px] rounded-[15px]"
                            alt=""
                          />
                        ) : (
                          <button className="flex h-full w-full items-center justify-center rounded-[15px] bg-color-secondary p-4 transition-all duration-300 group-hover:bg-color-third">
                            <BsFillPersonFill className="text-[40px] text-color-white" />
                          </button>
                        )}
                      </div>
                      <h1 className="text-base uppercase text-color-dark-primary group-hover:text-opacity-80">
                        {`${authObject?.client_name} ${authObject?.client_surname}`}
                      </h1>
                    </div>
                  </Link>
                  <button
                    className="rounded-[15px] bg-color-third p-4 transition-all 
                duration-300 hover:bg-color-danger-primary"
                    onClick={() => {
                      handleHeaderMobilePatientClose();
                      handleLogout();
                    }}
                  >
                    <FiLogOut className="text-[24px] text-color-white" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Link
                to={forDoctors ? "/for-doctors/register" : "/register"}
                onClick={handleHeaderMobilePatientClose}
              >
                <button className="group cursor-pointer rounded-[15px] bg-color-third px-4 py-4 transition-all duration-500 hover:bg-color-secondary">
                  <h1 className="text-sm font-normal text-color-white">
                    Hemen Kaydol
                  </h1>
                </button>
              </Link>
              <Link
                to={forDoctors ? "/for-doctors/login" : "/login"}
                onClick={handleHeaderMobilePatientClose}
              >
                <button
                  className={`group flex cursor-pointer items-center 
                  justify-center gap-2 rounded-[15px] border-[1px] 
                  border-solid border-color-main px-4 py-4 transition-all 
                  duration-500 hover:bg-color-white`}
                >
                  <h1
                    className={`text-sm font-normal text-color-main transition-all duration-500 group-hover:text-color-secondary`}
                  >
                    Giriş Yap
                  </h1>
                  <BsArrowRight
                    className={`text-color-main transition-all duration-500 group-hover:text-color-secondary`}
                    fontSize={20}
                  />
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

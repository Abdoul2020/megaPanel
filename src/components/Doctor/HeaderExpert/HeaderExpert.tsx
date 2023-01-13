import React, { useEffect, useState } from "react";
import { FaStethoscope } from "react-icons/fa";
import { BsArrowRight, BsFillPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addAuthObject } from "../../../features/auth/authSlice";
import { unauthenticate } from "../../../helpers/authHelper";
import { updateDoctorState } from "../../../features/options/optionsSlice";
import { addAuthExpertObject } from "../../../features/authExpert/authExpertSlice";
import { unauthenticateExpert } from "../../../helpers/authExpertHelper";
import { fetchExpertProfilePicture } from "../../../features/doctorSlice/doctorAPI";

export default function HeaderExpert() {
  const navigate = useNavigate();
  const forDoctors = useAppSelector((state) => state.options.forDoctors);
  const pathname = useAppSelector((state) => state.options.pathname);

  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(addAuthExpertObject(undefined));
    unauthenticateExpert(() => {
      navigate("/for-doctors/login");
    });
  };
  useEffect(() => {
    async function fetchData() {
      if (authExpertObject && authExpertObject.expert_avatar_path !== "") {
        setProfileImageLoader(true);
        const authExpertDownloadProfilePictureResponse =
          await fetchExpertProfilePicture(authExpertObject._id);
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
    }
    fetchData();
  }, [authExpertObject]);
  return (
    <div className="z-10 w-full absolute top-0 flex justify-center items-center">
      <div className="w-3/4 flex justify-between py-4 items-center">
        <div className="flex justify-center items-center gap-10">
          <Link to="/for-doctors">
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
          <Link to="/" onClick={() => dispatch(updateDoctorState())}>
            <div
              className={`${
                pathname === "/for-doctors" || pathname === "/"
                  ? "flex"
                  : "hidden"
              } z-20 flex justify-center items-center gap-4 px-8 py-[18px] rounded-[15px] bg-color-secondary hover:bg-color-white group transition-all duration-500 cursor-pointer`}
            >
              <FiSearch
                fontSize={15}
                className="text-color-white group-hover:text-color-secondary transition-all duration-500"
              />
              <button className="z-30">
                <h1 className="text-sm font-normal text-color-white group-hover:text-color-secondary transition-all duration-500">
                  {forDoctors ? "Uzman Ara" : "Uzman mısınız?"}
                </h1>
              </button>
            </div>
          </Link>
          <motion.ul
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              ease: "backInOut",
              duration: 0.7,
              reapat: 1,
            }}
            viewport={{ once: true }}
            className={`flex justify-center items-center gap-8 ${
              pathname.includes("register") ||
              pathname.includes("login") ||
              pathname.includes("forgot-password")
                ? "hidden"
                : "flex"
            }`}
          >
            <li className="hover:opacity-80 hover:cursor-pointer">
              <h1
                className={forDoctors ? "text-color-main" : "text-color-white"}
              >
                Özellikler
              </h1>
            </li>
            <li className="hover:opacity-80 hover:cursor-pointer">
              <h1
                className={forDoctors ? "text-color-main" : "text-color-white"}
              >
                S.S.S
              </h1>
            </li>
            <li className="hover:opacity-80 hover:cursor-pointer">
              <h1
                className={forDoctors ? "text-color-main" : "text-color-white"}
              >
                Fiyatlar
              </h1>
            </li>
            <li className="hover:opacity-80 hover:cursor-pointer">
              <h1
                className={forDoctors ? "text-color-main" : "text-color-white"}
              >
                Destek
              </h1>
            </li>
          </motion.ul>
        </div>
        {pathname.includes("register") ||
        pathname.includes("login") ||
        pathname.includes("forgot-password") ? (
          pathname.includes("register") ? (
            <Link
              to={forDoctors ? "/register" : "/for-doctors/register"}
              onClick={() => dispatch(updateDoctorState())}
            >
              <div
                className="z-20 flex justify-center items-center gap-4
        group  px-8 py-4 rounded-[15px] bg-color-third
           hover:bg-color-secondary group transition-all duration-500 cursor-pointer"
              >
                <FiSearch
                  fontSize={15}
                  className="text-color-white transition-all duration-500"
                />
                <button className="z-30">
                  <h1 className="text-sm font-normal text-color-white transition-all duration-500">
                    {forDoctors
                      ? "Danışman Olarak Kaydol"
                      : "Uzman Olarak Kaydol"}
                  </h1>
                </button>
              </div>
            </Link>
          ) : pathname.includes("login") ? (
            <Link to="/login" onClick={() => dispatch(updateDoctorState())}>
              <div
                className="z-20 flex justify-center items-center gap-4
        group  px-8 py-4 rounded-[15px] bg-color-third
           hover:bg-color-secondary group transition-all duration-500 cursor-pointer"
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
                    Danışman Olarak Gir
                  </h1>
                </button>
              </div>
            </Link>
          ) : (
            <div></div>
          )
        ) : (
          <div>
            {authExpertObject !== undefined ? (
              <div className="flex justify-center items-center gap-8">
                <Link to="/for-doctors/dashboard">
                  <div className="flex justify-center items-center gap-4 transition-all duration-300 group cursor-pointer">
                    <div className="w-[50px] h-[50px] rounded-[20px] overflow-hidden">
                      {profileImageBase64 ? (
                        <img
                          src={`data:image/jpeg;base64,${profileImageBase64}`}
                          className="w-[50px] h-[50px] rounded-[15px]"
                          alt=""
                        />
                      ) : (
                        <button className="w-full h-full flex justify-center items-center p-4 rounded-[15px] bg-color-secondary group-hover:bg-color-third transition-all duration-300">
                          <BsFillPersonFill className="text-color-white text-[40px]" />
                        </button>
                      )}
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <h1 className="text-color-dark-primary uppercase text-lg font-bold text-opacity-50 group-hover:text-opacity-80">
                        {`${
                          authExpertObject.expert_title
                            ? authExpertObject.expert_title.title_title
                            : ""
                        }`}
                      </h1>
                      <h1 className="text-color-dark-primary uppercase text-base group-hover:text-opacity-80">
                        {`${authExpertObject.expert_name} ${authExpertObject.expert_surname}`}
                      </h1>
                    </div>
                  </div>
                </Link>
                <button
                  className="p-4 rounded-[15px] bg-color-third hover:bg-color-secondary 
                transition-all duration-300"
                  onClick={handleLogout}
                >
                  <FiLogOut className="text-color-white text-[24px]" />
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-4">
                <Link to="/for-doctors/register">
                  <button className="px-8 py-4 rounded-[15px] bg-color-third hover:bg-color-secondary group transition-all duration-500 cursor-pointer">
                    <h1 className="text-sm font-normal text-color-white">
                      Hemen Kaydol
                    </h1>
                  </button>
                </Link>
                <Link to="/for-doctors/login">
                  <button
                    className={`flex justify-center items-center gap-2 px-8 py-4 rounded-[15px] border-solid border-[1px] ${
                      forDoctors || pathname !== "/"
                        ? "border-color-main"
                        : "border-color-white"
                    } hover:bg-color-white ${
                      forDoctors
                        ? "hover:border-color-white"
                        : "hover:border-color-main"
                    } group transition-all duration-500 cursor-pointer`}
                  >
                    <h1
                      className={`text-sm font-normal ${
                        forDoctors || pathname !== "/"
                          ? "text-color-main"
                          : "text-color-white"
                      } group-hover:text-color-secondary transition-all duration-500`}
                    >
                      Giriş Yap
                    </h1>
                    <BsArrowRight
                      className={`${
                        forDoctors || pathname !== "/"
                          ? "text-color-main"
                          : "text-color-white"
                      } group-hover:text-color-secondary transition-all duration-500`}
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

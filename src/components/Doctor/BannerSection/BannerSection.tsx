import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { updateAlert } from "../../../features/options/optionsSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Alert } from "../../../common/types/Alert";
import {
  isAuthExpert,
  unauthenticatehardExpert,
} from "../../../helpers/authExpertHelper";
import { addAuthExpertObject } from "../../../features/authExpert/authExpertSlice";
import {
  isAuth,
  removeCookie,
  unauthenticatehard,
} from "../../../helpers/authHelper";
import { addAuthObject } from "../../../features/auth/authSlice";

type Props = {};

export default function BannerSection({}: Props) {
  const [appointmentType, setAppointmenType] = useState("online");
  const [city, setCity] = useState("");
  const [queryText, setQueryText] = useState("");

  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isAuth() || isAuthExpert()) {
      if (window.confirm("Oturumu kapatmayı onaylıyor musunuz?")) {
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
        if (isAuthExpert()) {
          const alert: Alert = {
            type: "warning",
            text: "Aktif oturumunuz bulunuyor",
            active: true,
            statusCode: 401,
          };
          dispatch(updateAlert(alert));
        } else {
          navigate(
            `/for-doctors/register?company=${company}&name=${name}&surname=${surname}`
          );
        }
      }
    } else {
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
      if (isAuthExpert()) {
        const alert: Alert = {
          type: "warning",
          text: "Aktif oturumunuz bulunuyor",
          active: true,
          statusCode: 401,
        };
        dispatch(updateAlert(alert));
      } else {
        navigate(
          `/for-doctors/register?company=${company}&name=${name}&surname=${surname}`
        );
      }
    }
  };
  const handleNameChange = (e: any) => {
    const value = e.target.value;
    setName(value);
  };
  const handleSurnameChange = (e: any) => {
    const value = e.target.value;
    setSurname(value);
  };
  const handleCompanyChange = (e: any) => {
    const value = e.target.value;
    setCompany(value);
  };

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();
    navigate(
      `/search?online=${
        appointmentType === "online"
      }&city=${city}&query_text=${queryText}`,
      {
        state: { online: appointmentType === "online" },
      }
    );
  };
  const onCityChange = (e: any) => {
    const value = e.target.value;
    setCity(value);
  };

  const handleQueryTextChange = (e: any) => {
    const value = e.target.value;
    setQueryText(value);
  };

  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const authObject = useAppSelector((state) => state.auth.auth_object);

  const cities = useAppSelector((state) => state.cities.citiesList);

  return (
    <section className="relative flex h-[50vh] w-full items-center justify-center bg-doctor-color-main bg-opacity-50 bg-no-repeat pt-[90px]">
      {authExpertObject ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            ease: "backInOut",
            duration: 1,
            reapat: 1,
          }}
          viewport={{ once: true }}
          className="z-10 flex w-full flex-col items-center justify-center gap-6 px-10 lg:px-0"
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-[28px] font-bold text-color-main lg:text-[40px]">
              Uluslararası kişisel gelişim portalı,
            </h1>
            <h1 className="text-center text-[28px] font-bold text-color-third lg:text-[40px]">
              <span className="font-bold text-color-main">
                Uzman bul, randevu al,
              </span>{" "}
              online görüşme yap!
            </h1>
          </div>
          <div className="rounded-[30px] bg-color-secondary p-2">
            <div className="relative grid grid-cols-2 p-2">
              <div
                className="flex cursor-pointer items-center justify-center p-3 px-6 lg:px-12"
                onClick={() => setAppointmenType("online")}
              >
                <h1 className="z-50 text-sm font-bold text-color-white">
                  Online Görüşme
                </h1>
              </div>
              <div
                className="flex cursor-pointer items-center justify-center py-3 px-6 lg:px-12"
                onClick={() => setAppointmenType("facetoface")}
              >
                <h1 className="z-50 text-sm font-bold text-color-white">
                  Yüz Yüze Randevu
                </h1>
              </div>
              <div
                className={`transition-all duration-500 ${
                  appointmentType === "online"
                    ? "translate-x-0"
                    : "translate-x-full"
                } pointer-events-none absolute h-full w-1/2 rounded-[25px] bg-doctor-color-main`}
              ></div>
            </div>
          </div>
          <div className=" w-full lg:w-3/4 flex justify-center items-center">
            <form
              className="flex w-full lg:w-2/3 items-center justify-between gap-2 overflow-hidden rounded-[20px] bg-color-white-secondary py-1 pr-1"
              onSubmit={handleSubmitSearch}
            >
              <div
                className={`${
                  appointmentType === "online"
                    ? "ml-0 hidden -translate-x-full"
                    : "block translate-x-0"
                } ml-2 h-full rounded-[20px] bg-color-main 
              p-4 px-2
              opacity-80 
            transition-all duration-500 hover:opacity-100`}
              >
                <select
                  name=""
                  id=""
                  className="w-full cursor-pointer bg-color-main text-sm lg:text-lg text-color-white outline-none scrollbar-thin scrollbar-track-color-white
                 scrollbar-thumb-color-main-extra"
                  onChange={onCityChange}
                >
                  <option value="" selected>
                    Konum Seç
                  </option>
                  {cities.map((City, index) => {
                    return (
                      <option key={index} value={City}>
                        {City}
                      </option>
                    );
                  })}
                </select>
              </div>
              <input
                onChange={handleQueryTextChange}
                type="text"
                name="search"
                id="search"
                className="w-full bg-color-white-secondary py-2 pl-4 text-sm lg:text-base tracking-wide opacity-80 outline-none"
                placeholder="Uzman veya branş arayın..."
              />
              <button
                type="submit"
                className="flex h-[64px] items-center justify-center gap-4 rounded-[20px] bg-color-main py-4 px-6 opacity-80 transition-all duration-500 hover:opacity-100"
              >
                <h1 className="font-bold text-sm lg:text-sm text-color-white">ara</h1>
                <FiSearch className="text-xl font-bold text-color-white" />
              </button>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            ease: "backInOut",
            duration: 1,
            reapat: 1,
          }}
          viewport={{ once: true }}
          className="z-10 flex flex-col items-center justify-center gap-6 px-10 lg:px-0"
        >
          <h1 className="w-2/3 text-center text-[32px] font-bold text-color-main lg:text-[40px]">
            Bulut Tabanlı,
            <span className="text-center text-color-third">
              Uluslararası Online Kişisel Gelişim Portalı
            </span>
          </h1>
          <div>
            <form
              className="flex w-full items-center justify-center gap-2 rounded-[20px] bg-color-white-secondary py-1 pr-1 pl-6"
              onSubmit={handleSubmit}
            >
              <input
                onChange={handleCompanyChange}
                value={company}
                type="text"
                name="company"
                id="company"
                className="w-2/4 border-r-2 border-solid border-color-dark-primary border-opacity-10 bg-color-white-secondary py-2 text-base tracking-wide opacity-80 outline-none"
                placeholder="Firma Adı"
              />
              <input
                onChange={handleNameChange}
                value={name}
                type="text"
                name="name"
                id="name"
                className="w-1/4 border-r-2 border-solid border-color-dark-primary border-opacity-10 bg-color-white-secondary py-2 pl-6 text-base tracking-wide opacity-80 outline-none"
                placeholder="Ad"
              />
              <input
                onChange={handleSurnameChange}
                value={surname}
                type="text"
                name="surname"
                id="surname"
                className="w-1/4 bg-color-white-secondary py-2 pl-6 text-base tracking-wide opacity-80 outline-none"
                placeholder="Soyad"
              />
              <button
                type="submit"
                className="flex h-[64px] items-center justify-center gap-4 rounded-[20px] bg-color-main py-4 px-6 opacity-80 transition-all duration-500 hover:opacity-100"
              >
                <h1 className="text-sm font-bold text-color-white lg:text-base">
                  Ücretsiz Dene
                </h1>
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </section>
  );
}

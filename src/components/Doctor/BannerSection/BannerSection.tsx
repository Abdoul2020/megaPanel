import { motion } from "framer-motion";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Alert } from "../../../common/types/Alert";
import { State } from "../../../common/types/State.entity";
import { addAuthObject } from "../../../features/auth/authSlice";
import { addAuthExpertObject } from "../../../features/authExpert/authExpertSlice";
import { updateAlert } from "../../../features/options/optionsSlice";
import {
  isAuthExpert,
  unauthenticatehardExpert,
} from "../../../helpers/authExpertHelper";
import {
  isAuth,
  removeCookie,
  unauthenticatehard,
} from "../../../helpers/authHelper";

type Props = {};

export default function BannerSection({}: Props) {
  const [appointmentType, setAppointmenType] = useState("online");
  const [queryText, setQueryText] = useState("");
  const [filteredStates, setFilteredStates] = useState<State[]>();

  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

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
    const valueRaw = e.target.value;
    const value = JSON.parse(valueRaw).name;
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

  const onCountryChange = (e: any) => {
    const valueRaw = e.target.value;
    const value = JSON.parse(valueRaw);
    setCountry(value.name);
    setFilteredStates(states.filter((state) => state.country_id == value.id));
  };
  const states = useAppSelector((state) => state.states.statesList);
  const countries = useAppSelector((state) => state.countries.countriesList);

  return (
    <section className="relative flex h-[70vh] w-full flex-col items-center justify-center bg-doctor-color-main bg-opacity-50 bg-no-repeat pt-[90px] sm:pt-0">
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
            <h1 className="text-center text-[22px] font-bold text-color-main sm:text-[28px] lg:text-[40px]">
              Uluslararası kişisel gelişim portalı,
            </h1>
            <h1 className="text-center text-[22px] font-bold text-color-third sm:text-[28px] lg:text-[40px]">
              <span className="font-bold text-color-main">
                Uzman bul, randevu al,
              </span>{" "}
              online görüşme yap!
            </h1>
          </div>
          <div className="rounded-[30px] bg-color-secondary p-2">
            <div className="relative grid grid-cols-2 p-2">
              <div
                className="flex cursor-pointer items-center justify-center py-2 px-3 sm:py-3 sm:px-6 lg:px-12"
                onClick={() => setAppointmenType("online")}
              >
                <h1 className="z-50 text-xs font-bold text-color-white sm:text-sm">
                  Online Görüşme
                </h1>
              </div>
              <div
                className="flex cursor-pointer items-center justify-center py-2 px-3 sm:py-3 sm:px-6 lg:px-12"
                onClick={() => setAppointmenType("facetoface")}
              >
                <h1 className="z-50 text-xs font-bold text-color-white sm:text-sm">
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
          <div className=" flex w-full items-center justify-center lg:w-3/4">
            <form
              className="flex w-full items-center justify-between gap-2 overflow-hidden rounded-[20px] bg-color-white-secondary py-1 pr-1 lg:w-2/3"
              onSubmit={handleSubmitSearch}
            >
              {appointmentType !== "online" ? (
                <div className="flex h-[64px] items-center justify-center gap-1 pl-1">
                  <div className="flex h-full items-center justify-center rounded-[20px] bg-color-main">
                    <select
                      name=""
                      id=""
                      className="w-[100px] cursor-pointer bg-color-main text-base text-color-white outline-none"
                      onChange={onCountryChange}
                    >
                      <option value="" selected>
                        Ülke Seç
                      </option>
                      {countries.map((Country) => {
                        return (
                          <option
                            key={Country.id}
                            selected={country === Country.name}
                            value={JSON.stringify(Country)}
                          >
                            {Country.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex h-full items-center justify-center rounded-[20px] bg-color-main">
                    <select
                      name=""
                      id=""
                      className="w-[100px] cursor-pointer bg-color-main text-base text-color-white outline-none"
                      onChange={onCityChange}
                    >
                      <option value="" selected>
                        Şehir Seç
                      </option>
                      {filteredStates?.map((State) => {
                        return (
                          <option
                            key={State.id}
                            selected={city === State.name}
                            value={JSON.stringify(State)}
                          >
                            {State.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <input
                onChange={handleQueryTextChange}
                type="text"
                name="search"
                id="search"
                className="w-full bg-color-white-secondary py-2 pl-4 text-sm tracking-wide opacity-80 outline-none lg:text-base"
                placeholder="Uzman veya branş arayın..."
              />
              <button
                type="submit"
                className="flex h-[64px] items-center justify-center gap-4 rounded-[20px] bg-color-main py-4 px-6 opacity-80 transition-all duration-500 hover:opacity-100"
              >
                <h1 className="text-sm font-bold text-color-white lg:text-sm">
                  ara
                </h1>
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
          <h1 className="w-2/3 text-center text-[22px] font-bold text-color-main sm:text-[28px] lg:text-[40px]">
            Bulut Tabanlı,
            <span className="text-color-third">
              {" "}
              Uluslararası Online Kişisel Gelişim Portalı
            </span>
          </h1>
          <div>
            <form
              className="flex w-full flex-col items-center justify-center gap-2 rounded-[20px] bg-color-white-secondary p-4 pl-4 sm:flex-row sm:py-1 sm:pr-1 sm:pl-6"
              onSubmit={handleSubmit}
            >
              <input
                onChange={handleCompanyChange}
                value={company}
                type="text"
                name="company"
                id="company"
                className="w-full border-b-2 border-solid border-color-dark-primary border-opacity-10 bg-color-white-secondary py-2 text-base tracking-wide opacity-80 outline-none sm:w-2/4 sm:border-r-2 md:border-b-0"
                placeholder="Firma Adı"
              />
              <input
                onChange={handleNameChange}
                value={name}
                type="text"
                name="name"
                id="name"
                className="w-full border-b-2 border-solid border-color-dark-primary border-opacity-10 bg-color-white-secondary py-2 pl-0 text-base tracking-wide opacity-80 outline-none sm:w-1/4 sm:border-r-2 sm:pl-6 md:border-b-0"
                placeholder="Ad"
              />
              <input
                onChange={handleSurnameChange}
                value={surname}
                type="text"
                name="surname"
                id="surname"
                className="w-full border-b-2 border-solid border-color-dark-primary border-opacity-10 bg-color-white-secondary py-2 pl-0 text-base tracking-wide opacity-80 outline-none sm:w-1/4 sm:border-r-2 sm:pl-6 md:border-b-0"
                placeholder="Soyad"
              />
              <button
                type="submit"
                className="flex h-[48px] items-center justify-center gap-4 rounded-[20px] bg-color-main py-4 px-6 opacity-80 transition-all duration-500 hover:opacity-100 sm:h-[64px]"
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

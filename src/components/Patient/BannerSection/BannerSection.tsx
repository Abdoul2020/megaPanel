import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

export default function BannerSection() {
  const [appointmentType, setAppointmenType] = useState("online");
  const [city, setCity] = useState("");
  const [queryText, setQueryText] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
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
  const cities = useAppSelector((state) => state.cities.citiesList);
  return (
    <section
      className="h-[70vh] w-full relative bg-no-repeat flex flex-col justify-center items-center"
      style={{
        background:
          "radial-gradient(circle, rgba(51,169,179,1) 0%, rgba(22,63,64,1) 35%)",
      }}
    >
      <div className="bg-color-main absolute w-full h-full opacity-80"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          ease: "backInOut",
          duration: 1,
          reapat: 1,
        }}
        viewport={{ once: true }}
        className="z-10 flex flex-col justify-center items-center gap-6"
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-color-white font-bold text-[40px]">
            Uluslararası kişisel gelişim portalı,
          </h1>
          <h1 className="text-color-third font-bold text-[40px]">
            <span className="text-color-white font-bold">
              Uzman bul, randevu al,
            </span>{" "}
            online görüşme yap!
          </h1>
        </div>
        <div className="bg-color-third rounded-[30px] p-2">
          <div className="grid grid-cols-2 relative p-2">
            <div
              className="p-3 px-12 flex justify-center items-center cursor-pointer"
              onClick={() => setAppointmenType("online")}
            >
              <h1 className="text-sm font-bold text-color-white z-50">
                Online Görüşme
              </h1>
            </div>
            <div
              className="py-3 px-12 flex justify-center items-center cursor-pointer"
              onClick={() => setAppointmenType("facetoface")}
            >
              <h1 className="text-sm font-bold text-color-white z-50">
                Yüz Yüze Randevu
              </h1>
            </div>
            <div
              className={`transition-all duration-500 ${
                appointmentType === "online"
                  ? "translate-x-0"
                  : "translate-x-full"
              } h-full w-1/2 bg-color-secondary absolute rounded-[25px] pointer-events-none`}
            ></div>
          </div>
        </div>
        <div>
          <form
            className="overflow-hidden flex justify-center items-center gap-2 bg-color-white-secondary py-1 pr-1 rounded-[20px]"
            onSubmit={handleSubmit}
          >
            <div
              className={`${
                appointmentType === "online"
                  ? "-translate-x-full ml-0 hidden"
                  : "translate-x-0 block"
              } w-[150px] h-full p-4 ml-2 bg-color-main 
              rounded-[20px] 
              opacity-80 
            hover:opacity-100 transition-all duration-500`}
            >
              <select
                name=""
                id=""
                className="text-color-white outline-none text-lg w-full cursor-pointer bg-color-main scrollbar-thin scrollbar-thumb-color-main-extra
                 scrollbar-track-color-white"
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
              className="pl-4 text-base py-2 w-[600px] outline-none tracking-wide opacity-80 bg-color-white-secondary"
              placeholder="Uzman veya branş arayın..."
            />
            <button
              type="submit"
              className="py-4 h-[64px] px-6 flex justify-center items-center gap-4 bg-color-main rounded-[20px] opacity-80 hover:opacity-100 transition-all duration-500"
            >
              <h1 className="font-bold text-color-white">ara</h1>
              <FiSearch className="text-color-white font-bold text-xl" />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

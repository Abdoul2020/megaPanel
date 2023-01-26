import { motion } from "framer-motion";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
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
      className="relative flex h-[70vh] w-full flex-col items-center justify-center bg-no-repeat"
      style={{
        background:
          "radial-gradient(circle, rgba(51,169,179,1) 0%, rgba(22,63,64,1) 35%)",
      }}
    >
      <div className="absolute h-full w-full bg-color-main opacity-80"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          ease: "backInOut",
          duration: 1,
          reapat: 1,
        }}
        viewport={{ once: true }}
        className="z-10 flex w-full flex-col items-center justify-center gap-6 px-10 pt-[90px] sm:pt-0 lg:px-0"
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-[22px] font-bold text-color-white sm:text-[28px] lg:text-[40px]">
            Uluslararası kişisel gelişim portalı,
          </h1>
          <h1 className="text-center text-[22px] font-bold text-color-third sm:text-[28px] lg:text-[40px]">
            <span className="font-bold text-color-white">
              Uzman bul, randevu al,
            </span>{" "}
            online görüşme yap!
          </h1>
        </div>
        <div className="rounded-[30px] bg-color-third p-2">
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
              } pointer-events-none absolute h-full w-1/2 rounded-[25px] bg-color-main`}
            ></div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center lg:w-3/4">
          <form
            className="flex w-full items-center justify-between gap-2 overflow-hidden rounded-[20px] bg-color-white-secondary py-1 pr-1 lg:w-2/3"
            onSubmit={handleSubmit}
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
                className="w-full cursor-pointer bg-color-main text-sm text-color-white outline-none scrollbar-thin scrollbar-track-color-white scrollbar-thumb-color-main-extra
                 lg:text-lg"
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
    </section>
  );
}

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { Branch } from "../../../common/types/Branch.entity";
import { Doctor } from "../../../common/types/Doctor.entity";
import { State } from "../../../common/types/State.entity";
import { BsCaretDownFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import { fetchBranches } from "../../../features/branches/branchesAPI";
import { fetchExperts } from "../../../features/doctorSlice/doctorAPI";

export default function BannerSection() {
  const [inputSelectOpen, setInputSelectOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const [queryText, setQueryText] = useState("");
  const [filteredStates, setFilteredStates] = useState<State[]>();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Turkey");
  const [elementsLoading, setElementsLoading] = useState(false);
  const [inputSelectLoading, setInputSelectLoading] = useState(false);

  const [sort, setSort] = useState("ASC");

  const [inputSelectBranches, setInputSelectBranches] = useState<Branch[]>();
  const [inputSelectExperts, setInputSelectExperts] = useState<Doctor[]>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/search?online=${online}&city=${city}&query_text=${queryText}`, {
      state: { online: online },
    });
  };
  const onCityChange = (obj: any) => {
    const value = JSON.parse(obj).name;
    setCity(value);
    setCitySelectOpen(false);
  };
  const handleQueryTextChange = (e: any) => {
    const value = e.target.value;
    setQueryText(value);
  };
  const onCountryChange = (obj: any) => {
    const value = JSON.parse(obj);
    setCountry(value.name);
    setFilteredStates(states.filter((state) => state.country_id == value.id));
    setCountrySelectOpen(false);
  };
  useEffect(() => {
    const value = countries.find((Country) => Country.name === country);
    setFilteredStates(
      states.filter((state) => state.country_id == String(value?.id))
    );
  }, []);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setCountrySelectOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  function useOutsideAlerterCity(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setCitySelectOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  function useOutsideAlerterInput(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setInputSelectOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  const wrapperRefCity = useRef(null);
  const wrapperRefInput = useRef(null);
  useOutsideAlerter(wrapperRef);
  useOutsideAlerterCity(wrapperRefCity);
  useOutsideAlerterInput(wrapperRefInput);
  const [countrySelectOpen, setCountrySelectOpen] = useState(false);
  const handleCountrySelectOpen = () => {
    setCountrySelectOpen((value) => !value);
  };
  const [citySelectOpen, setCitySelectOpen] = useState(false);
  const handleCitySelectOpen = () => {
    setCitySelectOpen((value) => !value);
  };

  const handleCleanInput = () => {
    setQueryText("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleSearchValueChange = (e: any) => {
    const value = e.target.value;
    setQueryText(value);
    async function fetchData() {
      const queryExperts = {
        page: 1,
        size: 5,
        sort: sort,
        sort_by: "expert_name",
        query_text: value,
        city: "",
        operating_type: 1,
      };
      const queryBranches = {
        page: 1,
        size: 5,
        sort: "ASC",
        sort_by: "branch_title",
        query_text: value,
      };
      setInputSelectLoading(true);
      const fetchBranchResponse = await fetchBranches(queryBranches);
      const fetchExpertsResponse = await fetchExperts(queryExperts);
      setInputSelectLoading(false);
      setInputSelectBranches(fetchBranchResponse.data.data);
      setInputSelectExperts(fetchExpertsResponse.data.data);
    }
    fetchData();
  };
  const handleSearchOnFocus = () => {
    setInputSelectOpen(true);
    async function fetchData() {
      let queryExperts = {
        page: 1,
        size: 5,
        sort: sort,
        sort_by: "expert_name",
        query_text: queryText,
        city: city,
        operating_type: 1,
      };
      let queryBranches = {
        page: 1,
        size: 5,
        sort: "ASC",
        sort_by: "branch_title",
        query_text: queryText,
      };
      setInputSelectLoading(true);
      const fetchBranchResponse = await fetchBranches(queryBranches);
      const fetchExpertsResponse = await fetchExperts(queryExperts);
      setInputSelectLoading(false);
      setInputSelectBranches(fetchBranchResponse.data.data);
      setInputSelectExperts(fetchExpertsResponse.data.data);
    }
    fetchData();
  };
  const handleInputSelectSubmit = (q: string) => {
    setQueryText(q);
    setInputSelectOpen(false);
    setCitySelectOpen(false);
    setInputSelectOpen(false);
    setCountrySelectOpen(false);
    // navigate(`/search?online=${online}&city=${city}&query_text=${q}`, {
    //   state: { online: online },
    // });
  };
  const states = useAppSelector((state) => state.states.statesList);
  const countries = useAppSelector((state) => state.countries.countriesList);
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
              onClick={() => setOnline(true)}
            >
              <h1 className="z-50 text-xs font-bold text-color-white sm:text-sm">
                Online Görüşme
              </h1>
            </div>
            <div
              className="flex cursor-pointer items-center justify-center py-2 px-3 sm:py-3 sm:px-6 lg:px-12"
              onClick={() => setOnline(false)}
            >
              <h1 className="z-50 text-xs font-bold text-color-white sm:text-sm">
                Yüz Yüze Randevu
              </h1>
            </div>
            <div
              className={`transition-all duration-500 ${
                online ? "translate-x-0" : "translate-x-full"
              } pointer-events-none absolute h-full w-1/2 rounded-[25px] bg-color-main`}
            ></div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center lg:w-2/3">
          <form
            className="flex w-full items-center justify-between gap-2 rounded-[20px] bg-color-white lg:w-2/3"
            onSubmit={handleSubmit}
          >
            {!online ? (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ease: "backInOut",
                  duration: 0.5,
                  reapat: 1,
                }}
                className="flex h-[55px] items-center justify-center gap-1 p-1"
              >
                {country !== "" && country !== undefined ? (
                  <div
                    className="relative flex h-full w-[100px] cursor-pointer items-center justify-center rounded-l-[15px] bg-color-main px-1 outline-none transition-all duration-300 ease-out hover:opacity-80"
                    onClick={() => setCountry("")}
                  >
                    <div className="flex w-full items-center justify-center">
                      <AiFillCloseCircle className="text-[18px] text-color-white" />
                      <h1 className="text-truncate w-[70px] text-center text-base text-color-white">
                        {country}
                      </h1>
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative flex h-full w-[100px] items-center justify-center rounded-l-[15px] bg-color-main px-1 outline-none"
                    ref={wrapperRef}
                  >
                    <div
                      className="flex w-full cursor-pointer items-center justify-center gap-2"
                      onClick={() => handleCountrySelectOpen()}
                    >
                      <h1 className="text-truncate w-[70px] text-center text-base text-color-white">
                        {country !== "" && country !== undefined
                          ? country
                          : "Ülke Seç"}
                      </h1>
                      <BsCaretDownFill className="text-[11px] text-color-white" />
                    </div>
                    <div
                      className={`${
                        countrySelectOpen ? "absolute" : "hidden"
                      } top-[120%] left-0 z-20 h-[250px] min-w-[300px] rounded-[15px] bg-color-white p-2 shadow-sm`}
                    >
                      <ul className="flex h-full w-full flex-col items-start justify-start gap-2 overflow-y-scroll p-1 pr-4 overflow-x-hidden scrollbar-thin scrollbar-track-color-white-secondary scrollbar-thumb-color-secondary scrollbar-track-rounded-lg scrollbar-thumb-rounded-full">
                        {countries.map((Country) => {
                          return (
                            <li
                              className={`mr-2 rounded-md bg-color-main py-1 px-2 ${
                                country === Country.name
                                  ? "bg-opacity-20"
                                  : "bg-opacity-0"
                              } w-full cursor-pointer hover:bg-opacity-20`}
                              onClick={() =>
                                onCountryChange(JSON.stringify(Country))
                              }
                            >
                              <h1 className=" text-color-dark-primary">
                                {Country.name}
                              </h1>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
                {city !== "" && city !== undefined ? (
                  <div
                    className="relative flex h-full w-[100px] cursor-pointer items-center justify-center rounded-r-[15px] bg-color-main px-1 outline-none transition-all duration-300 ease-out hover:opacity-80"
                    onClick={() => setCity("")}
                  >
                    <div className="flex w-full items-center justify-center">
                      <h1 className="text-truncate w-[70px] text-center text-base text-color-white">
                        {city}
                      </h1>
                      <AiFillCloseCircle className="text-[18px] text-color-white" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative flex h-full w-[100px] items-center justify-center rounded-r-[15px] bg-color-main px-1 outline-none"
                    ref={wrapperRefCity}
                  >
                    <div
                      className="flex w-full cursor-pointer items-center justify-center gap-2"
                      onClick={() => handleCitySelectOpen()}
                    >
                      <h1 className="text-truncate w-[70px] text-center text-base text-color-white">
                        {city !== "" && city !== undefined ? city : "Şehir Seç"}
                      </h1>
                      <BsCaretDownFill className="text-[11px] text-color-white" />
                    </div>
                    <div
                      className={`${
                        citySelectOpen ? "absolute" : "hidden"
                      } top-[120%] left-0 z-20 h-[250px] min-w-[300px] rounded-[15px] bg-color-white p-2 shadow-sm`}
                    >
                      <ul className="flex h-full w-full flex-col items-start justify-start gap-2 overflow-y-scroll p-1 pr-4 overflow-x-hidden scrollbar-thin scrollbar-track-color-white-secondary scrollbar-thumb-color-secondary scrollbar-track-rounded-lg scrollbar-thumb-rounded-full">
                        {filteredStates?.map((City) => {
                          return (
                            <li
                              className={`mr-2 rounded-md bg-color-main py-1 px-2 ${
                                city === City.name
                                  ? "bg-opacity-20"
                                  : "bg-opacity-0"
                              } w-full cursor-pointer hover:bg-opacity-20`}
                              onClick={() => onCityChange(JSON.stringify(City))}
                            >
                              <h1 className=" text-color-dark-primary">
                                {City.name}
                              </h1>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div></div>
            )}
            <div
              className="relative flex w-full items-center justify-center"
              ref={wrapperRefInput}
            >
              <input
                ref={inputRef}
                onChange={handleSearchValueChange}
                value={queryText}
                onFocus={handleSearchOnFocus}
                type="text"
                name="search"
                id="search"
                autoComplete="off"
                className="w-full bg-color-white py-2 pl-4 text-sm tracking-wide opacity-80 outline-none lg:text-base"
                placeholder="Uzman veya branş arayın..."
              />
              {queryText.length > 0 ? (
                <div onClick={handleCleanInput} className="cursor-pointer">
                  <IoClose className="text-color-dark-primary text-opacity-50" />
                </div>
              ) : (
                <div></div>
              )}
              {inputSelectOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    ease: "backInOut",
                    duration: 0.5,
                    reapat: 1,
                  }}
                  className="absolute top-[150%] left-0 z-[99] w-full rounded-[15px] bg-color-white p-4 shadow-sm"
                >
                  <div className="flex max-h-[300px] w-full flex-col items-start justify-start gap-4 overflow-y-scroll scrollbar-thin scrollbar-track-color-white-secondary scrollbar-thumb-color-secondary scrollbar-track-rounded-lg scrollbar-thumb-rounded-full">
                    <div className="flex w-full flex-col items-start justify-start gap-2">
                      <div className="flex items-center justify-center gap-1">
                        <h1 className="font-bold text-color-dark-primary text-opacity-50">
                          Branşlar
                        </h1>
                        <div
                          className={`${
                            inputSelectLoading ? "inline-block" : "hidden"
                          } animate-spin`}
                        >
                          <BiLoaderAlt className="text-[16px] text-color-dark-primary text-opacity-50" />
                        </div>
                      </div>
                      <ul className="flex w-full flex-col items-start justify-start gap-1">
                        {inputSelectBranches?.map((Branch) => {
                          return (
                            <li
                              className="flex w-full cursor-pointer items-center justify-start gap-1 rounded-[10px] p-1 hover:bg-color-secondary hover:bg-opacity-10"
                              onClick={() =>
                                handleInputSelectSubmit(Branch.branch_title)
                              }
                            >
                              <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
                                {Branch.branch_title}
                              </h1>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="flex w-full flex-col items-start justify-start gap-2">
                      <div className="flex items-center justify-center gap-1">
                        <h1 className="font-bold text-color-dark-primary text-opacity-50">
                          Uzmanlar
                        </h1>
                        <div
                          className={`${
                            inputSelectLoading ? "inline-block" : "hidden"
                          } animate-spin`}
                        >
                          <BiLoaderAlt className="text-[16px] text-color-dark-primary text-opacity-50" />
                        </div>
                      </div>
                      <ul className="flex w-full flex-col items-start justify-start gap-1">
                        {inputSelectExperts?.map((Expert) => {
                          return (
                            <li
                              className="flex w-full cursor-pointer items-end justify-start gap-2 rounded-[10px] p-1 hover:bg-color-secondary hover:bg-opacity-10"
                              onClick={() =>
                                handleInputSelectSubmit(Expert.expert_name)
                              }
                            >
                              <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center gap-2">
                                  <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
                                    {Expert.expert_title.title_title}
                                  </h1>
                                  <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
                                    {Expert.expert_name}
                                  </h1>
                                  <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
                                    {Expert.expert_surname}
                                  </h1>
                                </div>
                              </div>
                              <h1 className="text-base font-bold text-color-dark-primary opacity-50">
                                {Expert.expert_branch[0].branch_title}
                              </h1>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="flex h-[55px] items-center justify-center p-1">
              <button
                type="submit"
                className="flex h-full items-center justify-center gap-4 rounded-[15px] bg-color-main py-2 px-4 opacity-80 transition-all duration-500 hover:opacity-100"
              >
                {/* <h1 className="text-sm font-bold text-color-white lg:text-sm">
                    ara
                  </h1> */}
                <FiSearch className="text-xl font-bold text-color-white" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

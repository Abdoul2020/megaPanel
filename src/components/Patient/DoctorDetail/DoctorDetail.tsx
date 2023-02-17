import Dialog from "@mui/material/Dialog";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle, AiFillHome } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { BsCameraVideoFill, BsCaretDownFill, BsCheckLg } from "react-icons/bs";
import { FaClinicMedical } from "react-icons/fa";
import { FiSearch, FiSmartphone } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { IoMdInformationCircle, IoMdSchool } from "react-icons/io";
import {
  IoClose,
  IoCopy,
  IoShareSocialSharp,
  IoTimeSharp,
} from "react-icons/io5";
import { MdLocationPin, MdWork } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { useAppSelector } from "../../../app/hooks";
import { Branch } from "../../../common/types/Branch.entity";
import { Doctor } from "../../../common/types/Doctor.entity";
import { State } from "../../../common/types/State.entity";
import { fetchBranches } from "../../../features/branches/branchesAPI";
import {
  fetchExpert,
  fetchExpertProfilePicture,
  fetchExperts,
} from "../../../features/doctorSlice/doctorAPI";
import CalendarLocation from "../DoctorCard/CalendarLocation/CalendarLocation";
import CalendarOnline from "../DoctorCard/CalendarOnline/CalendarOnline";

type Props = {};

export default function DoctorDetail({}: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [elementsLoading, setElementsLoading] = useState(false);
  const [inputSelectLoading, setInputSelectLoading] = useState(false);
  const [inputSelectOpen, setInputSelectOpen] = useState(false);

  const [inputSelectBranches, setInputSelectBranches] = useState<Branch[]>();
  const [inputSelectExperts, setInputSelectExperts] = useState<Doctor[]>();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [informationFeature, setInformationFeature] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Turkey");
  const [queryText, setQueryText] = useState("");

  const cities = useAppSelector((state) => state.cities.citiesList);
  const [expert, setExpert] = useState<Doctor | null>(null);
  const { id } = useParams();
  const [sort, setSort] = useState("ASC");

  const profileRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);
  const addressesRef = useRef<HTMLInputElement>(null);

  const [referenceIdCopied, setReferenceIdCopied] = useState(false);

  const [online, setOnline] = useState(true);
  const [onlineSearch, setOnlineSearch] = useState(online);
  const [calendarLoading, setCalendarLoading] = useState(false);

  const [appointmentBoxOpen, setAppointmentBoxOpen] = useState(false);

  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const [filteredStates, setFilteredStates] = useState<State[]>();

  const handleCalendarChange = () => {
    if (
      expert?.expert_operating_type !== 1 &&
      expert?.expert_operating_type !== 2
    ) {
      setCalendarLoading(true);
      setOnline((value) => !value);
      setTimeout(() => {
        setCalendarLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const fetchExpertResponse = await fetchExpert(id);
      const fetchExpertSuccess = fetchExpertResponse.success;
      if (fetchExpertSuccess) {
        const data = fetchExpertResponse.data.data;
        setExpert(data);
      } else {
        navigate("/notfound");
      }
    }
    fetchData();
    const value = countries.find((Country) => Country.name === country);
    setFilteredStates(
      states.filter((state) => state.country_id == String(value?.id))
    );
  }, []);
  useEffect(() => {
    async function fetchData() {
      setProfileImageLoader(true);
      const authExpertDownloadProfilePictureResponse =
        await fetchExpertProfilePicture(expert?._id);
      setProfileImageLoader(true);
      const authExpertDownloadProfilePictureSuccess =
        authExpertDownloadProfilePictureResponse.success;

      if (authExpertDownloadProfilePictureSuccess) {
        const base64 = authExpertDownloadProfilePictureResponse.data.data;
        setProfileImageBase64(base64);
      } else {
        // console.log({ authExpertDownloadProfilePictureResponse });
      }
    }
    if (expert && expert.expert_avatar_path !== "") {
      fetchData();
    }
    setOnline(
      expert?.expert_operating_type === 2 || expert?.expert_operating_type === 0
    );
  }, [expert]);

  useEffect(() => {
    if (location.hash === "#profile") {
      if (profileRef.current) {
        profileRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    } else if (location.hash === "#resume") {
      if (resumeRef.current) {
        resumeRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    } else if (location.hash === "#addresses") {
      if (addressesRef.current) {
        addressesRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [location]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate(
      `/search?online=${onlineSearch}&city=${city}&query_text=${queryText}`,
      {
        state: { online: onlineSearch },
      }
    );
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
  const handleToggleButton = () => {
    setOnlineSearch((value) => !value);
  };
  const handleAppointmentBoxOpen = () => {
    setAppointmentBoxOpen(true);
  };
  const handleAppointmentBoxClose = () => {
    setAppointmentBoxOpen(false);
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
  const handleSearchValueChange = (e: any) => {
    const value = e.target.value;
    console.log("aga");
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
  const onCountryChange = (obj: any) => {
    const value = JSON.parse(obj);
    setCountry(value.name);
    setFilteredStates(states.filter((state) => state.country_id == value.id));
    setCountrySelectOpen(false);
  };

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

  const handleInputSelectSubmit = (q: string) => {
    console.log("maga");
    setQueryText(q);
    setInputSelectOpen(false);
    setCitySelectOpen(false);
    setInputSelectOpen(false);
    setCountrySelectOpen(false);
  };

  const handleCleanInput = () => {
    setQueryText("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const states = useAppSelector((state) => state.states.statesList);
  const countries = useAppSelector((state) => state.countries.countriesList);
  return (
    <div className="relative flex w-full snap-y snap-center flex-col items-center justify-center bg-color-white-secondary px-10 pt-[90px] xl:px-0">
      <div className="flex w-full items-end justify-center bg-color-white-secondary">
        <div className="mt-[90px] flex w-full snap-y snap-center flex-col items-start justify-start xl:w-3/4">
          <div className="flex w-full items-start justify-start bg-color-white-secondary">
            <div className="flex w-full flex-col items-start justify-start gap-4 p-4 lg:w-2/3">
              <div className="flex w-full items-center justify-center">
                <form
                  className="flex w-full items-center justify-between gap-2 rounded-[20px] bg-color-white"
                  onSubmit={handleSubmit}
                >
                  {!onlineSearch ? (
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
                              {city !== "" && city !== undefined
                                ? city
                                : "Şehir Seç"}
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
                                    onClick={() =>
                                      onCityChange(JSON.stringify(City))
                                    }
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
                      <div
                        onClick={() => handleCleanInput()}
                        className="cursor-pointer"
                      >
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
                        className="absolute top-[150%] left-0 z-50 w-full rounded-[15px] bg-color-white p-4 shadow-sm"
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
                                      handleInputSelectSubmit(
                                        Branch.branch_title
                                      )
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
                                      handleInputSelectSubmit(
                                        Expert.expert_name
                                      )
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
              <div className="flex w-full items-start justify-start pl-4 lg:w-2/3">
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-color-dark-primary opacity-80">
                    Online Görüşme
                  </h1>
                  <div
                    className={`relative h-6 w-12 rounded-full ${
                      onlineSearch
                        ? "bg-color-secondary"
                        : "bg-color-gray-primary"
                    } cursor-pointer p-1 transition-all duration-300`}
                    onClick={() => handleToggleButton()}
                  >
                    <div
                      className={`h-full w-4 rounded-full bg-color-white ${
                        onlineSearch ? "translate-x-[150%]" : "translate-x-0"
                      } transition-all duration-300`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 content-start gap-10 lg:grid-cols-2">
            <div className="relative flex w-full flex-col items-start justify-center place-self-start justify-self-start">
              <section
                id="profile"
                ref={profileRef}
                className="flex w-full flex-col items-start justify-start gap-6"
              >
                <div className="flex w-full items-start justify-start gap-4">
                  <div className="h-[150px] w-[150px] overflow-hidden rounded-[15px]">
                    {profileImageBase64 ? (
                      <img
                        src={`data:image/jpeg;base64,${profileImageBase64}`}
                        alt=""
                        className="h-full w-full rounded-[20px] transition-all duration-300 hover:scale-110"
                      />
                    ) : (
                      <img
                        src={require("../../../assets/images/doc_pp.jpg")}
                        alt=""
                        className="h-full w-full rounded-[20px]"
                      />
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:gap-4">
                        <div className="flex items-center justify-center gap-2">
                          <h1 className="text-lg font-bold uppercase text-color-dark-primary text-opacity-50 group-hover:text-opacity-80">
                            {`${
                              expert?.expert_title
                                ? expert?.expert_title.title_title
                                : ""
                            }`}
                          </h1>
                          <h1 className="text-base uppercase text-color-dark-primary group-hover:text-opacity-80">
                            {`${expert?.expert_name} ${expert?.expert_surname}`}
                          </h1>
                        </div>
                        <div
                          className={`flex cursor-pointer items-center justify-center gap-1 ${
                            referenceIdCopied ? "opacity-100" : "opacity-30"
                          } transition-all duration-100 ease-in-out hover:opacity-80`}
                          onClick={() =>
                            copyToClipboard(expert?.expert_reference_id)
                          }
                        >
                          <h1
                            className={`text-base font-bold uppercase ${
                              referenceIdCopied
                                ? "text-color-main"
                                : "text-color-dark-primary"
                            }`}
                          >
                            {expert?.expert_reference_id}
                          </h1>
                          {referenceIdCopied ? (
                            <BsCheckLg className="text-color-main" />
                          ) : (
                            <IoCopy className="text-color-dark-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                    <ul className="flex max-w-[400px] flex-wrap items-start justify-start gap-4 gap-y-0">
                      {expert?.expert_branch.map((branch) => {
                        return (
                          <h1
                            className="cursor-pointer font-bold text-color-dark-primary opacity-50"
                            onClick={() => {
                              navigate(
                                `/search?online=${onlineSearch}&query_text=${branch.branch_title}`,
                                {
                                  state: { online: onlineSearch },
                                }
                              );
                            }}
                          >
                            {branch.branch_title}
                          </h1>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-4">
                  <div className="flex items-start justify-start gap-1">
                    <MdLocationPin
                      className={`${
                        expert?.expert_operating_type !== 2
                          ? "text-color-main"
                          : "text-color-dark-primary"
                      } text-[24px] opacity-80`}
                    />
                    <h1 className="text-color-dark-primary opacity-80">
                      {expert?.expert_city ? expert?.expert_city : ""}
                    </h1>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <BsCameraVideoFill
                      className={`${
                        expert?.expert_operating_type === 2 ||
                        expert?.expert_operating_type === 0
                          ? "text-color-main"
                          : "text-color-dark-primary"
                      } text-[24px] opacity-80`}
                    />
                    <h1 className="text-color-dark-primary opacity-80">
                      {expert?.expert_operating_type === 2 ||
                      expert?.expert_operating_type === 0
                        ? "Online Görüşmeye Uygun"
                        : "Online Görüşmeye Uygun Değil"}
                    </h1>
                  </div>
                  <div className="flex items-start justify-start gap-2">
                    <IoTimeSharp className="text-[24px] text-color-main opacity-80" />
                    <h1 className="text-lg text-color-dark-primary opacity-80">
                      30 Dakika
                    </h1>
                  </div>
                </div>
                <div className="block w-full lg:hidden">
                  <button
                    className="w-full rounded-[15px] bg-color-main py-4"
                    onClick={handleAppointmentBoxOpen}
                  >
                    <h1 className="text-base font-bold text-color-white">
                      Randevu al
                    </h1>
                  </button>
                </div>
                <div
                  className="sticky top-0 w-full border-t-[1px] border-solid border-color-dark-primary
             border-opacity-10 pt-4"
                >
                  <ul className="grid w-full grid-cols-3">
                    <Link to="#profile">
                      <li
                        className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-4 hover:cursor-pointer"
                        onClick={() => setInformationFeature(0)}
                      >
                        <div
                          className={`flex items-center justify-center gap-2 transition-all duration-300 ${
                            informationFeature === 0
                              ? "opacity-80"
                              : "opacity-50"
                          }`}
                        >
                          <GoPerson className="text-[24px] font-bold text-color-dark-primary" />
                        </div>
                        {informationFeature === 0 ? (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            transition={{
                              ease: "backInOut",
                              duration: 0.3,
                              reapat: 1,
                            }}
                            className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
                          ></motion.div>
                        ) : (
                          <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
                        )}
                      </li>
                    </Link>
                    <Link to="#addresses">
                      <li
                        className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-4 hover:cursor-pointer"
                        onClick={() => setInformationFeature(1)}
                      >
                        <h1
                          className={`text-[16px] font-bold text-color-dark-primary transition-all duration-300 ${
                            informationFeature === 1
                              ? "opacity-80"
                              : "opacity-50"
                          }`}
                        >
                          Adresler
                        </h1>
                        {informationFeature === 1 ? (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            transition={{
                              ease: "backInOut",
                              duration: 0.3,
                              reapat: 1,
                            }}
                            className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
                          ></motion.div>
                        ) : (
                          <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
                        )}
                      </li>
                    </Link>
                    <Link to="#resume">
                      <li
                        className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-4 hover:cursor-pointer"
                        onClick={() => setInformationFeature(2)}
                      >
                        <h1
                          className={`text-[16px] font-bold text-color-dark-primary transition-all duration-300 ${
                            informationFeature === 2
                              ? "opacity-80"
                              : "opacity-50"
                          }`}
                        >
                          Özgeçmiş
                        </h1>
                        {informationFeature === 2 ? (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            transition={{
                              ease: "backInOut",
                              duration: 0.3,
                              reapat: 1,
                            }}
                            className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
                          ></motion.div>
                        ) : (
                          <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
                        )}
                      </li>
                    </Link>
                    {/* <li
                  className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-4 hover:cursor-pointer"
                  onClick={() => setInformationFeature(3)}
                >
                  <h1
                    className={`text-[16px] font-bold text-color-dark-primary transition-all duration-300 ${
                      informationFeature === 3 ? "opacity-80" : "opacity-50"
                    }`}
                  >
                    Görüşler
                  </h1>
                  {informationFeature === 3 ? (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "100%" }}
                      transition={{
                        ease: "backInOut",
                        duration: 0.3,
                        reapat: 1,
                      }}
                      className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
                    ></motion.div>
                  ) : (
                    <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
                  )}
                </li> */}
                  </ul>
                </div>
              </section>

              <div className="flex w-full items-start justify-start bg-color-white-secondary py-10">
                <div className="flex w-full flex-col items-start justify-start gap-10">
                  <div className="flex w-full snap-y snap-center flex-col items-center justify-start gap-8">
                    <section
                      className="flex w-full snap-center flex-col items-start justify-center gap-4"
                      id="addresses"
                      ref={addressesRef}
                    >
                      <h1 className="text-xl font-bold text-color-main">
                        Adresler
                      </h1>
                      <div className="flex w-full flex-col items-start justify-center gap-6 rounded-[25px] bg-color-white p-6 shadow-sm">
                        <div className="flex items-start justify-center gap-4">
                          <div className="rounded-xl border-4 border-solid border-color-main p-2">
                            <FaClinicMedical className="text-[24px] text-color-main" />
                          </div>
                          <div className="flex flex-col items-start justify-start">
                            <h1 className="text-sm text-color-dark-primary opacity-50">
                              Klinik Bilgisi
                            </h1>
                            <h1 className="text-base font-bold text-color-dark-primary opacity-80">
                              {expert?.expert_city}
                            </h1>
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-start justify-center">
                          <div className="flex w-full flex-col items-start justify-center gap-4 py-10">
                            <div className="flex items-center justify-center gap-2">
                              <AiFillHome className="text-lg text-color-main" />
                              <h1 className="text-sm font-bold text-color-dark-primary opacity-80">
                                Açık Adres
                              </h1>
                            </div>
                            <p className="text-base text-color-dark-primary opacity-50">
                              Mimar Sinan, Paşa Limanı Cd. No:4, 34664 Üsküdar
                            </p>
                          </div>
                          {/* <div
                    className="flex w-full flex-col items-start justify-center gap-4 border-t-[1px] border-solid border-color-dark-primary
                   border-opacity-10 py-10"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <GiRotaryPhone className="text-lg text-color-main" />
                      <h1 className="text-sm font-bold text-color-dark-primary opacity-80">
                        İletişim Numarası
                      </h1>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-color-dark-primary opacity-50">
                      <BsFillTelephoneFill />
                      <h1 className="text-sm text-color-dark-primary opacity-80">
                        {expert?.expert_tel}
                      </h1>
                    </div>
                  </div> */}
                        </div>
                      </div>
                    </section>
                    <section
                      className="flex w-full snap-center flex-col items-start justify-center gap-4"
                      id="resume"
                      ref={resumeRef}
                    >
                      <h1 className="text-xl font-bold text-color-main">
                        Özgeçmiş
                      </h1>
                      <div className="flex w-full flex-col items-start justify-center gap-6 rounded-[25px] bg-color-white p-6 shadow-sm">
                        <div className="flex items-start justify-center gap-4">
                          <div className="rounded-xl border-4 border-solid border-color-main p-2">
                            <img
                              src={require("../../../assets/images/doktorbul.png")}
                              alt=""
                              className="w-[35px]"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start">
                            <h1 className="text-sm text-color-dark-primary opacity-50">
                              Uzman Bilgisi
                            </h1>
                            <div className="flex items-center justify-center gap-2">
                              <h1 className="text-lg font-bold uppercase text-color-dark-primary text-opacity-50 group-hover:text-opacity-80">
                                {`${
                                  expert?.expert_title
                                    ? expert?.expert_title.title_title
                                    : ""
                                }`}
                              </h1>
                              <h1 className="text-base uppercase text-color-dark-primary group-hover:text-opacity-80">
                                {`${expert?.expert_name} ${expert?.expert_surname}`}
                              </h1>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-start justify-center">
                          <div className="flex w-full flex-col items-start justify-center gap-4 py-5">
                            <div className="flex items-center justify-center gap-2">
                              <GoPerson className="text-lg text-color-main" />
                              <h1 className="text-sm font-bold text-color-dark-primary opacity-80">
                                Hakkımda
                              </h1>
                            </div>
                            <p className="text-base text-color-dark-primary opacity-50">
                              {expert?.expert_about_me}
                            </p>
                          </div>
                          <div className="flex w-full flex-col items-start justify-center gap-4 py-5">
                            <div className="flex items-center justify-center gap-2">
                              <IoMdSchool className="text-lg text-color-main" />
                              <h1 className="text-sm font-bold text-color-dark-primary opacity-80">
                                Eğitim Geçmişim
                              </h1>
                            </div>
                            <p className="text-base text-color-dark-primary opacity-50">
                              {expert?.expert_training}
                            </p>
                          </div>
                          <div className="flex w-full flex-col items-start justify-center gap-4 py-5">
                            <div className="flex items-center justify-center gap-2">
                              <MdWork className="text-lg text-color-main" />
                              <h1 className="text-sm font-bold text-color-dark-primary opacity-80">
                                Tecrübelerim
                              </h1>
                            </div>
                            <p className="text-base text-color-dark-primary opacity-50">
                              {expert?.expert_experience}
                            </p>
                          </div>
                          <div className="flex w-full flex-col items-start justify-center gap-4 py-5">
                            <div className="flex items-center justify-center gap-2">
                              <IoMdInformationCircle className="text-lg text-color-main" />
                              <h1 className="text-sm font-bold text-color-dark-primary opacity-80">
                                Ekstra Bilgi
                              </h1>
                            </div>
                            <p className="text-base text-color-dark-primary opacity-50">
                              {expert?.expert_additional_information}
                            </p>
                          </div>
                          <div className="flex w-full flex-col items-start justify-center gap-4 py-5">
                            <div className="flex items-center justify-center gap-2">
                              <IoShareSocialSharp className="text-lg text-color-main" />
                              <h1 className="text-sm font-bold text-color-dark-primary opacity-80">
                                Sosyal Medyalar
                              </h1>
                            </div>
                            <ul className="flex items-start justify-start gap-2">
                              {expert?.expert_socials.map((social) => {
                                return (
                                  <li className="flex items-center justify-center gap-2">
                                    <SocialIcon
                                      url={`${social}`}
                                      style={{ height: "30px", width: "30px" }}
                                    />
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          {/* <div
                    className="flex w-full flex-col items-start justify-center gap-4 border-t-[1px] border-solid
                   border-color-dark-primary border-opacity-10 py-10"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <MdLanguage className="text-lg text-color-main" />
                      <h1 className="text-sm font-bold text-color-dark-primary opacity-80">
                        Bilinen Diller
                      </h1>
                    </div>
                    <p className="text-base text-color-dark-primary opacity-50">
                      Türkçe, İngilizce
                    </p>
                  </div> */}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div className="left-0 hidden h-full w-full flex-col items-start justify-start gap-4 place-self-start justify-self-start lg:flex">
              <div
                className="grid w-full grid-rows-3 rounded-[25px] bg-color-white 
            p-6 shadow-sm transition-all duration-300"
              >
                <div
                  className="row-span-1 flex flex-col items-center justify-center border-b-[1px] border-solid
             border-color-dark-primary border-opacity-10"
                >
                  <div className="h-[75px] w-full rounded-[30px] bg-color-third p-2">
                    <div className="relative grid h-full grid-cols-2 p-2">
                      <div
                        className="flex h-full cursor-pointer items-center justify-center p-3"
                        onClick={handleCalendarChange}
                      >
                        <h1 className="z-50 h-full text-sm font-bold text-color-white">
                          Online Görüşme
                        </h1>
                      </div>
                      <div
                        className="flex h-full cursor-pointer items-center justify-center py-3"
                        onClick={handleCalendarChange}
                      >
                        <h1 className="z-50 h-full text-sm font-bold text-color-white">
                          Yüz Yüze Randevu
                        </h1>
                      </div>
                      <div
                        className={`transition-all duration-500 ${
                          online ? "translate-x-0" : "translate-x-full"
                        } pointer-events-none absolute h-full w-1/2 rounded-[25px] bg-color-secondary`}
                      ></div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center py-6">
                    {online ? (
                      <div className="flex w-full items-center justify-between gap-4 px-2">
                        <div className="flex items-start justify-center gap-4">
                          <div className="rounded-xl border-4 border-solid border-color-main p-2">
                            <FiSmartphone className="text-[24px] text-color-main" />
                          </div>
                          <div className="flex flex-col items-start justify-start">
                            <h1 className="text-base font-bold text-color-dark-primary opacity-80">
                              Online Konsültasyon.
                            </h1>
                            <h1 className="text-sm text-color-dark-primary opacity-50">
                              Evinden ayrılmadan uzmanına ulaş, görüntülü
                              görüşerek muayene ol.
                            </h1>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full flex-col items-start justify-between gap-4 px-2">
                        <div className="flex items-start justify-center gap-4">
                          <div className="rounded-xl border-4 border-solid border-color-main p-2">
                            <FaClinicMedical className="text-[24px] text-color-main" />
                          </div>
                          <div className="flex flex-col items-start justify-start">
                            <h1 className="text-base font-bold text-color-dark-primary opacity-80">
                              Yüz Yüze Konsültasyon.
                            </h1>
                            <h1 className="text-sm text-color-dark-primary opacity-50">
                              Yüz Yüze görüşerek muayene ol.
                            </h1>
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <MdLocationPin className="text-[16px] text-color-main" />
                          <h1>{expert?.expert_physical_location}</h1>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="row-span-2 w-full">
                  <div className="relative flex h-full w-full items-start justify-center py-10">
                    {online ? (
                      <CalendarOnline expert={expert} />
                    ) : (
                      <CalendarLocation expert={expert} />
                    )}
                    <div
                      className={`${
                        calendarLoading ? "flex" : "hidden"
                      } absolute top-0 left-0 z-10 h-full w-full bg-color-white`}
                    >
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="animate-spin">
                          <BiLoaderAlt className="text-[48px] text-color-main text-opacity-80" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog onClose={handleAppointmentBoxClose} open={appointmentBoxOpen}>
        <div className="left-0 flex h-full w-full flex-col items-start justify-start gap-4 place-self-start justify-self-start">
          <div
            className="grid w-full grid-rows-3 rounded-[25px] bg-color-white 
            p-6 shadow-sm transition-all duration-300"
          >
            <div
              className="row-span-1 flex flex-col items-center justify-center border-b-[1px] border-solid
             border-color-dark-primary border-opacity-10"
            >
              <div className="h-[75px] w-full rounded-[30px] bg-color-third p-2">
                <div className="relative grid h-full grid-cols-2 p-2">
                  <div
                    className="flex h-full cursor-pointer items-center justify-center p-3"
                    onClick={handleCalendarChange}
                  >
                    <h1 className="z-50 h-full text-sm font-bold text-color-white">
                      Online Görüşme
                    </h1>
                  </div>
                  <div
                    className="flex h-full cursor-pointer items-center justify-center py-3"
                    onClick={handleCalendarChange}
                  >
                    <h1 className="z-50 h-full text-sm font-bold text-color-white">
                      Yüz Yüze Randevu
                    </h1>
                  </div>
                  <div
                    className={`transition-all duration-500 ${
                      online ? "translate-x-0" : "translate-x-full"
                    } pointer-events-none absolute h-full w-1/2 rounded-[25px] bg-color-secondary`}
                  ></div>
                </div>
              </div>
              <div className="flex w-full items-center justify-center py-6">
                {online ? (
                  <div className="flex w-full items-center justify-between gap-4 px-2">
                    <div className="flex items-start justify-center gap-4">
                      <div className="rounded-xl border-4 border-solid border-color-main p-2">
                        <FiSmartphone className="text-[24px] text-color-main" />
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <h1 className="text-base font-bold text-color-dark-primary opacity-80">
                          Online Konsültasyon.
                        </h1>
                        <h1 className="text-sm text-color-dark-primary opacity-50">
                          Evinden ayrılmadan uzmanına ulaş, görüntülü görüşerek
                          muayene ol.
                        </h1>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full flex-col items-start justify-between gap-4 px-2">
                    <div className="flex items-start justify-center gap-4">
                      <div className="rounded-xl border-4 border-solid border-color-main p-2">
                        <FaClinicMedical className="text-[24px] text-color-main" />
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <h1 className="text-base font-bold text-color-dark-primary opacity-80">
                          Yüz Yüze Konsültasyon.
                        </h1>
                        <h1 className="text-sm text-color-dark-primary opacity-50">
                          Yüz Yüze görüşerek muayene ol.
                        </h1>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MdLocationPin className="text-[16px] text-color-main" />
                      <h1>{expert?.expert_physical_location}</h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="row-span-2 w-full">
              <div className="relative flex h-full w-full items-start justify-center py-10">
                {online ? (
                  <CalendarOnline expert={expert} />
                ) : (
                  <CalendarLocation expert={expert} />
                )}
                <div
                  className={`${
                    calendarLoading ? "flex" : "hidden"
                  } absolute top-0 left-0 z-10 h-full w-full bg-color-white`}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="animate-spin">
                      <BiLoaderAlt className="text-[48px] text-color-main text-opacity-80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

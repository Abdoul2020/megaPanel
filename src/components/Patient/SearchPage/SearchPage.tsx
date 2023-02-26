import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  AiFillCloseCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { BsCaretDownFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Branch } from "../../../common/types/Branch.entity";
import { Doctor } from "../../../common/types/Doctor.entity";
import { State } from "../../../common/types/State.entity";
import { fetchBranches } from "../../../features/branches/branchesAPI";
import {
  fetchExperts,
  fetchExpertsCount,
} from "../../../features/doctorSlice/doctorAPI";
import { addExperts } from "../../../features/doctorSlice/doctorSlice";
import { updateScrollToTop } from "../../../features/options/optionsSlice";
import DoctorList from "../../Patient/DoctorList/DoctorList";

type Props = {
  experts: Doctor[];
};

export default function SearchPage(props: Props) {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const [inputSelectOpen, setInputSelectOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [pageCount, setPageCount] = useState(1);
  const [elementsLoading, setElementsLoading] = useState(false);
  const [inputSelectLoading, setInputSelectLoading] = useState(false);

  const [inputSelectBranches, setInputSelectBranches] = useState<Branch[]>();
  const [inputSelectExperts, setInputSelectExperts] = useState<Doctor[]>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [online, setOnline] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Turkey");
  const [queryText, setQueryText] = useState("");
  const [branch, setBranch] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState("ASC");
  const [sortBy, setSortBy] = useState("expert_name");
  const [filteredStates, setFilteredStates] = useState<State[]>();

  const [count, setCount] = useState(0);

  const paramOnline = searchParams.get("online");
  const paramCity = searchParams.get("city");
  const paramQueryText = searchParams.get("query_text");
  const paramPage = searchParams.get("page");
  const paramSize = searchParams.get("size");
  const paramSort = searchParams.get("sort");
  const paramSortBy = searchParams.get("sortBy");
  const paramBranch = searchParams.get("branch");

  const query = {
    page: paramPage !== null ? parseInt(paramPage) : 1,
    size: paramSize !== null ? parseInt(paramSize) : 5,
    sort: paramSort !== null ? paramSort : "ASC",
    sort_by: paramSortBy !== null ? paramSortBy : "expert_name",
    query_text: paramQueryText !== null ? paramQueryText : "",
    count: false,
    city: paramCity !== null ? paramCity : "",
    operating_type: paramOnline === "true" ? 2 : 1,
    location: paramCity !== null && !paramOnline ? paramCity : "",
    branch: paramBranch !== null ? paramBranch : "",
  };

  useEffect(() => {
    setOnline(paramOnline === "true" ? true : false);
    setCity(paramCity !== null ? paramCity : "");
    setPage(paramPage !== null ? parseInt(paramPage) : 1);
    setSize(paramSize !== null ? parseInt(paramSize) : 5);
    setSort(paramSort !== null ? paramSort : "ASC");
    setSortBy(paramSortBy !== null ? paramSortBy : "expert_name");
    setQueryText(paramQueryText !== null ? paramQueryText : "");
    setBranch(paramBranch !== null ? paramBranch : "");
    const value = countries.find((Country) => Country.name === country);
    setFilteredStates(
      states.filter((state) => state.country_id == String(value?.id))
    );
    async function fetchData() {
      setElementsLoading(true);
      const fetchExpertsResponse = await fetchExperts({
        ...query,
        branch: branch,
        city: online ? "" : city,
      });
      const fetchExpertsCountResponse = await fetchExpertsCount({
        ...query,
        branch: branch,
        city: online ? "" : city,
      });
      setElementsLoading(false);

      const successTotals = fetchExpertsCountResponse.success;
      const sucessExperts = fetchExpertsResponse.success;

      if (successTotals) {
        const statusCodeTotals = fetchExpertsCountResponse.data.status;
        const data = fetchExpertsCountResponse.data.data;
        setCount(data);
        setPageCount(Math.ceil(data / size) === 0 ? 1 : Math.ceil(data / size));
      } else {
        // console.log(fetchExpertsCountResponse);
      }
      if (sucessExperts) {
        const statusCodeExperts = fetchExpertsResponse.data.status;
        const data = fetchExpertsResponse.data.data;
        // console.log({ data });
        dispatch(addExperts(data));
      } else {
        // console.log(fetchExpertsResponse);
      }
    }
    fetchData();
  }, []);

  const handleToggleButton = () => {
    async function fetchData() {
      const paramOnline = searchParams.get("online") || "false";
      const paramCity = searchParams.get("city") || "";
      const paramQueryText = searchParams.get("query_text") || "";
      const paramPage = searchParams.get("page") || 1;
      const paramSize = searchParams.get("size") || 5;
      const paramSort = searchParams.get("sort") || "ASC";
      const paramSortBy = searchParams.get("sortBy") || "expert_name";
      setSearchParams({
        online: `${!online}`,
        city: `${paramCity}`,
        query_text: `${paramQueryText}`,
        branch: `${paramBranch}`,
        page: `${paramPage}`,
        size: `${paramSize}`,
        sort: `${paramSort}`,
        sort_by: `${paramSortBy}`,
      });
      setPage(1);
      setElementsLoading(true);
      const fetchExpertsResponse = await fetchExperts({
        ...query,
        operating_type: !online ? 2 : 1,
        city: !online ? "" : city,
      });
      const fetchExpertsCountResponse = await fetchExpertsCount({
        ...query,
        operating_type: !online ? 2 : 1,
        city: !online ? "" : city,
      });
      setElementsLoading(false);

      const successTotals = fetchExpertsCountResponse.success;
      const sucessExperts = fetchExpertsResponse.success;

      if (successTotals) {
        const statusCodeTotals = fetchExpertsCountResponse.data.status;
        const data = fetchExpertsCountResponse.data.data;
        setCount(data);
        setPageCount(Math.ceil(data / size) === 0 ? 1 : Math.ceil(data / size));
      } else {
        // console.log(fetchExpertsCountResponse);
      }

      if (sucessExperts) {
        const statusCodeExperts = fetchExpertsResponse.data.status;
        const data = fetchExpertsResponse.data.data;
        dispatch(addExperts(data));
      } else {
        // console.log(fetchExpertsResponse);
      }
      setOnline((value) => !value);
    }
    fetchData();
  };

  const onCityChange = (obj: any) => {
    const value = JSON.parse(obj).name;
    setCity(value);
    setCitySelectOpen(false);

    const paramOnline = searchParams.get("online") || "false";
    const paramCity = searchParams.get("city") || "";
    const paramQueryText = searchParams.get("query_text") || "";
    const paramBranch = searchParams.get("branch") || "";
    const paramPage = searchParams.get("page") || 1;
    const paramSize = searchParams.get("size") || 5;
    const paramSort = searchParams.get("sort") || "ASC";
    const paramSortBy = searchParams.get("sortBy") || "expert_name";

    setSearchParams({
      online: `${!paramOnline}`,
      city: `${value}`,
      query_text: `${paramQueryText}`,
      branch: `${paramBranch}`,
      page: `${paramPage}`,
      size: `${paramSize}`,
      sort: `${paramSort}`,
      sort_by: `${paramSortBy}`,
    });
  };

  const handleCityRemove = () => {
    setCity("");

    const paramOnline = searchParams.get("online") || "false";
    const paramCity = searchParams.get("city") || "";
    const paramQueryText = searchParams.get("query_text") || "";
    const paramBranch = searchParams.get("branch") || "";
    const paramPage = searchParams.get("page") || 1;
    const paramSize = searchParams.get("size") || 5;
    const paramSort = searchParams.get("sort") || "ASC";
    const paramSortBy = searchParams.get("sortBy") || "expert_name";

    setSearchParams({
      online: `${!paramOnline}`,
      city: "",
      query_text: `${paramQueryText}`,
      branch: `${paramBranch}`,
      page: `${paramPage}`,
      size: `${paramSize}`,
      sort: `${paramSort}`,
      sort_by: `${paramSortBy}`,
    });
  };

  const handleSubmit = (e: any) => {
    async function fetchData() {
      e.preventDefault();
      setCitySelectOpen(false);
      setInputSelectOpen(false);
      setCountrySelectOpen(false);
      const paramOnline = searchParams.get("online") || "false";
      const paramCity = searchParams.get("city") || "";
      const paramBranch = searchParams.get("branch") || "";
      const paramQueryText = searchParams.get("query_text") || "";
      const paramPage = searchParams.get("page") || 1;
      const paramSize = searchParams.get("size") || 5;
      const paramSort = searchParams.get("sort") || "ASC";
      const paramSortBy = searchParams.get("sortBy") || "expert_name";

      setSearchParams({
        online: `${paramOnline}`,
        city: `${paramCity}`,
        query_text: `${queryText}`,
        branch: `${paramBranch}`,
        page: `${paramPage}`,
        size: `${paramSize}`,
        sort: `${paramSort}`,
        sort_by: `${paramSortBy}`,
      });

      setElementsLoading(true);
      const fetchExpertsResponse = await fetchExperts({
        ...query,
        query_text: queryText,
        city: online ? "" : city,
      });
      const fetchExpertsCountResponse = await fetchExpertsCount({
        ...query,
        query_text: queryText,
        city: online ? "" : city,
      });
      setElementsLoading(false);

      const successTotals = fetchExpertsCountResponse.success;
      const sucessExperts = fetchExpertsResponse.success;

      if (successTotals) {
        const statusCodeTotals = fetchExpertsCountResponse.data.status;
        const data = fetchExpertsCountResponse.data.data;
        setCount(data);
        setPageCount(Math.ceil(data / size) === 0 ? 1 : Math.ceil(data / size));
      } else {
        // console.log(fetchExpertsCountResponse);
      }

      if (sucessExperts) {
        const statusCodeExperts = fetchExpertsResponse.data.status;
        const data = fetchExpertsResponse.data.data;
        dispatch(addExperts(data));
      } else {
        // console.log({ fetchExpertsResponse });
      }
    }
    fetchData();
  };
  const scrollToTop = () => {
    dispatch(updateScrollToTop(true));
  };
  useEffect(() => {
    async function fetchData() {
      setElementsLoading(true);
      const fetchExpertsResponse = await fetchExperts({ ...query, page });
      setElementsLoading(false);
      const sucessExperts = fetchExpertsResponse.success;
      if (sucessExperts) {
        const statusCodeExperts = fetchExpertsResponse.data.status;
        const data = fetchExpertsResponse.data.data;
        dispatch(addExperts(data));
      } else {
        // console.log(fetchExpertsResponse);
      }
    }
    fetchData();
    const paramOnline = searchParams.get("online") || "false";
    const paramCity = searchParams.get("city") || "";
    const paramQueryText = searchParams.get("query_text") || "";
    const paramBranch = searchParams.get("branch") || "";
    const paramPage = searchParams.get("page") || 1;
    const paramSize = searchParams.get("size") || 5;
    const paramSort = searchParams.get("sort") || "ASC";
    const paramSortBy = searchParams.get("sortBy") || "expert_name";
    setSearchParams({
      online: `${paramOnline}`,
      city: `${paramCity}`,
      query_text: `${paramQueryText}`,
      branch: `${paramBranch}`,
      page: `${page}`,
      size: `${paramSize}`,
      sort: `${paramSort}`,
      sort_by: `${paramSortBy}`,
    });
    scrollToTop();
  }, [page]);

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
        branch: branch,
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
    async function fetchData() {
      setQueryText(q);
      setInputSelectOpen(false);
      setCitySelectOpen(false);
      setInputSelectOpen(false);
      setCountrySelectOpen(false);
      const paramOnline = searchParams.get("online") || "false";
      const paramCity = searchParams.get("city") || "";
      const paramBranch = searchParams.get("branch") || "";
      const paramQueryText = searchParams.get("query_text") || "";
      const paramPage = searchParams.get("page") || 1;
      const paramSize = searchParams.get("size") || 5;
      const paramSort = searchParams.get("sort") || "ASC";
      const paramSortBy = searchParams.get("sortBy") || "expert_name";
      setSearchParams({
        online: `${paramOnline}`,
        city: `${paramCity}`,
        query_text: `${q}`,
        branch: `${paramBranch}`,
        page: `${paramPage}`,
        size: `${paramSize}`,
        sort: `${paramSort}`,
        sort_by: `${paramSortBy}`,
      });

      setElementsLoading(true);
      const fetchExpertsResponse = await fetchExperts({
        ...query,
        query_text: q,
        city: online ? "" : city,
      });
      const fetchExpertsCountResponse = await fetchExpertsCount({
        ...query,
        query_text: q,
        city: online ? "" : city,
      });
      setElementsLoading(false);

      const successTotals = fetchExpertsCountResponse.success;
      const sucessExperts = fetchExpertsResponse.success;

      if (successTotals) {
        const statusCodeTotals = fetchExpertsCountResponse.data.status;
        const data = fetchExpertsCountResponse.data.data;
        setCount(data);
        setPageCount(Math.ceil(data / size) === 0 ? 1 : Math.ceil(data / size));
      } else {
        // console.log(fetchExpertsCountResponse);
      }

      if (sucessExperts) {
        const statusCodeExperts = fetchExpertsResponse.data.status;
        const data = fetchExpertsResponse.data.data;
        dispatch(addExperts(data));
      } else {
        // console.log({ fetchExpertsResponse });
      }
    }
    fetchData();
  };

  const handleCleanInput = () => {
    setQueryText("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };


  const states = useAppSelector((state) => state.states.statesList);
  const countries = useAppSelector((state) => state.countries.countriesList);
  const experts = useAppSelector((state) => state.doctors.expertList);
  const totals = useAppSelector((state) => state.totals.totalsList);

  return (
    <div
      ref={searchRef}
      className="flex w-full flex-col items-center justify-center bg-color-white-secondary py-20 pt-[170px]"
    >
      <div className="flex w-full items-end justify-center bg-color-white-secondary">
        <div className="flex w-full flex-col items-center justify-start gap-4 p-4 lg:w-2/3">
          <div className="flex w-full items-center justify-center lg:w-2/3">
            <form
              className="flex w-full items-center justify-between gap-2 rounded-[20px] bg-color-white"
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
          <div className="flex w-full items-start justify-start pl-4 lg:w-2/3">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-color-dark-primary opacity-80">
                Online Görüşme
              </h1>
              <div
                className={`relative h-6 w-12 rounded-full ${
                  online ? "bg-color-secondary" : "bg-color-gray-primary"
                } cursor-pointer p-1 transition-all duration-300`}
                onClick={() => handleToggleButton()}
              >
                <div
                  className={`h-full w-4 rounded-full bg-color-white ${
                    online ? "translate-x-[150%]" : "translate-x-0"
                  } transition-all duration-300`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="items-between flex w-full justify-center bg-color-white-secondary py-20">
        {experts.length > 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-20 px-10 lg:w-2/3 lg:px-0">
            {elementsLoading ? (
              <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin">
                  <BiLoaderAlt className="text-[24px] text-color-white text-opacity-80" />
                </div>
              </div>
            ) : (
              <DoctorList experts={experts} count={count} />
            )}
            {experts.length > 0 ? (
              <div className="flex items-center justify-center gap-4">
                {page > 1 ? (
                  <div
                    onClick={() => setPage((value) => value - 1)}
                    className="group cursor-pointer rounded-[10px] bg-color-white px-3 py-3 
        transition-all duration-300 hover:bg-color-main"
                  >
                    <AiOutlineArrowLeft
                      className="font-bold text-color-dark-primary 
          opacity-80 transition-all duration-300 group-hover:text-color-white"
                    />
                  </div>
                ) : (
                  <div></div>
                )}
                <ul className="flex items-center justify-center gap-2">
                  {Array.from(Array(pageCount), (e, i) => {
                    return (
                      <li
                        onClick={() => setPage(i + 1)}
                        key={i + 1}
                        className={`${
                          page === i + 1
                            ? "pointer-events-none bg-color-main"
                            : "pointer-events-auto bg-color-white"
                        } group cursor-pointer rounded-[15px] px-6
                    py-2 transition-all duration-300 hover:bg-color-main`}
                      >
                        <h1
                          className={`group-hover:opacity-80 ${
                            page === i + 1
                              ? "text-color-white opacity-100"
                              : "text-color-dark-primary opacity-50"
                          }
                      font-bold
                      transition-all duration-300 
                      group-hover:text-color-white`}
                        >
                          {i + 1}
                        </h1>
                      </li>
                    );
                  })}
                </ul>
                {pageCount !== page ? (
                  <div
                    onClick={() => setPage((value) => value + 1)}
                    className="group cursor-pointer rounded-[10px] bg-color-white px-3 py-3 
        transition-all duration-300 hover:bg-color-main"
                  >
                    <AiOutlineArrowRight
                      className="font-bold text-color-dark-primary 
          opacity-80 transition-all duration-300 group-hover:text-color-white"
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div className="flex w-full items-start justify-center">
            <h1 className="text-lg text-color-dark-primary opacity-80">
              Hiçbir sonuç bulunamadı.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

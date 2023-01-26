import { useEffect, useRef, useState } from "react";
import {
  AiFillCloseCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight
} from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Doctor } from "../../../common/types/Doctor.entity";
import {
  fetchExperts,
  fetchExpertsCount
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

  const [searchParams, setSearchParams] = useSearchParams();

  const [pageCount, setPageCount] = useState(1);
  const [elementsLoading, setElementsLoading] = useState(false);

  const [online, setOnline] = useState(false);
  const [city, setCity] = useState("");
  const [queryText, setQueryText] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("ASC");
  const [sortBy, setSortBy] = useState("expert_name");

  const paramOnline = searchParams.get("online");
  const paramCity = searchParams.get("city");
  const paramQueryText = searchParams.get("query_text");
  const paramPage = searchParams.get("page");
  const paramSize = searchParams.get("size");
  const paramSort = searchParams.get("sort");
  const paramSortBy = searchParams.get("sortBy");

  const query = {
    page: paramPage !== null ? parseInt(paramPage) : 1,
    size: paramSize !== null ? parseInt(paramSize) : 10,
    sort: paramSort !== null ? paramSort : "ASC",
    sort_by: paramSortBy !== null ? paramSortBy : "expert_name",
    query_text: paramQueryText !== null ? paramQueryText : "",
    count: false,
    city: paramCity !== null ? paramCity : "",
    operating_type: paramOnline === "true" ? 2 : 1,
    location: paramCity !== null && !paramOnline ? paramCity : "",
  };

  useEffect(() => {
    setOnline(paramOnline === "true" ? true : false);
    setCity(paramCity !== null ? paramCity : "");
    setPage(paramPage !== null ? parseInt(paramPage) : 1);
    setSize(paramSize !== null ? parseInt(paramSize) : 10);
    setSort(paramSort !== null ? paramSort : "ASC");
    setSortBy(paramSortBy !== null ? paramSortBy : "expert_name");
    setQueryText(paramQueryText !== null ? paramQueryText : "");

    async function fetchData() {
      setElementsLoading(true);
      const fetchExpertsResponse = await fetchExperts({
        ...query,
        city: online ? "" : city,
      });
      const fetchExpertsCountResponse = await fetchExpertsCount({
        ...query,
        city: online ? "" : city,
      });
      setElementsLoading(false);

      const successTotals = fetchExpertsCountResponse.success;
      const sucessExperts = fetchExpertsResponse.success;

      if (successTotals) {
        const statusCodeTotals = fetchExpertsCountResponse.data.status;
        const data = fetchExpertsCountResponse.data.data;
        setPageCount(Math.ceil(data / size));
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
      const paramSize = searchParams.get("size") || 10;
      const paramSort = searchParams.get("sort") || "ASC";
      const paramSortBy = searchParams.get("sortBy") || "expert_name";

      setSearchParams({
        online: `${!online}`,
        city: `${paramCity}`,
        query_text: `${paramQueryText}`,
        page: `${paramPage}`,
        size: `${paramSize}`,
        sort: `${paramSort}`,
        sort_by: `${paramSortBy}`,
      });

      setElementsLoading(true);
      const fetchExpertsResponse = await fetchExperts({
        ...query,
        operating_type: !online ? 2 : 1,
        city: !online ? "" : paramCity,
      });
      const fetchExpertsCountResponse = await fetchExpertsCount({
        ...query,
        operating_type: !online ? 2 : 1,
        city: !online ? "" : paramCity,
      });
      setElementsLoading(false);

      const successTotals = fetchExpertsCountResponse.success;
      const sucessExperts = fetchExpertsResponse.success;

      if (successTotals) {
        const statusCodeTotals = fetchExpertsCountResponse.data.status;
        const data = fetchExpertsCountResponse.data.data;
        setPageCount(Math.ceil(data / size));
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

  const onCityChange = (e: any) => {
    const value = e.target.value;
    setCity(value);

    const paramOnline = searchParams.get("online") || "false";
    const paramCity = searchParams.get("city") || "";
    const paramQueryText = searchParams.get("query_text") || "";
    const paramPage = searchParams.get("page") || 1;
    const paramSize = searchParams.get("size") || 10;
    const paramSort = searchParams.get("sort") || "ASC";
    const paramSortBy = searchParams.get("sortBy") || "expert_name";

    setSearchParams({
      online: `${!paramOnline}`,
      city: `${value}`,
      query_text: `${paramQueryText}`,
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
    const paramPage = searchParams.get("page") || 1;
    const paramSize = searchParams.get("size") || 10;
    const paramSort = searchParams.get("sort") || "ASC";
    const paramSortBy = searchParams.get("sortBy") || "expert_name";

    setSearchParams({
      online: `${!paramOnline}`,
      city: `${""}`,
      query_text: `${paramQueryText}`,
      page: `${paramPage}`,
      size: `${paramSize}`,
      sort: `${paramSort}`,
      sort_by: `${paramSortBy}`,
    });
  };

  const handleSubmit = (e: any) => {
    async function fetchData() {
      e.preventDefault();

      const paramOnline = searchParams.get("online") || "false";
      const paramCity = searchParams.get("city") || "";
      const paramQueryText = searchParams.get("query_text") || "";
      const paramPage = searchParams.get("page") || 1;
      const paramSize = searchParams.get("size") || 10;
      const paramSort = searchParams.get("sort") || "ASC";
      const paramSortBy = searchParams.get("sortBy") || "expert_name";

      setSearchParams({
        online: `${paramOnline}`,
        city: `${paramCity}`,
        query_text: `${queryText}`,
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
        setPageCount(Math.ceil(data / size));
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
    const paramPage = searchParams.get("page") || 1;
    const paramSize = searchParams.get("size") || 10;
    const paramSort = searchParams.get("sort") || "ASC";
    const paramSortBy = searchParams.get("sortBy") || "expert_name";

    setSearchParams({
      online: `${paramOnline}`,
      city: `${paramCity}`,
      query_text: `${paramQueryText}`,
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
  };

  const cities = useAppSelector((state) => state.cities.citiesList);
  const experts = useAppSelector((state) => state.doctors.expertList);
  const totals = useAppSelector((state) => state.totals.totalsList);

  return (
    <div
      ref={searchRef}
      className="flex w-full flex-col items-center justify-center bg-color-white-secondary py-20 pt-[170px]"
    >
      <div className="flex w-full items-end justify-center bg-color-white-secondary">
        <div className="flex w-full flex-col items-center justify-center lg:w-2/3">
          <div className="w-full flex-col items-center justify-between gap-10 p-4">
            <div className="flex w-full items-center justify-center">
              <form
                className="flex w-full items-center justify-between gap-2 overflow-hidden rounded-[20px] bg-color-white py-1 pr-1 lg:w-2/3"
                onSubmit={handleSubmit}
              >
                {city !== "" ? (
                  <div
                    className={`${
                      online
                        ? "ml-0 hidden -translate-x-full"
                        : "block translate-x-0"
                    } ml-2 h-full rounded-[20px] bg-color-main 
                    p-4 px-2
                    opacity-80 
                  transition-all duration-500 hover:opacity-100`}
                    onClick={handleCityRemove}
                  >
                    <h1 className="text-lg text-color-white">{city}</h1>
                    <AiFillCloseCircle className="text-[24px] text-color-white" />
                  </div>
                ) : (
                  <div
                    className={`${
                      online
                        ? "ml-0 hidden -translate-x-full"
                        : "block translate-x-0"
                    } ml-2 h-full w-[150px] rounded-[20px] bg-color-main 
              p-4 
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
                          <option
                            key={index}
                            value={City}
                            selected={city === City}
                          >
                            {City}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
                <input
                  onChange={handleSearchValueChange}
                  value={queryText}
                  type="text"
                  name="search"
                  id="search"
                  className="w-full bg-color-white py-2 pl-4 text-sm tracking-wide opacity-80 outline-none lg:text-base"
                  placeholder="Uzman veya branş arayın..."
                />
                <button
                  type="submit"
                  className="flex h-[64px] items-center justify-center gap-4 rounded-[20px] bg-color-main py-4 px-6 opacity-80 transition-all duration-500 hover:opacity-100"
                >
                  <h1 className="text-sm font-bold text-color-white lg:text-sm">ara</h1>
                  <FiSearch className="text-xl font-bold text-color-white" />
                </button>
              </form>
            </div>
            <div className="mt-10 flex w-full items-center justify-center">
              <div
                className={`flex h-[56px] w-[300px] cursor-pointer items-center justify-center
              gap-2 rounded-[15px] border-[1px] border-solid p-4 
              ${
                online
                  ? "border-color-main border-opacity-80"
                  : "border-color-dark-primary border-opacity-10"
              } transition-all duration-300`}
                onClick={handleToggleButton}
              >
                <h1 className="text-color-dark-primary opacity-80">
                  Online Görüşme
                </h1>
                <div
                  className={`relative h-6 w-12 rounded-full ${
                    online ? "bg-color-secondary" : "bg-color-gray-primary"
                  } p-1 transition-all duration-300`}
                >
                  <div
                    className={`h-full w-4 rounded-full bg-color-white ${
                      online ? "translate-x-[150%]" : "translate-x-0"
                    } transition-all duration-300`}
                  ></div>
                </div>
              </div>
            </div>
            {/* <div className="flex justify-center items-center gap-4">
              <div className="relative h-[56px] w-[150px] flex justify-center items-center gap-2 bg-color-main p-4 rounded-[15px]">
                <div className="w-full h-full flex justify-end items-center">
                  <TbArrowsSort className="text-[24px] text-color-white z-20" />
                </div>
                <select
                  className="cursor-pointer flex justify-center items-center absolute w-full h-full bg-none border-none 
                outline-none appearance-none bg-color-main p-4 rounded-[15px] text-color-white"
                >
                  <option value="1" className="p-4 rounded-[15px]" disabled>
                    <h1 className="text-color-dark-primary font-bold">
                      Sıralama
                    </h1>
                  </option>
                  <option value="2" className="p-4 rounded-[15px]">
                    <h1 className="text-color-dark-primary font-bold">
                      Tarihe Göre
                    </h1>
                  </option>
                  <option value="3" className="p-4 rounded-[15px]">
                    <h1 className="text-color-dark-primary font-bold">
                      Puana Göre
                    </h1>
                  </option>
                </select>
              </div>
              <div
                className="bg-color-main p-4 rounded-[15px] hover:opacity-80 hover:cursor-pointer
              transition-all duration-300"
              >
                <FaSlidersH className="text-[24px] text-color-white" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center bg-color-white-secondary py-20">
        <div className="flex h-full w-full flex-col items-center justify-center gap-20 px-10 lg:w-2/3 lg:px-0">
          {elementsLoading ? (
            <div className="animate-spin">
              <BiLoaderAlt className="text-[24px] text-color-white text-opacity-80" />
            </div>
          ) : (
            <DoctorList experts={experts} />
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
      </div>
    </div>
  );
}

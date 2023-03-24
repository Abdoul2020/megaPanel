import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { BsCameraVideoFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { Doctor } from "../../../common/types/Doctor.entity";
import { fetchExpertProfilePicture } from "../../../features/doctorSlice/doctorAPI";
import CalendarLocation from "./CalendarLocation/CalendarLocation";
import CalendarOnline from "./CalendarOnline/CalendarOnline";

type Props = {
  key: string;
  expert: Doctor;
};

export default function DoctorCard(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [online, setOnline] = useState(
    props.expert.expert_operating_type === 2 ||
      props.expert.expert_operating_type === 0
  );
  const [calendarLoading, setCalendarLoading] = useState(false);

  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const handleCalendarChange = () => {
    if (
      props.expert.expert_operating_type !== 1 &&
      props.expert.expert_operating_type !== 2
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
      setProfileImageLoader(true);
      const authExpertDownloadProfilePictureResponse =
        await fetchExpertProfilePicture(props.expert._id);
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
    if (
      props.expert &&
      props.expert.expert_avatar_path !== "" &&
      props.expert.expert_avatar_path !== undefined
    ) {
      fetchData();
    }
  }, []);
  return (
    <div className="grid w-full grid-cols-1 rounded-[15px] bg-color-white lg:grid-cols-2">
      <div
        className="relative flex w-full flex-col items-start justify-start gap-4 border-r-[1px]
      border-solid border-color-dark-primary border-opacity-10 p-6"
      >
        <div className="flex w-full items-start justify-start gap-4">
          <div className="h-[100px] w-[100px] overflow-hidden rounded-[20px]">
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
            <Link to={`/doctors/${props.expert._id}`}>
              <div className="flex flex-wrap items-start justify-start gap-1 gap-y-0">
                <h1 className="text-center text-base font-bold text-color-dark-primary transition-all duration-300 hover:cursor-pointer hover:text-color-main sm:text-lg">
                  {props.expert.expert_title !== undefined
                    ? props.expert.expert_title.title_title
                    : ""}
                </h1>
                <h1 className="text-center text-base font-bold text-color-dark-primary transition-all duration-300 hover:cursor-pointer hover:text-color-main sm:text-lg">
                  {props.expert.expert_name}
                </h1>
                <h1 className="text-center text-base font-bold text-color-dark-primary transition-all duration-300 hover:cursor-pointer hover:text-color-main sm:text-lg">
                  {props.expert.expert_surname}
                </h1>
              </div>
            </Link>

            <ul className="flex max-w-full flex-wrap items-start justify-start gap-2 gap-y-0">
              {props.expert.expert_branch.map((branch) => {
                return (
                  <h1
                    className="cursor-pointer font-bold text-color-dark-primary opacity-50 hover:opacity-40"
                    key={branch._id}
                    onClick={() => {
                      setSearchParams({
                        online: `${false}`,
                        city: "",
                        query_text: "",
                        branch: branch.branch_title,
                        page: "1",
                        size: "5",
                        sort: "ASC",
                        sort_by: "expert_title",
                      });
                    }}
                  >
                    {branch.branch_title}
                  </h1>
                );
              })}
            </ul>
          </div>
        </div>
        <div
          className="flex w-full flex-col
            items-start justify-start gap-4 border-t-[1px] border-solid border-color-dark-primary border-opacity-10 py-4"
        >
          <div className="flex items-center justify-center gap-1">
            <MdLocationPin
              className={`${
                props.expert.expert_operating_type !== 2
                  ? "text-color-main"
                  : "text-color-dark-primary"
              } opacity-80`}
            />
            <h1 className="text-color-dark-primary opacity-80">
              {props.expert.expert_city ? props.expert.expert_city : ""}
            </h1>
          </div>
          <div className="flex items-center justify-center gap-1">
            <BsCameraVideoFill
              className={`${
                props.expert.expert_operating_type === 2 ||
                props.expert.expert_operating_type === 0
                  ? "text-color-main"
                  : "text-color-dark-primary"
              } opacity-80`}
            />
            <h1 className="text-color-dark-primary opacity-80">
              {props.expert.expert_operating_type === 2 ||
              props.expert.expert_operating_type === 0
                ? "Online"
                : "Yüz Yüze"}
            </h1>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-start">
          <p className="w-full text-color-dark-primary opacity-50 line-clamp-3">
            {props.expert.expert_about_me ? props.expert.expert_about_me : ""}
          </p>
          <Link to={`/doctors/${props.expert._id}`}>
            <h1 className="cursor-pointer text-color-main">Daha Fazla Gör</h1>
          </Link>
        </div>
        <div className="absolute top-0 left-full z-20 flex h-full flex-col items-center justify-center gap-4">
          <div
            className={`rounded-r-lg border-[1px] border-l-[0px] border-solid border-color-dark-primary
            border-opacity-10 bg-opacity-10 px-2 py-4
            transition-all duration-300
            ${
              props.expert.expert_operating_type === 1
                ? "cursor-auto opacity-50"
                : "cursor-pointer opacity-100"
            }
             ${
               props.expert.expert_operating_type !== 1
                 ? "hover:bg-color-main hover:bg-opacity-10"
                 : ""
             } ${online ? "bg-color-main" : "bg-color-white"}`}
            onClick={handleCalendarChange}
          >
            <BsCameraVideoFill className="text-color-main" />
          </div>
          <div
            className={`rounded-r-lg border-[1px] border-l-[0px] border-solid border-color-dark-primary
            border-opacity-10 bg-opacity-10 px-2 py-4
            transition-all duration-300
            ${
              props.expert.expert_operating_type === 2
                ? "cursor-auto opacity-50"
                : "cursor-pointer opacity-100"
            }
             ${
               props.expert.expert_operating_type !== 2
                 ? "hover:bg-color-main hover:bg-opacity-10"
                 : ""
             } ${online ? "bg-color-white" : "bg-color-main"}`}
            onClick={handleCalendarChange}
          >
            <MdLocationPin className="text-color-main" />
          </div>
        </div>
      </div>
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className="h-full max-h-[420px] w-full overflow-y-scroll px-6 py-6 
        scrollbar-thin scrollbar-track-color-white scrollbar-thumb-color-main"
        >
          {online ? (
            <CalendarOnline expert={props.expert} />
          ) : (
            <CalendarLocation expert={props.expert} />
          )}
        </div>
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
  );
}

import React, { useState, useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { BsCameraVideoFill } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";
import CalendarLocation from "./CalendarLocation/CalendarLocation";
import { Link } from "react-router-dom";
import { Doctor } from "../../../common/types/Doctor.entity";
import CalendarOnline from "./CalendarOnline/CalendarOnline";
import { fetchExpertProfilePicture } from "../../../features/doctorSlice/doctorAPI";

type Props = {
  key: string;
  expert: Doctor;
};

export default function DoctorCard(props: Props) {
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
        console.log({ authExpertDownloadProfilePictureResponse });
      }
    }
    if (props.expert && props.expert.expert_avatar_path !== "") {
      fetchData();
    }
  }, []);
  return (
    <div className="w-full bg-color-white rounded-[15px] grid grid-cols-2">
      <div
        className="relative w-full flex flex-col justify-start items-start gap-4 p-6
      border-r-[1px] border-solid border-color-dark-primary border-opacity-10"
      >
        <div className="w-full flex justify-start items-start gap-4">
          <div className="w-[100px] h-[100px] rounded-[20px] overflow-hidden">
            {profileImageBase64 ? (
              <img
                src={`data:image/jpeg;base64,${profileImageBase64}`}
                alt=""
                className="h-full w-full rounded-[20px] hover:scale-110 transition-all duration-300"
              />
            ) : (
              <img
                src={require("../../../assets/images/doc_pp.jpg")}
                alt=""
                className="h-full w-full rounded-[20px]"
              />
            )}
          </div>
          <div className="flex flex-col justify-start items-start">
            <div className="flex justify-center items-center gap-2">
              <Link to={`/doctors/${props.expert._id}`}>
                <h1 className="hover:text-color-main transition-all duration-300 hover:cursor-pointer text-lg font-bold text-color-dark-primary text-center">
                  {`${JSON.stringify(props.expert.expert_title)
                    .split(",")[1]
                    .replace('"title_title"', "")
                    .replace(":", "")
                    .replaceAll('"', "")} ${props.expert.expert_name}`}
                </h1>
              </Link>
              <AiFillCheckCircle className="text-[24px] text-color-success-primary" />
            </div>

            <ul className="flex gap-y-0 justify-start items-start gap-4 flex-wrap max-w-[400px]">
              {props.expert.expert_branch.map((branch) => {
                return (
                  <h1 className="font-bold text-color-dark-primary opacity-50">
                    {branch.branch_title}
                  </h1>
                );
              })}
            </ul>
          </div>
        </div>
        <div
          className="border-t-[1px] py-4 w-full
            border-solid border-color-dark-primary border-opacity-10 flex flex-col justify-start items-start gap-4"
        >
          <div className="flex justify-center items-center gap-1">
            <MdLocationPin
              className={`${
                props.expert.expert_operating_type !== 2
                  ? "text-color-main"
                  : "text-color-dark-primary"
              } opacity-80`}
            />
            <h1 className="text-color-dark-primary opacity-80">
              {props.expert.expert_city_location
                ? props.expert.expert_city_location
                : ""}
            </h1>
          </div>
          <div className="flex justify-center items-center gap-1">
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
                ? "Online Görüşmeye Uygun"
                : "Online Görüşmeye Uygun Değil"}
            </h1>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start">
          <p className="w-full text-color-dark-primary opacity-50">
            {props.expert.expert_about_me ? props.expert.expert_about_me : ""}
          </p>
          <h1 className="text-color-main cursor-pointer">Daha Fazla Gör</h1>
        </div>
        <div className="absolute top-0 left-full h-full flex flex-col justify-center items-center gap-4 z-20">
          <div
            className={`px-2 py-4 rounded-r-lg border-[1px] border-l-[0px]
            border-solid border-color-dark-primary border-opacity-10 bg-opacity-10
            transition-all duration-300
            ${
              props.expert.expert_operating_type === 1
                ? "opacity-50 cursor-auto"
                : "opacity-100 cursor-pointer"
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
            className={`px-2 py-4 rounded-r-lg border-[1px] border-l-[0px]
            border-solid border-color-dark-primary border-opacity-10 bg-opacity-10
            transition-all duration-300
            ${
              props.expert.expert_operating_type === 2
                ? "opacity-50 cursor-auto"
                : "opacity-100 cursor-pointer"
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
      <div className="relative flex justify-center items-center w-full h-full">
        <div
          className="h-full w-full px-12 py-6 max-h-[420px] overflow-y-scroll 
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
          } absolute top-0 left-0 h-full w-full bg-color-white z-10`}
        >
          <div className="h-full w-full flex justify-center items-center">
            <div className="animate-spin">
              <BiLoaderAlt className="text-color-main text-[48px] text-opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

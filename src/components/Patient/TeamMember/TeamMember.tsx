import { useEffect, useState } from "react";
// import { AiOutlineHeart } from "react-icons/ai";
// import { AiOutlineCheckCircle } from "react-icons/ai";
// import { BsShieldCheck } from "react-icons/bs";
// import { AiFillStar } from "react-icons/ai";
import { BsCameraVideoFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import { Doctor } from "../../../common/types/Doctor.entity";
import { fetchExpertProfilePicture } from "../../../features/doctorSlice/doctorAPI";

type Props = {
  key: string;
  expert: Doctor;
};

export default function TeamMember(props: Props) {
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);
  const [title, setTitle] = useState("");
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
    setTitle(props.expert.expert_title.title_title);
  }, []);
  return (
    <div className="flex max-w-[300px] snap-center flex-col items-start justify-start gap-4 rounded-[25px] bg-color-white shadow-xl ">
      <div className="relative flex w-full items-center justify-center p-12">
        <div className="z-20 h-[75px] w-[75px] overflow-hidden rounded-[20px]">
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
        <div className="absolute bottom-0 flex w-full flex-col items-center justify-center px-4">
          <Link to={`/doctors/${props.expert?._id}`}>
            <div className="flex items-center justify-center gap-2 
            font-bold text-color-dark-primary transition-all 
            duration-300 hover:cursor-pointer hover:text-color-main">
              <h1 className="text-sm font-bold uppercase text-color-dark-primary text-opacity-50 group-hover:text-opacity-80">
                {`${
                  props.expert !== undefined &&
                  props.expert.expert_title !== undefined &&
                  props.expert.expert_title.title_title !== undefined
                    ? props.expert.expert_title.title_title
                    : ""
                }`}
              </h1>
              <h1 className="text-sm uppercase text-color-dark-primary group-hover:text-opacity-80">
                {`${props.expert?.expert_name} ${props.expert?.expert_surname}`}
              </h1>
            </div>
          </Link>
        </div>
        <div className="absolute top-0 h-1/2 w-full rounded-t-[25px] bg-doctor-color-main"></div>
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-8 px-4">
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
              {props.expert.expert_city_location
                ? props.expert.expert_city_location
                : ""}
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
                ? "Online Görüşmeye Uygun"
                : "Online Görüşmeye Uygun Değil"}
            </h1>
          </div>
        </div>
        <div className="w-full p-2">
          <Link to={`/doctors/${props.expert._id}`}>
            <button className="group relative w-full rounded-[30px] bg-color-secondary bg-opacity-20 py-3 transition-all duration-300 hover:bg-color-main hover:bg-opacity-100">
              <h1 className="font-bold tracking-wide text-color-main transition-all duration-300 group-hover:text-color-white-secondary">
                Randevu al
              </h1>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

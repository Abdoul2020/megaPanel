import React from "react";
// import { AiOutlineHeart } from "react-icons/ai";
// import { AiOutlineCheckCircle } from "react-icons/ai";
// import { BsShieldCheck } from "react-icons/bs";
// import { AiFillStar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { Branch } from "../../../common/types/Branch.entity";
import { Title } from "../../../common/types/Title.entity";
import { Expertise } from "../../../common/types/Expertise.entity";

interface Doctor {
  _id: string;
  expert_name: string;
  expert_surname: string;
  expert_email: string;
  expert_expertise: Expertise;
  expert_title: Title;
  expert_role: string;
  expert_branch: Branch[];
  expert_reset_password_token: string;
  expert_reset_password_expire: Date;
  expert_status: number;
  expert_creation_date: string;
  expert_image_src: string;
}

type Props = {
  key: string;
  expert: Doctor;
};

export default function TeamMember(props: Props) {
  return (
    <div className="snap-center min-w-[300px] flex flex-col justify-start items-start gap-4 rounded-[25px] shadow-xl bg-color-white ">
      <div className="relative flex justify-center items-center p-16 w-full">
        <img
          src={require(`../../../assets/images/team/${props.expert.expert_image_src}`)}
          alt=""
          className="rounded-full h-[100px] w-[100px] z-10 shadow-2xl pointer-events-none"
        />
        <div className="absolute bottom-0 w-full flex flex-col justify-center items-center px-4">
          <div className="flex justify-center items-center gap-2">
            <h1 className="hover:text-color-main transition-all duration-300 hover:cursor-pointer text-lg font-bold text-color-dark-primary text-center">
              {props.expert.expert_name}
            </h1>
            <AiFillCheckCircle className="text-[24px] text-color-success-primary" />
          </div>
          <h1 className="text-color-dark-primary opacity-80 text-center">
            {props.expert.expert_expertise
              ? props.expert.expert_expertise.expertise_title
              : ""}
          </h1>
        </div>
        <div className="absolute top-0 w-full h-1/2 bg-doctor-color-main rounded-t-[25px]"></div>
      </div>
      <div className="flex flex-col justify-center items-start gap-8 w-full">
        <div className="flex flex-col justify-center items-start gap-2 w-full px-4">
          {/* <div className="flex justify-center items-center gap-2">
            <div className="flex justify-center items-center gap-1">
              <AiFillStar className="text-color-warning-primary" />
              <AiFillStar className="text-color-warning-primary" />
              <AiFillStar className="text-color-warning-primary" />
              <AiFillStar className="text-color-warning-primary" />
              <AiFillStar className="text-color-warning-primary" />
            </div>
            <h1 className="text-base text-color-dark-primary opacity-90">
              ({props.specialist.rate})
            </h1>
          </div> */}
          <div className="flex justify-center items-center gap-1">
            <MdLocationPin className="text-color-dark-primary opacity-80" />
            <h1 className="text-color-dark-primary opacity-80">
              {/* {props.specialist.location} */}
            </h1>
          </div>
        </div>
        <div className="w-full p-2">
          <button className="relative hover:bg-color-main hover:bg-opacity-100 bg-color-secondary bg-opacity-20 w-full rounded-[30px] py-3 group transition-all duration-300">
            <h1 className="group-hover:text-color-white-secondary transition-all duration-300 text-color-main font-bold tracking-wide">
              Randevu al
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
}

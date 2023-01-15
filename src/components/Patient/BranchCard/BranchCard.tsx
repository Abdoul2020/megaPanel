import React from "react";
import { MdBusinessCenter, MdOutlinePsychology } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbMoodKid } from "react-icons/tb";
import { RiMentalHealthLine } from "react-icons/ri";
import { BiBrain } from "react-icons/bi";
import { GiBarefoot } from "react-icons/gi";
import { AiOutlineEye } from "react-icons/ai";
import { FcBusiness } from "react-icons/fc";
import { Branch } from "../../../common/types/Branch.entity";

type Props = {
  key: string;
  branch: Branch;
};

export default function BranchCardb(props: Props) {
  return (
    <div className="snap-center bg-color-white rounded-[30px] h-[250px] min-w-[225px] py-4 px-4">
      <div className="h-full flex flex-col justify-between items-center">
        <MdBusinessCenter className="text-color-main text-[64px] opacity-80 mt-6" />
        <h1 className="text-center text-color-dark-primary uppercase text-sm font-semibold opacity-80 tracking-wide">
          {props.branch.branch_title}
        </h1>
        <button className="relative overflow-hidden hover:bg-color-main hover:bg-opacity-100 bg-color-secondary bg-opacity-20 w-full rounded-[30px] py-3 group transition-all duration-300">
          <h1 className="group-hover:text-color-white-secondary transition-all duration-300 text-color-main font-bold tracking-wide">
            {/* {props.branch.specialist_count} Uzman */} 39 Uzman
          </h1>
        </button>
      </div>
    </div>
  );
}

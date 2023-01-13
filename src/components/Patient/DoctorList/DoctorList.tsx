import React, { useEffect } from "react";
import DoctorCard from "../DoctorCard/DoctorCard";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Doctor } from "../../../common/types/Doctor.entity";

type Props = {
  experts: Doctor[];
};

export default function DoctorList(props: Props) {
  useEffect(() => {}, []);
  return (
    <div className="w-full flex flex-col justify-center items-center gap-20">
      <div className="w-full flex flex-col justify-center items-center gap-6">
        {props.experts.map((expert) => {
          return <DoctorCard key={expert._id} expert={expert} />;
        })}
      </div>
    </div>
  );
}

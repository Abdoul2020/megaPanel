import { useEffect } from "react";
import { Doctor } from "../../../common/types/Doctor.entity";
import DoctorCard from "../DoctorCard/DoctorCard";

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

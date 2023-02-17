import { useEffect } from "react";
import { Doctor } from "../../../common/types/Doctor.entity";
import DoctorCard from "../DoctorCard/DoctorCard";
import { motion } from "framer-motion";
import CountUp from "react-countup";

type Props = {
  experts: Doctor[];
  count: number;
};

export default function DoctorList(props: Props) {
  useEffect(() => {}, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
        reapat: 1,
      }}
      className="flex w-full flex-col items-center justify-center gap-20"
    >
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="flex w-full items-start justify-start gap-1">
          <h1 className="font-bold text-color-main opacity-50">
            <CountUp end={props.count} duration={1} />
          </h1>
          <h1 className="font-bold text-color-dark-primary opacity-50">
            sonuç bulundu
          </h1>
        </div>
        {props.experts.map((expert) => {
          return <DoctorCard key={expert._id} expert={expert} />;
        })}
      </div>
    </motion.div>
  );
}

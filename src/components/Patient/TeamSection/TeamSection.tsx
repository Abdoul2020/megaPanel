import React, { useRef, useEffect, useState } from "react";
import TeamMember from "../TeamMember/TeamMember";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { motion } from "framer-motion";
import { Doctor } from "../../../common/types/Doctor.entity";

type Props = {
  doctors: Doctor[];
};

export default function TeamSection(props: Props) {
  const [width, setWidth] = useState(0);

  const carousel = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const total =
      (carousel.current?.scrollWidth || 1) -
      (carousel.current?.offsetWidth || 1);
    setWidth(total);
  }, []);

  return (
    <div className="flex w-full items-center justify-center bg-color-white-secondary px-10 lg:px-0">
      <div className="flex w-full lg:w-2/3 flex-col items-start justify-center gap-10 py-20">
        <div className="gap-21 flex flex-col items-start justify-center">
          <h1 className="text-2xl font-bold text-color-dark-primary">
            Uzmanlarımızla Tanış
          </h1>
          <p className="text-color-dark-primary opacity-70">
            Binlerce hekimin arasından tercihini yap, hemen online olarak görüş
            veya soru sor.
          </p>
        </div>
        <div className="relative w-full">
          {/* <div className="z-20 mr-4 absolute right-full h-full flex flex-col justify-center items-center">
            <div
              className="p-4 bg-color-main-extra bg-opacity-50 rounded-full group hover:bg-opacity-100 transition-all
             duration-300 hover:cursor-pointer"
            >
              <BsArrowLeft className="text-[24px] text-color-white" />
            </div>
          </div>
          <div className="z-20 ml-4 absolute left-full h-full flex flex-col justify-center items-center">
            <div
              className="p-4 bg-color-main-extra bg-opacity-50 rounded-full group hover:bg-opacity-100 transition-all
             duration-300 hover:cursor-pointer"
            >
              <BsArrowRight className="text-[24px] text-color-white" />
            </div>
          </div> */}
          {/* <div className="scroll-smooth py-2 snap-x snap-mandatory w-full flex justify-start items-center gap-8 overflow-x-scroll scrollbar-none">
            {specialists.map((specialist) => {
              return (
                <TeamMember
                  key={specialist.id}
                  specialist={{
                    ...specialist,
                    image_src: `team-${specialist.id}.jpg`,
                  }}
                />
              );
            })}
          </div> */}
          <motion.div ref={carousel} className="cursor-grab overflow-x-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="flex gap-4 py-4"
            >
              {props.doctors.map((expert) => {
                return <TeamMember key={expert._id} expert={expert} />;
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

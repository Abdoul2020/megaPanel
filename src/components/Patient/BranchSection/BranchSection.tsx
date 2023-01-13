import React, { useEffect, useRef, useState } from "react";
import BranchCard from "../BranchCard/BranchCard";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { motion } from "framer-motion";
import { Branch } from "../../../common/types/Branch.entity";

type Props = {
  branches: Branch[];
};

export default function BranchSection(props: Props) {
  const [width, setWidth] = useState(0);

  const carousel = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const total =
      (carousel.current?.scrollWidth || 1) -
      (carousel.current?.offsetWidth || 1);
    setWidth(total);
  }, []);

  const handleScrollLeft = () => {};

  return (
    <div className="w-full bg-color-white-secondary flex justify-center items-center">
      <div className="w-2/3 flex flex-col justify-center items-start py-20 gap-10">
        <div className="flex flex-col justify-center items-start gap-21">
          <h1 className="text-2xl text-color-dark-primary font-bold">
            Popüler Branşlar
          </h1>
          <p className="text-color-dark-primary opacity-70">
            Binlerce hekimin arasından tercihini yap, hemen online olarak görüş
            veya soru sor.
          </p>
        </div>
        <div className="relative w-full">
          <div
            className="mr-4 absolute right-full h-full flex flex-col justify-center items-center"
            onClick={handleScrollLeft}
          >
            <div
              className="p-4 bg-color-main-extra bg-opacity-50 rounded-full group hover:bg-opacity-100 transition-all
             duration-300 hover:cursor-pointer"
            >
              <BsArrowLeft className="text-[24px] text-color-white" />
            </div>
          </div>
          <div className="ml-4 absolute left-full h-full flex flex-col justify-center items-center">
            <div
              className="p-4 bg-color-main-extra bg-opacity-50 rounded-full group hover:bg-opacity-100 transition-all
             duration-300 hover:cursor-pointer"
            >
              <BsArrowRight className="text-[24px] text-color-white" />
            </div>
          </div>
          {/* <div className="scroll-smooth snap-x snap-mandatory w-full flex justify-start items-center gap-8 overflow-x-scroll scrollbar-none">
            {branches.map((branch) => {
              return <BranchCard key={branch.id} branch={branch} />;
            })}
          </div> */}
          <motion.div ref={carousel} className="cursor-grab overflow-x-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="flex gap-4 py-2"
            >
              {props.branches.map((branch) => {
                return <BranchCard key={branch._id} branch={branch} />;
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

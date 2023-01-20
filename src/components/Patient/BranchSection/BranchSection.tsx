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
  const scrolledRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const total =
      (carousel.current?.scrollWidth || 1) -
      (carousel.current?.offsetWidth || 1);
    setWidth(total);
  }, []);

  return (
    <div className="flex w-full items-center justify-center bg-color-white-secondary px-10 lg:px-10">
      <div className="flex w-full lg:w-2/3 flex-col items-start justify-center gap-10 py-20">
        <div className="gap-21 flex flex-col items-start justify-center">
          <h1 className="text-2xl font-bold text-color-dark-primary">
            Popüler Branşlar
          </h1>
          <p className="text-color-dark-primary opacity-70">
            Megaverse'ü kimler kullanabilir?
          </p>
        </div>
        <div className="relative w-full">
          {/* <div
            className="absolute right-full mr-4 flex h-full flex-col items-center justify-center"
            onClick={handleScrollLeft}
          >
            <div
              className="group rounded-full bg-color-main-extra bg-opacity-50 p-4 transition-all duration-300
             hover:cursor-pointer hover:bg-opacity-100"
            >
              <BsArrowLeft className="text-[24px] text-color-white" />
            </div>
          </div>
          <div className="absolute left-full ml-4 flex h-full flex-col items-center justify-center">
            <div
              className="group rounded-full bg-color-main-extra bg-opacity-50 p-4 transition-all duration-300
             hover:cursor-pointer hover:bg-opacity-100"
            >
              <BsArrowRight className="text-[24px] text-color-white" />
            </div>
          </div> */}
          {/* <div className="scroll-smooth snap-x snap-mandatory w-full flex justify-start items-center gap-8 overflow-x-scroll scrollbar-none">
            {branches.map((branch) => {
              return <BranchCard key={branch.id} branch={branch} />;
            })}
          </div> */}
          <ul className="py-10 grid w-full grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-20">
            <li className="flex flex-col items-center justify-center gap-6">
              <img
                src={require("../../../assets/images/kocluk.png")}
                alt=""
                className="h-28 w-28"
              />
              <h1 className="flex text-center font-bold text-color-dark-primary">
                Yaşam Koçluğu
              </h1>
            </li>
            <li className="flex flex-col items-center justify-center gap-6">
              <img
                src={require("../../../assets/images/psikolog.png")}
                alt=""
                className="h-28 w-28"
              />
              <h1 className="text-center font-bold text-color-dark-primary">
                Psikolog
              </h1>
            </li>
            <li className="flex flex-col items-center justify-center gap-6">
              <img
                src={require("../../../assets/images/sifacilik.png")}
                alt=""
                className="h-28 w-28"
              />
              <h1 className="flex text-center font-bold text-color-dark-primary">
                Şifacılık
              </h1>
            </li>
            <li className="flex flex-col items-center justify-center gap-6">
              <img
                src={require("../../../assets/images/nlp.png")}
                alt=""
                className="h-28 w-28"
              />
              <h1 className="flex text-center font-bold text-color-dark-primary">
                NLP
              </h1>
            </li>
            <li className="flex flex-col items-center justify-center gap-6">
              <img
                src={require("../../../assets/images/aile_dizimi.png")}
                alt=""
                className="h-28 w-28"
              />
              <h1 className="flex text-center font-bold text-color-dark-primary">
                Aile Dizimi
              </h1>
            </li>
            <li className="flex flex-col items-center justify-center gap-6">
              <img
                src={require("../../../assets/images/diyetisyen.png")}
                alt=""
                className="h-28 w-28"
              />
              <h1 className="flex text-center font-bold text-color-dark-primary">
                Diyetisyen
              </h1>
            </li>
            <li className="flex flex-col items-center justify-center gap-6">
              <img
                src={require("../../../assets/images/astrology.png")}
                alt=""
                className="h-28 w-28"
              />
              <h1 className="flex text-center font-bold text-color-dark-primary">
                Astroloji
              </h1>
            </li>
          </ul>
          {/* <motion.div ref={carousel} className="cursor-grab overflow-x-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="flex gap-2 py-2"
            >
              {props.branches.map((branch) => {
                return <BranchCard key={branch._id} branch={branch} />;
              })}
            </motion.div>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
}

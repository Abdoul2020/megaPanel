import React from "react";
import Accordion from "../Accordion/Accordion";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

type Props = {};

export default function QASection({}: Props) {
  return (
    <div className="py-20 w-full relative bg-color-white-secondary flex justify-center items-center">
      <div className="w-2/3 grid grid-cols-3 gap-10">
        <div className="flex flex-col justify-start items-start gap-8">
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-2xl text-color-dark-primary font-bold">
              Sıkça sorulan sorular
            </h1>
            <p className="text-color-dark-primary opacity-70">
              Megaverse Hakkında sık sorulan sorular
            </p>
          </div>
          <button
            className="flex justify-center items-center gap-2 bg-color-secondary bg-opacity-100 rounded-[15px]
           py-4 px-8 hover:opacity-80 hover:cursor-pointer transition-all duration-300"
          >
            <h1 className="text-color-white-secondary font-bold">Tümünü Gör</h1>
            <BsArrowRight className="text-color-white-secondary text-[24px]" />
          </button>
        </div>
        <Accordion />
      </div>
    </div>
  );
}

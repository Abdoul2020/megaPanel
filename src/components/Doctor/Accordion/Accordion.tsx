import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAppSelector } from "../../../app/hooks";

type Props = {};

export default function Accordion({}: Props) {
  const [QA, setQA] = useState(0);
  const faqs = useAppSelector((state) => state.faqs.faqsList);
  return (
    <div className="col-span-2 flex flex-col items-center justify-center gap-4">
      {faqs.map((faq, index) => {
        return (
          <div
            onClick={() => setQA(index)}
            className="flex w-full items-start justify-center border-b-[1px] border-solid border-color-dark-primary border-opacity-10 pb-4 hover:cursor-pointer"
            key={index}
          >
            <div className="flex w-full flex-col items-start justify-center gap-6">
              <h1 className="text-lg text-color-dark-primary">
                {faq.question}
              </h1>
              <div className="w-full">
                {QA === index ? (
                  <p className="w-full text-color-dark-primary opacity-70">
                    {faq.answer}
                  </p>
                ) : (
                  <p className="w-full text-color-dark-primary opacity-70"></p>
                )}
              </div>
            </div>
            <div
              className={`rounded-full p-1 transition-all duration-500 ${
                QA === index
                  ? "rotate-180 bg-color-main"
                  : "rotate-0 bg-color-white"
              }`}
            >
              <IoMdArrowDropdown
                className={`${
                  QA === index ? "text-color-white" : "text-color-main"
                } text-[30px] transition-all duration-500`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

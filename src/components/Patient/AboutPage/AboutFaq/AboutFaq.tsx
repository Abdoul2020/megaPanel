import React from "react";
import { useAppSelector } from "../../../../app/hooks";

type Props = {};

export default function AboutFaq({}: Props) {
  const faqs = useAppSelector((state) => state.faqs.faqsList);
  return (
    <div className="items-start flex flex-col justify-start gap-5">
      <h1 className="text-2xl font-bold text-color-dark-primary">
        Sık Sorulan Sorular
      </h1>
      <div className="flex flex-col items-start justify-start gap-4">
        {faqs.map((faq, index) => {
          return (
            <div
              className="flex flex-col items-start justify-start gap-2"
              key={index}
            >
              <div>
                <h1 className="text-lg text-color-dark-primary">
                  {faq.question}
                </h1>
                <p className="w-full text-color-dark-primary opacity-70">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

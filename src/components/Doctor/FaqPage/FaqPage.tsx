import { useAppSelector } from "../../../app/hooks";

type Props = {};

export default function FaqPage({}: Props) {
  const faqs = useAppSelector((state) => state.faqs.faqsList);
  return (
    <div className="flex w-full flex-col items-center justify-center bg-color-white-secondary py-20 pt-[170px]">
      <div className="flex min-h-[25vh] w-full items-start justify-center bg-color-white-secondary">
        <div className="flex w-2/3 flex-col items-start justify-start gap-10">
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
      </div>
    </div>
  );
}

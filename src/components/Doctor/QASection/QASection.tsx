import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Accordion from "../Accordion/Accordion";

type Props = {};

export default function QASection({}: Props) {
  return (
    <div className="relative flex w-full items-center justify-center bg-color-white-secondary py-20 px-10 lg:px-0">
      <div className="flex flex-col justify-start items-start lg:grid w-full grid-cols-3 gap-10 lg:w-2/3">
        <div className="flex flex-col items-start justify-start gap-8">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-2xl font-bold text-color-dark-primary">
              Sıkça sorulan sorular
            </h1>
            <p className="text-color-dark-primary opacity-70">
              Megaverse Hakkında sık sorulan sorular
            </p>
          </div>
          <Link to="faq">
            <button
              className="hidden lg:flex items-center justify-center gap-2 rounded-[15px] bg-color-secondary bg-opacity-100
           py-4 px-8 transition-all duration-300 hover:cursor-pointer hover:opacity-80"
            >
              <h1 className="font-bold text-color-white-secondary">
                Tümünü Gör
              </h1>
              <BsArrowRight className="text-[24px] text-color-white-secondary" />
            </button>
          </Link>
        </div>
        <Accordion />
      </div>
    </div>
  );
}

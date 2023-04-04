import { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

type Props = {};

export default function AboutHeader({}: Props) {
  const [section, setSection] = useState(0);
  const location = useLocation();
  return (
    <div className="sticky top-10 flex w-full flex-col items-start justify-start gap-4">
      <div className="flex w-full flex-col items-start justify-start gap-5 border-b-[1px] border-solid border-color-dark-primary border-opacity-10 pb-4">
        <div
          className="flex w-full cursor-pointer items-center justify-between"
          onClick={() => setSection(0)}
        >
          <h1 className="text-xl font-bold text-color-dark-primary">
            Megaverse
          </h1>
          <div
            className={`rounded-full p-1 transition-all duration-500 ${
              section === 0
                ? "rotate-180 bg-color-main"
                : "rotate-0 bg-color-white"
            }`}
          >
            <IoMdArrowDropdown
              className={`${
                section === 0 ? "text-color-white" : "text-color-main"
              } text-[25px] transition-all duration-500`}
            />
          </div>
        </div>
        <ul
          className={`flex-col items-start justify-start gap-1 ${
            section === 0 ? "flex" : "hidden"
          }`}
        >
          <Link to="/about">
            <li
              className={`${
                location.pathname === "/about"
                  ? "text-color-main"
                  : "text-color-dark-primary"
              }`}
            >
              Hakkımızda
            </li>
          </Link>
          <Link to="/about/contact">
            <li
              className={`${
                location.pathname === "/about/contact"
                  ? "text-color-main"
                  : "text-color-dark-primary"
              }`}
            >
              İletişim
            </li>
          </Link>
          <Link to="/about/faq">
            <li
              className={`${
                location.pathname === "/about/faq"
                  ? "text-color-main"
                  : "text-color-dark-primary"
              }`}
            >
              Sıkça Sorulan Sorular
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-5 border-b-[1px] border-solid border-color-dark-primary border-opacity-10 pb-4">
        <div
          className="flex w-full cursor-pointer items-center justify-between"
          onClick={() => setSection(1)}
        >
          <h1 className="text-xl font-bold text-color-dark-primary">
            Danışanlar için
          </h1>
          <div
            className={`rounded-full p-1 transition-all duration-500 ${
              section === 1
                ? "rotate-180 bg-color-main"
                : "rotate-0 bg-color-white"
            }`}
          >
            <IoMdArrowDropdown
              className={`${
                section === 1 ? "text-color-white" : "text-color-main"
              } text-[25px] transition-all duration-500`}
            />
          </div>
        </div>
        <ul
          className={`flex-col items-start justify-start gap-1 ${
            section === 1 ? "flex" : "hidden"
          }`}
        >
          <li className="text-color-dark-primary">Danışan Üyelik Sözleşmesi</li>
          <li className="text-color-dark-primary">Danışan Aydınlatma Metni</li>
        </ul>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-5 border-b-[1px] border-solid border-color-dark-primary border-opacity-10 pb-4">
        <div
          className="flex w-full cursor-pointer items-center justify-between"
          onClick={() => setSection(2)}
        >
          <h1 className="text-xl font-bold text-color-dark-primary">
            Uzmanlar için
          </h1>
          <div
            className={`rounded-full p-1 transition-all duration-500 ${
              section === 2
                ? "rotate-180 bg-color-main"
                : "rotate-0 bg-color-white"
            }`}
          >
            <IoMdArrowDropdown
              className={`${
                section === 2 ? "text-color-white" : "text-color-main"
              } text-[25px] transition-all duration-500`}
            />
          </div>
        </div>
        <ul
          className={`flex-col items-start justify-start gap-1 ${
            section === 2 ? "flex" : "hidden"
          }`}
        >
          <Link to="/about/experts/membership-agreement">
            <li
              className={`${
                location.pathname === "/about/experts/membership-agreement"
                  ? "text-color-main"
                  : "text-color-dark-primary"
              }`}
            >
              Uzman Üyelik Sözleşmesi
            </li>
          </Link>
          <li className="text-color-dark-primary">Uzman Aydınlatma Metni</li>
        </ul>
      </div>
    </div>
  );
}

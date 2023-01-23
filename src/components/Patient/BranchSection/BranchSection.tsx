import React, { useEffect, useRef, useState } from "react";
import BranchCard from "../BranchCard/BranchCard";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { motion } from "framer-motion";
import { Branch } from "../../../common/types/Branch.entity";
import Slider from "react-slick";

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

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
        }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    itemsCenter: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="flex w-full items-center justify-center bg-color-white-secondary px-10 lg:px-10">
      <div className="flex w-full flex-col items-start justify-center gap-10 py-20 lg:w-2/3">
        <div className="gap-21 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-color-dark-primary">
            Popüler Branşlar
          </h1>
          <p className="text-color-dark-primary opacity-70">
            Megaverse'ü kimler kullanabilir?
          </p>
        </div>
        <div className="relative w-full">
          <Slider {...settings}>
            <li className="flex flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                  <img
                    src={require("../../../assets/images/kocluk.png")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Yaşam Koçluğu
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <button className="w-full rounded-[15px] bg-color-secondary py-2">
                    <h1 className="font-bold text-color-white">38 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                  <img
                    src={require("../../../assets/images/aile_dizimi.png")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Aile Dizimi
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <button className="w-full rounded-[15px] bg-color-secondary py-2">
                    <h1 className="font-bold text-color-white">38 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                  <img
                    src={require("../../../assets/images/astrology.png")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Astroloji
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <button className="w-full rounded-[15px] bg-color-secondary py-2">
                    <h1 className="font-bold text-color-white">38 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                  <img
                    src={require("../../../assets/images/diyetisyen.png")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Diyetisyen
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <button className="w-full rounded-[15px] bg-color-secondary py-2">
                    <h1 className="font-bold text-color-white">38 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                  <img
                    src={require("../../../assets/images/nlp.png")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    NLP
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <button className="w-full rounded-[15px] bg-color-secondary py-2">
                    <h1 className="font-bold text-color-white">38 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                  <img
                    src={require("../../../assets/images/psikolog.png")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Psikolog
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <button className="w-full rounded-[15px] bg-color-secondary py-2">
                    <h1 className="font-bold text-color-white">38 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                  <img
                    src={require("../../../assets/images/psikiyatr.png")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Psikiyatr
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <button className="w-full rounded-[15px] bg-color-secondary py-2">
                    <h1 className="font-bold text-color-white">38 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                  <img
                    src={require("../../../assets/images/sifacilik.png")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Şifacılık
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <button className="w-full rounded-[15px] bg-color-secondary py-2">
                    <h1 className="font-bold text-color-white">38 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
          </Slider>
        </div>
      </div>
    </div>
  );
}

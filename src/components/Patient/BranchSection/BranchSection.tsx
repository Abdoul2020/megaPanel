import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Branch } from "../../../common/types/Branch.entity";

type Props = {
  branches: Branch[];
};

export default function BranchSection(props: Props) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    itemsCenter: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
          itemsCenter: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
          itemsCenter: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          itemsCenter: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 450,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          itemsCenter: true,
          autoplay: true,
        },
      },
    ],
  };
  return (
    <div className="flex w-full items-center justify-center bg-color-white-secondary px-10 lg:px-10">
      <div className="flex w-full flex-col items-start justify-center gap-10 py-20 lg:w-2/3">
        <div className="gap-21 flex flex-col items-start justify-center">
          <h1 className="text-2xl font-bold text-color-dark-primary">
            Popüler Branşlar
          </h1>
          <p className="text-color-dark-primary opacity-70">
            Megaverse'ü kimler kullanabilir?
          </p>
        </div>
        <div className="relative w-full">
          <Slider {...settings}>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
                  <img
                    src={require("../../../assets/images/kocluk.png")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Yaşam Koçu
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <button className="w-full rounded-[15px] bg-color-secondary py-2">
                    <h1 className="font-bold text-color-white">22 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
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
                    <h1 className="font-bold text-color-white">32 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
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
                    <h1 className="font-bold text-color-white">15 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
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
                    <h1 className="font-bold text-color-white">74 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
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
                    <h1 className="font-bold text-color-white">13 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
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
                    <h1 className="font-bold text-color-white">21 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
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
                    <h1 className="font-bold text-color-white">14 Uzman</h1>
                  </button>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
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
                    <h1 className="font-bold text-color-white">17 Uzman</h1>
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

import { useEffect, useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useAppSelector } from "../../../app/hooks";
import { Branch } from "../../../common/types/Branch.entity";

type Props = {
  branches: Branch[];
};

export default function BranchSection(props: Props) {
  const slider = useRef<any>(null);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    itemsCenter: true,
    autoplay: true,
    arrows: false,
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
          arrows: false,
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
          arrows: false,
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
          arrows: false,
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
          arrows: false,
        },
      },
    ],
  };
  const branches = useAppSelector((state) => state.branches.branchesList);
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
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between">
            <button
              className="absolute right-full"
              onClick={() => slider?.current?.slickPrev()}
            >
              <BsFillArrowLeftCircleFill className="text-[32px] text-color-main" />
            </button>
            <button
              className="absolute left-full"
              onClick={() => slider?.current?.slickNext()}
            >
              <BsFillArrowRightCircleFill className="text-[32px] text-color-main" />
            </button>
          </div>
          <Slider ref={slider} {...settings}>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
                  <img
                    src={require("../../../assets/images/kocluk.webp")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Yaşam Koçu
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <Link to="/search?online=true&query_text=Yaşam Koçu">
                    <button className="w-full rounded-[15px] bg-color-secondary py-2 transition-all duration-100 hover:opacity-80">
                      <h1 className="font-bold text-color-white">{`${
                        branches.find(
                          (branch) => branch.branch_title === "Yaşam Koçu"
                        ) !== undefined
                          ? branches.find(
                              (branch) => branch.branch_title === "Yaşam Koçu"
                            )?.branch_expert_count
                          : 0
                      } Uzman`}</h1>
                    </button>
                  </Link>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
                  <img
                    src={require("../../../assets/images/aile_dizimi.webp")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Psikodrama
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <Link to="/search?online=true&query_text=Psikodrama">
                    <button className="w-full rounded-[15px] bg-color-secondary py-2 transition-all duration-100 hover:opacity-80">
                      <h1 className="font-bold text-color-white">{`${
                        branches.find(
                          (branch) => branch.branch_title === "Aile Dizimi"
                        ) !== undefined
                          ? branches.find(
                              (branch) => branch.branch_title === "Aile Dizimi"
                            )?.branch_expert_count
                          : 0
                      } Uzman`}</h1>
                    </button>
                  </Link>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
                  <img
                    src={require("../../../assets/images/astrology.webp")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Astroloji
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <Link to="/search?online=true&query_text=Astroloji">
                    <button className="w-full rounded-[15px] bg-color-secondary py-2 transition-all duration-100 hover:opacity-80">
                      <h1 className="font-bold text-color-white">{`${
                        branches.find(
                          (branch) => branch.branch_title === "Astroloji"
                        ) !== undefined
                          ? branches.find(
                              (branch) => branch.branch_title === "Astroloji"
                            )?.branch_expert_count
                          : 0
                      } Uzman`}</h1>
                    </button>
                  </Link>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
                  <img
                    src={require("../../../assets/images/diyetisyen.webp")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Diyetisyen
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <Link to="/search?online=true&query_text=Diyetisyen">
                    <button className="w-full rounded-[15px] bg-color-secondary py-2 transition-all duration-100 hover:opacity-80">
                      <h1 className="font-bold text-color-white">{`${
                        branches.find(
                          (branch) => branch.branch_title === "Diyetisyen"
                        ) !== undefined
                          ? branches.find(
                              (branch) => branch.branch_title === "Diyetisyen"
                            )?.branch_expert_count
                          : 0
                      } Uzman`}</h1>
                    </button>
                  </Link>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
                  <img
                    src={require("../../../assets/images/nlp.webp")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    NLP
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <Link to="/search?online=true&query_text=NLP">
                    <button className="w-full rounded-[15px] bg-color-secondary py-2 transition-all duration-100 hover:opacity-80">
                      <h1 className="font-bold text-color-white">{`${
                        branches.find(
                          (branch) => branch.branch_title === "NLP"
                        ) !== undefined
                          ? branches.find(
                              (branch) => branch.branch_title === "NLP"
                            )?.branch_expert_count
                          : 0
                      } Uzman`}</h1>
                    </button>
                  </Link>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
                  <img
                    src={require("../../../assets/images/psikolog.webp")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Psikolog
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <Link to="/search?online=true&query_text=Psikolog">
                    <button className="w-full rounded-[15px] bg-color-secondary py-2 transition-all duration-100 hover:opacity-80">
                      <h1 className="font-bold text-color-white">{`${
                        branches.find(
                          (branch) => branch.branch_title === "Psikolog"
                        ) !== undefined
                          ? branches.find(
                              (branch) => branch.branch_title === "Psikolog"
                            )?.branch_expert_count
                          : 0
                      } Uzman`}</h1>
                    </button>
                  </Link>
                </div>
              </div>
            </li>
            <li className="flex w-[250px] flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center justify-center rounded-[25px] bg-color-white">
                <div className="flex flex-col items-center justify-center gap-4 p-8 px-6">
                  <img
                    src={require("../../../assets/images/psikiyatr.webp")}
                    alt=""
                    className="h-20 w-20"
                  />
                  <h1 className="flex text-center font-bold text-color-dark-primary">
                    Psikiyatr
                  </h1>
                </div>
                <div className="w-full px-2 pb-2">
                  <Link to="/search?online=true&query_text=Psikiyatr">
                    <button className="w-full rounded-[15px] bg-color-secondary py-2 transition-all duration-100 hover:opacity-80">
                      <h1 className="font-bold text-color-white">{`${
                        branches.find(
                          (branch) => branch.branch_title === "Psikiyatr"
                        ) !== undefined
                          ? branches.find(
                              (branch) => branch.branch_title === "Psikiyatr"
                            )?.branch_expert_count
                          : 0
                      } Uzman`}</h1>
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          </Slider>
        </div>
      </div>
    </div>
  );
}

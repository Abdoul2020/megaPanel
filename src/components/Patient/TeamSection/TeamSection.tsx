import React, { useRef, useEffect, useState } from "react";
import TeamMember from "../TeamMember/TeamMember";
import { BsArrowRight, BsArrowLeft, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { Doctor } from "../../../common/types/Doctor.entity";
import Slider from "react-slick";

type Props = {
  doctors: Doctor[];
};

export default function TeamSection(props: Props) {
  const slider = useRef<any>(null);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: props.doctors.length < 4 ? props.doctors.length : 4,
    slidesToScroll: 1,
    initialSlide: 0,
    itemsCenter: true,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: props.doctors.length < 4 ? props.doctors.length : 3,
          slidesToScroll: 1,
          initialSlide: 0,
          itemsCenter: true,
          autoplay: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
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
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: props.doctors.length < 4 ? props.doctors.length : 1,
          slidesToScroll: 1,
          initialSlide: 0,
          itemsCenter: true,
          autoplay: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="flex w-full items-center justify-center bg-color-white-secondary px-10 lg:px-0">
      <div className="flex w-full flex-col items-start justify-center gap-10 py-20 lg:w-2/3">
        <div className="gap-21 flex flex-col items-start justify-center">
          <h1 className="text-2xl font-bold text-color-dark-primary">
            Uzmanlarımızla Tanış
          </h1>
          <p className="text-color-dark-primary opacity-70">
            Binlerce uzmanın arasından tercihini yap, hemen online olarak görüş
            veya soru sor.
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
            {props.doctors.map((expert) => {
              return (
                <li key={expert._id} className="px-10">
                  <TeamMember key={expert._id} expert={expert} />
                </li>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

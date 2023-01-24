import React, { useRef, useEffect, useState } from "react";
import TeamMember from "../TeamMember/TeamMember";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { motion } from "framer-motion";
import { Doctor } from "../../../common/types/Doctor.entity";
import Slider from "react-slick";

type Props = {
  doctors: Doctor[];
};

export default function TeamSection(props: Props) {
  const [width, setWidth] = useState(0);

  const carousel = useRef<HTMLInputElement>(null);

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
    slidesToShow: props.doctors.length < 4 ? props.doctors.length : 4,
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
    <div className="flex w-full items-center justify-center bg-color-white-secondary px-10 lg:px-0">
      <div className="flex w-full flex-col items-start justify-center gap-10 py-20 lg:w-2/3">
        <div className="gap-21 flex flex-col items-start justify-center">
          <h1 className="text-2xl font-bold text-color-dark-primary">
            Uzmanlarımızla Tanış
          </h1>
          <p className="text-color-dark-primary opacity-70">
            Binlerce hekimin arasından tercihini yap, hemen online olarak görüş
            veya soru sor.
          </p>
        </div>
        <div className="relative w-full">
          <Slider {...settings}>
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

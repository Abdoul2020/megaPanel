import React, { useEffect } from "react";
import BannerSection from "../BannerSection/BannerSection";
import PromotionSection from "../PromotionSection/PromotionSection";
import FeaturesSection from "../FeaturesSection/FeaturesSection";
import PricingSection from "../PricingSection/PricingSection";
import QASection from "../QASection/QASection";
import CTASection from "../CTASection/CTASection";
import CTASecondSection from "../CTASecondSection/CTASecondSection";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateDoctorState } from "../../../features/options/optionsSlice";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

type Props = {};

export default function Home({}: Props) {
  const forDoctors = useAppSelector((state) => state.options.forDoctors);
  const sticky = useAppSelector((state) => state.options.sticky);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!forDoctors) {
      dispatch(updateDoctorState());
    }
  }, []);
  return (
    <div className="relative">
      <Link to="/" onClick={() => dispatch(updateDoctorState())}>
        <div
          className={`z-50 fixed top-0 left-0 transition-all duration-500 ${
            sticky ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mt-4 z-50 flex justify-center items-center gap-4 px-8 py-[18px] rounded-r-[15px] shadow-xl bg-color-secondary hover:bg-color-white group transition-all duration-500 cursor-pointer">
            <FiSearch
              fontSize={15}
              className="text-color-white group-hover:text-color-secondary transition-all duration-500"
            />
            <button className="">
              <h1 className="text-sm font-normal text-color-white group-hover:text-color-secondary transition-all duration-500">
                Uzman ara
              </h1>
            </button>
          </div>
        </div>
      </Link>
      <BannerSection />
      <PromotionSection />
      <FeaturesSection />
      <CTASection />
      <PricingSection />
      <CTASecondSection />
      <QASection />
    </div>
  );
}

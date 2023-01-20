import React, { useEffect, useRef } from "react";
import BannerSection from "../BannerSection/BannerSection";
import PromotionSection from "../PromotionSection/PromotionSection";
import FeaturesSection from "../FeaturesSection/FeaturesSection";
import PricingSection from "../PricingSection/PricingSection";
import QASection from "../QASection/QASection";
import CTASection from "../CTASection/CTASection";
import CTASecondSection from "../CTASecondSection/CTASecondSection";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateDoctorState } from "../../../features/options/optionsSlice";
import { Link, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import CTAResponsive from "../CTAResponsive/CTAResponsive";

type Props = {};

export default function Home({}: Props) {
  const location = useLocation();
  const forDoctors = useAppSelector((state) => state.options.forDoctors);
  const sticky = useAppSelector((state) => state.options.sticky);
  const authObject = useAppSelector((state) => state.auth.auth_object);
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const dispatch = useAppDispatch();

  const bannerRef = useRef<HTMLInputElement>(null);
  const faqRef = useRef<HTMLInputElement>(null);
  const featuresRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!forDoctors) {
      dispatch(updateDoctorState());
    }
  }, []);
  useEffect(() => {
    if (location.hash === "#banner") {
      if (bannerRef.current) {
        bannerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    } else if (location.hash === "#faq") {
      if (faqRef.current) {
        faqRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    } else if (location.hash === "#features") {
      if (featuresRef.current) {
        featuresRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [location]);
  return (
    <div className="relative snap-y snap-mandatory snap-center">
      {authObject !== undefined || authObject !== undefined ? (
        <div></div>
      ) : (
        <Link to="/" onClick={() => dispatch(updateDoctorState())}>
          <div
            className={`fixed top-0 left-0 z-50 transition-all duration-500 ${
              sticky ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="group z-50 mt-4 flex cursor-pointer items-center justify-center gap-4 rounded-r-[15px] bg-color-secondary px-8 py-[18px] shadow-xl transition-all duration-500 hover:bg-color-white">
              <FiSearch
                fontSize={15}
                className="text-color-white transition-all duration-500 group-hover:text-color-secondary"
              />
              <button className="">
                <h1 className="text-sm font-normal text-color-white transition-all duration-500 group-hover:text-color-secondary">
                  Uzman ara
                </h1>
              </button>
            </div>
          </div>
        </Link>
      )}
      <div ref={bannerRef}>
        <BannerSection />
      </div>
      <PromotionSection />
      <div ref={featuresRef}>
        <FeaturesSection />
      </div>
      <CTASection />
      <CTAResponsive />
      {/* <PricingSection /> */}
      {authExpertObject !== undefined ? <div></div> : <CTASecondSection />}
      <div ref={faqRef}>
        <QASection />
      </div>
    </div>
  );
}

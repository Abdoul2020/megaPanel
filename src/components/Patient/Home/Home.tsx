import React, { useEffect } from "react";
import { FaStethoscope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateDoctorState } from "../../../features/options/optionsSlice";
import BannerSection from "../BannerSection/BannerSection";
import BranchSection from "../BranchSection/BranchSection";
import CTASection from "../CTASection/CTASection";
import QASection from "../../Doctor/QASection/QASection";
import ProcessSection from "../ProcessSection/ProcessSection";
import PromotionDoctor from "../PromotionDoctor/PromotionDoctor";
import PromotionSection from "../PromotionSection/PromotionSection";
import TeamSection from "../TeamSection/TeamSection";
import { Doctor } from "../../../common/types/Doctor.entity";
import { Branch } from "../../../common/types/Branch.entity";

type Props = {
  doctors: Doctor[];
  branches: Branch[];
};

export default function Home(props: Props) {
  const forDoctors = useAppSelector((state) => state.options.forDoctors);
  const sticky = useAppSelector((state) => state.options.sticky);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (forDoctors) {
      dispatch(updateDoctorState());
    }
  }, []);
  return (
    <div className="relative">
      <Link to="/for-doctors" onClick={() => dispatch(updateDoctorState())}>
        <div
          className={`z-50 fixed top-0 left-0 transition-all duration-500 ${
            sticky ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mt-4 z-50 flex justify-center items-center gap-4 px-8 py-[18px] rounded-r-[15px] shadow-xl bg-color-secondary hover:bg-color-white group transition-all duration-500 cursor-pointer">
            <FaStethoscope
              fontSize={15}
              className="text-color-white group-hover:text-color-secondary transition-all duration-500"
            />
            <button className="">
              <h1 className="text-sm font-normal text-color-white group-hover:text-color-secondary transition-all duration-500">
                Uzman mısınız?
              </h1>
            </button>
          </div>
        </div>
      </Link>

      <BannerSection />
      <PromotionSection />
      <BranchSection branches={props.branches} />
      <CTASection />
      <ProcessSection />
      <PromotionDoctor />
      <TeamSection doctors={props.doctors} />
      <QASection />
    </div>
  );
}

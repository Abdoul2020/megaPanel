import { useEffect } from "react";
import { FaStethoscope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Branch } from "../../../common/types/Branch.entity";
import { Doctor } from "../../../common/types/Doctor.entity";
import { updateDoctorState } from "../../../features/options/optionsSlice";
import QASection from "../../Doctor/QASection/QASection";
import BannerSection from "../BannerSection/BannerSection";
import BranchSection from "../BranchSection/BranchSection";
import CTAResponsive from "../CTAResponsive/CTAResponsive";
import CTASection from "../CTASection/CTASection";
import ProcessSection from "../ProcessSection/ProcessSection";
import PromotionDoctor from "../PromotionDoctor/PromotionDoctor";
import PromotionSection from "../PromotionSection/PromotionSection";
import TeamSection from "../TeamSection/TeamSection";

type Props = {
  doctors: Doctor[];
  branches: Branch[];
};

export default function Home(props: Props) {
  const forDoctors = useAppSelector((state) => state.options.forDoctors);
  const sticky = useAppSelector((state) => state.options.sticky);
  const authObject = useAppSelector((state) => state.auth.auth_object);
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (forDoctors) {
      dispatch(updateDoctorState());
    }
  }, []);
  return (
    <div className="relative">
      {authExpertObject !== undefined || authObject !== undefined ? (
        <div></div>
      ) : (
        <Link to="/experts" onClick={() => dispatch(updateDoctorState())}>
          <div
            className={`fixed top-0 left-0 z-50 transition-all duration-500 ${
              sticky ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="group z-50 mt-4 flex cursor-pointer items-center justify-center gap-4 rounded-r-[15px] bg-color-secondary px-8 py-[18px] shadow-xl transition-all duration-500 hover:bg-color-white">
              <FaStethoscope
                fontSize={15}
                className="text-color-white transition-all duration-500 group-hover:text-color-secondary"
              />
              <button className="">
                <h1 className="text-sm font-normal text-color-white transition-all duration-500 group-hover:text-color-secondary">
                  Uzman mısınız?
                </h1>
              </button>
            </div>
          </div>
        </Link>
      )}

      <BannerSection />
      <PromotionSection />
      <BranchSection branches={props.branches} />
      <CTASection />
      <ProcessSection />
      <PromotionDoctor />
      <CTAResponsive />
      {props.doctors.length > 0 ? (
        <TeamSection doctors={props.doctors} />
      ) : (
        <div></div>
      )}
      <QASection />
    </div>
  );
}

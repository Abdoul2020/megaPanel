import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFoundPage from "../../Common/NotFoundPage/NotFoundPage";
import AboutContact from "./AboutContact/AboutContact";
import AboutFaq from "./AboutFaq/AboutFaq";
import AboutHeader from "./AboutHeader/AboutHeader";
import AboutHome from "./AboutHome/AboutHome";
import AboutMembershipAggreement from "./AboutMembershipAggreement/AboutMembershipAggreement";

type Props = {};

export default function AboutPage({}: Props) {
  const location = useLocation();
  const headerRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  }, [location]);
  return (
    <div className="flex w-full flex-col items-center justify-center bg-color-white-secondary py-20 pt-[170px]">
      <div className="flex min-h-[25vh] w-full items-start justify-center bg-color-white-secondary">
        <div className="relative flex w-full grid-cols-6 flex-col gap-10 px-5 md:grid lg:w-2/3 lg:px-0">
          <div className="col-span-2 hidden h-full md:block">
            <AboutHeader />
          </div>
          <div className="block md:hidden">
            <AboutHeader />
          </div>
          <div className="col-span-4" ref={headerRef}>
            <Routes>
              <Route index element={<AboutHome />} />
              <Route path="contact" element={<AboutContact />} />
              <Route path="faq" element={<AboutFaq />} />
              <Route
                path="experts/membership-agreement"
                element={<AboutMembershipAggreement />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

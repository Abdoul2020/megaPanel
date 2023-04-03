import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../../Common/NotFoundPage/NotFoundPage";
import AboutContact from "./AboutContact/AboutContact";
import AboutFaq from "./AboutFaq/AboutFaq";
import AboutHeader from "./AboutHeader/AboutHeader";
import AboutHome from "./AboutHome/AboutHome";

type Props = {};

export default function AboutPage({}: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-color-white-secondary py-20 pt-[170px]">
      <div className="flex min-h-[25vh] w-full items-start justify-center bg-color-white-secondary">
        <div className="grid w-full grid-cols-6 gap-10 px-5 lg:w-2/3 lg:px-0">
          <AboutHeader />
          <div className="col-span-4">
            <Routes>
              <Route index element={<AboutHome />} />
              <Route path="contact" element={<AboutContact />} />
              <Route path="faq" element={<AboutFaq />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

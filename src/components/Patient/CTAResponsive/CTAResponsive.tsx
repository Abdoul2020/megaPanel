import React from "react";

type Props = {};

export default function CTAResponsive({}: Props) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-color-white-secondary py-10 px-10 lg:px-0">
      <div className="flex w-full flex-col items-start justify-start lg:w-2/3">
        <div className="gap-21 flex w-full flex-col items-start justify-center">
          <h1 className="text-2xl font-bold text-color-dark-primary">
            Entegrasyon
          </h1>
          <p className="text-color-dark-primary opacity-70">
            Megaverse’e bütün platform ve cihazlardan 7 gün 24 saat kesintisiz
            ulaşım sağlayabilirsiniz.
          </p>
        </div>
        <ul className="relative z-10 grid w-full grid-cols-1 md:grid-cols-2 content-center items-center gap-y-10 py-20 2xl:grid-cols-4">
          <li className="relative flex flex-col items-center justify-center gap-10">
            <img
              src={require("../../../assets/images/megaverse_mockups-03.png")}
              alt=""
              className="h-[200px]"
            />
            <h1 className="-ml-8 font-bold text-color-dark-primary opacity-80">
              Bilgisayarda
            </h1>
          </li>
          <li className="relative flex flex-col items-center justify-center gap-10">
            <img
              src={require("../../../assets/images/megaverse_mockups-04.png")}
              alt=""
              className="h-[200px]"
            />
            <h1 className="-ml-8 font-bold text-color-dark-primary opacity-80">
              Notebook'ta
            </h1>
          </li>
          <li className="relative flex flex-col items-center justify-center gap-10">
            <img
              src={require("../../../assets/images/megaverse_mockups-05.png")}
              alt=""
              className="h-[200px]"
            />
            <h1 className="-ml-8 font-bold text-color-dark-primary opacity-80">
              Tablette
            </h1>
          </li>
          <li className="relative flex flex-col items-center justify-center gap-10">
            <img
              src={require("../../../assets/images/megaverse_mockups-06.png")}
              alt=""
              className="h-[200px]"
            />
            <h1 className="-ml-8 font-bold text-color-dark-primary opacity-80">
              Telefonda
            </h1>
          </li>
        </ul>
      </div>
    </div>
  );
}

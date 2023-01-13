import React from "react";
import { BsPhone, BsPlusLg } from "react-icons/bs";
import { GiDoctorFace, GiFaceToFace } from "react-icons/gi";
import { TbCalendarPlus, TbHandClick } from "react-icons/tb";
import { FiSmartphone } from "react-icons/fi";
import { SiGooglemeet } from "react-icons/si";

type Props = {};

export default function PromotionSection({}: Props) {
  return (
    <div
      className="w-full grid grid-cols-2 relative"
      style={{
        background:
          "radial-gradient(circle, rgba(51,169,179,1) 0%, rgba(22,63,64,1) 0%)",
      }}
    >
      <div className="bg-color-main absolute w-full h-full opacity-80"></div>
      <div className="z-20">
        <img src={require("../../../assets/images/people.png")} alt="" />
        {/* <div className="absolute -top-10 -right-16 shadow-lg bg-color-white rounded-3xl px-2 py-4 w-[150px] flex flex-col justify-center items-center gap-6">
          <MdQuestionAnswer className="text-color-main text-[48px]" />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-lg text-color-dark-primary font-bold">
              Soru Sor
            </h1>
            <h1 className="text-color-dark-primary text-center opacity-70">
              Uzmanlarımıza danış istediğini sor.
            </h1>
          </div>
        </div> */}
      </div>
      <div className="h-full w-full z-20 flex justify-center items-center">
        <div className="grid grid-cols-2 justify-around items-center gap-20">
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="bg-color-white rounded-[30px] p-8 shadow-lg">
              <TbHandClick className="text-[64px] text-color-main" />
            </div>
            <h1 className="text-color-white text-lg text-opacity-80">
              Uzman Seç
            </h1>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="bg-color-white rounded-[30px] p-8 shadow-lg">
              <GiDoctorFace className="text-[64px] text-color-main" />
            </div>
            <h1 className="text-color-white text-lg text-opacity-80">
              Doktor Bul
            </h1>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="bg-color-white rounded-[30px] p-8 shadow-lg">
              <GiFaceToFace className="text-[64px] text-color-main" />
            </div>
            <h1 className="text-color-white text-lg text-opacity-80">
              Yüz yüze Randevu
            </h1>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="bg-color-white rounded-[30px] p-8 shadow-lg">
              <SiGooglemeet className="text-[64px] text-color-main" />
            </div>
            <h1 className="text-color-white text-lg text-opacity-80">
              Online Görüşme
            </h1>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-rows-2 bg-color-white rounded-l-3xl p-24 z-20 mb-20">
        <div className="grid grid-cols-2 items-start justify-start gap-16 border-b-[1px] border-solid border-color-dark-primary border-opacity-20 pb-8 w-[800px]">
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="p-2 border-4 border-solid border-color-main rounded-xl">
              <BsPlusLg className="text-[36px] text-color-main" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-xl text-color-dark-primary font-bold">
                Branş Seç
              </h1>
              <h1 className="text-color-dark-primary opacity-70">
                Onlarca branş arasından istediğini seç.
              </h1>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="p-2 border-4 border-solid border-color-main rounded-xl">
              <GiDoctorFace className="text-[36px] text-color-main" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-xl text-color-dark-primary font-bold">
                Uzman Bul
              </h1>
              <h1 className="text-color-dark-primary opacity-70">
                Hastaların görüşlerini incele, uzmanlar arasından seçim yap.
              </h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 pt-8 gap-16 items-start justify-start w-[800px]">
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="p-2 border-4 border-solid border-color-main rounded-xl">
              <TbCalendarPlus className="text-[36px] text-color-main" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-xl text-color-dark-primary font-bold">
                Yüz Yüze Randevu
              </h1>
              <h1 className="text-color-dark-primary opacity-70">
                Müsait saat aralıklarını görüntüle, muayene için randevu al.
              </h1>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="p-2 border-4 border-solid border-color-main rounded-xl">
              <FiSmartphone className="text-[36px] text-color-main" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-xl text-color-dark-primary font-bold">
                Online Görüşme
              </h1>
              <h1 className="text-color-dark-primary opacity-70">
                Evinden ayrılmadan uzmanına ulaş, görüntülü görüşerek muayene
                ol.
              </h1>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

import React from "react";
import { BsPhone, BsPlusLg } from "react-icons/bs";
import { GiDoctorFace } from "react-icons/gi";
import { TbCalendarPlus } from "react-icons/tb";
import { FiSmartphone } from "react-icons/fi";
import { MdQuestionAnswer } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { FaClinicMedical } from "react-icons/fa";
import { FaFilePrescription } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";
import { SiGooglemeet } from "react-icons/si";

type Props = {};

export default function PromotionSection({}: Props) {
  return (
    <div className="w-full bg-doctor-color-main bg-opacity-50 grid grid-cols-2 relative">
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
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="flex justify-center items-center gap-6">
              <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                <GiDoctorFace className="text-[36px] text-color-main" />
              </div>
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-xl text-color-dark-primary font-bold">
                  8712
                </h1>
                <h1 className="text-color-dark-primary opacity-70">
                  Aktif Danışman
                </h1>
              </div>
            </div>
            <h1 className="text-color-dark-primary opacity-70">
              Hizmet veren aktif danışman sayımız.
            </h1>
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="flex justify-center items-center gap-6">
              <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                <IoIosPerson className="text-[36px] text-color-main" />
              </div>
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-xl text-color-dark-primary font-bold">
                  2790270
                </h1>
                <h1 className="text-color-dark-primary opacity-70">Danışan</h1>
              </div>
            </div>
            <h1 className="text-color-dark-primary opacity-70">
              Her geçen gün artan danışan sayımız.
            </h1>
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="flex justify-center items-center gap-6">
              <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                <TbCalendarPlus className="text-[36px] text-color-main" />
              </div>
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-xl text-color-dark-primary font-bold">
                  2270127
                </h1>
                <h1 className="text-color-dark-primary opacity-70">
                  Planlı Randevu
                </h1>
              </div>
            </div>
            <h1 className="text-color-dark-primary opacity-70">
              Gerçekleşecek görüşme sayısı.
            </h1>
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="flex justify-center items-center gap-6">
              <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                <SiGooglemeet className="text-[36px] text-color-main" />
              </div>
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-xl text-color-dark-primary font-bold">
                  41568
                </h1>
                <h1 className="text-color-dark-primary opacity-70">Seans</h1>
              </div>
            </div>
            <h1 className="text-color-dark-primary opacity-70">
              Şu ana kadar gerçekleştirilen seans sayısı.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

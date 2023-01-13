import React, { useState } from "react";
import { RiCalendarCheckFill } from "react-icons/ri";
import { ImSearch } from "react-icons/im";
import { TbReportAnalytics } from "react-icons/tb";
import { MdDeviceThermostat } from "react-icons/md";
import { IoFolder } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { FaFileMedicalAlt } from "react-icons/fa";
import { motion } from "framer-motion";

type Props = {};

export default function FeaturesSection({}: Props) {
  const array = [1, 2, 3, 4, 5, 6, 7];
  const [activeFeature, setActiveFeature] = useState(0);
  return (
    <div className="py-20 w-full relative bg-color-white-secondary flex flex-col justify-center items-center gap-12">
      <div className="w-2/3 flex justify-start items-start">
        <div className="flex flex-col justify-start items-start gap-21">
          <h1 className="text-2xl text-color-dark-primary font-bold">
            Öne Çıkan Özelliklerimiz
          </h1>
          <p className="text-color-dark-primary opacity-70">
            Klinik yönetimi ve hasta takibi için ihtiyaç duyacağınızdan fazlası.
          </p>
        </div>
      </div>
      <div className="w-2/3 flex flex-col justify-center items-center gap-12">
        <div className="w-full flex justify-around relative items-center gap-8 border-b-[1px] border-color-dark-primary border-opacity-10">
          <div
            className="flex flex-col justify-center items-center gap-2 relative pb-6 px-2 group hover:cursor-pointer"
            onClick={() => setActiveFeature(0)}
          >
            <div className="p-6 bg-color-white rounded-[25px] shadow-lg">
              <RiCalendarCheckFill className="text-[48px] text-color-main group-hover:scale-110 transition-all duration-300" />
            </div>
            <h1
              className={`text-color-dark-primary text-base font-bold ${
                activeFeature === 0
                  ? "opacity-80"
                  : "opacity-50 transition-all duration-300"
              }`}
            >
              Randevu Yönetimi
            </h1>
            {activeFeature === 0 ? (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full"></div>
            )}
          </div>

          {/* <div
            className="flex flex-col justify-center items-center gap-2 relative pb-6 px-2 group hover:cursor-pointer"
            onClick={() => setActiveFeature(1)}
          >
            <div className="p-6 bg-color-white rounded-[25px] shadow-lg">
              <FaFileMedicalAlt className="text-[48px] text-color-main group-hover:scale-110 transition-all duration-500" />
            </div>
            <h1
              className={`text-color-dark-primary text-base font-bold ${
                activeFeature === 1
                  ? "opacity-80"
                  : "opacity-50 transition-all duration-300"
              }`}
            >
              Medikal Takip
            </h1>
            {activeFeature === 1 ? (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full"></div>
            )}
          </div> */}

          <div
            className="flex flex-col justify-center items-center gap-2 relative pb-6 px-2 group hover:cursor-pointer"
            onClick={() => setActiveFeature(2)}
          >
            <div className="p-6 bg-color-white rounded-[25px] shadow-lg">
              <ImSearch className="text-[48px] text-color-main group-hover:scale-110 transition-all duration-500" />
            </div>
            <h1
              className={`text-color-dark-primary text-base font-bold ${
                activeFeature === 2
                  ? "opacity-80"
                  : "opacity-50 transition-all duration-300"
              }`}
            >
              Danışan Takibi
            </h1>
            {activeFeature === 2 ? (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full"></div>
            )}
          </div>

          <div
            className="flex flex-col justify-center items-center gap-2 relative pb-6 px-2 group hover:cursor-pointer"
            onClick={() => setActiveFeature(3)}
          >
            <div className="p-6 bg-color-white rounded-[25px] shadow-lg">
              <TbReportAnalytics className="text-[48px] text-color-main group-hover:scale-110 transition-all duration-500" />
            </div>
            <h1
              className={`text-color-dark-primary text-base font-bold ${
                activeFeature === 3
                  ? "opacity-80"
                  : "opacity-50 transition-all duration-300"
              }`}
            >
              Finansal Bilgiler
            </h1>
            {activeFeature === 3 ? (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full"></div>
            )}
          </div>

          {/* <div
            className="flex flex-col justify-center items-center gap-2 relative pb-6 px-2 group hover:cursor-pointer"
            onClick={() => setActiveFeature(4)}
          >
            <div className="p-6 bg-color-white rounded-[25px] shadow-lg">
              <MdDeviceThermostat className="text-[48px] text-color-main group-hover:scale-110 transition-all duration-500" />
            </div>
            <h1
              className={`text-color-dark-primary text-base font-bold ${
                activeFeature === 4
                  ? "opacity-80"
                  : "opacity-50 transition-all duration-300"
              }`}
            >
              Ölçüm Takip
            </h1>
            {activeFeature === 4 ? (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full"></div>
            )}
          </div> */}

          {/* <div
            className="flex flex-col justify-center items-center gap-2 relative pb-6 px-2 group hover:cursor-pointer"
            onClick={() => setActiveFeature(5)}
          >
            <div className="p-6 bg-color-white rounded-[25px] shadow-lg">
              <TbReport className="text-[48px] text-color-main group-hover:scale-110 transition-all duration-500" />
            </div>
            <h1
              className={`text-color-dark-primary text-base font-bold ${
                activeFeature === 5
                  ? "opacity-80"
                  : "opacity-50 transition-all duration-300"
              }`}
            >
              Raporlama
            </h1>
            {activeFeature === 5 ? (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full"></div>
            )}
          </div> */}

          <div
            className="flex flex-col justify-center items-center gap-2 relative pb-6 px-2 group hover:cursor-pointer"
            onClick={() => setActiveFeature(6)}
          >
            <div className="p-6 bg-color-white rounded-[25px] shadow-lg">
              <IoFolder className="text-[48px] text-color-main group-hover:scale-110 transition-all duration-500" />
            </div>
            <h1
              className={`text-color-dark-primary text-base font-bold ${
                activeFeature === 6
                  ? "opacity-80"
                  : "opacity-50 transition-all duration-300"
              }`}
            >
              Döküman Yönetimi
            </h1>
            {activeFeature === 6 ? (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="h-[5px] absolute -bottom-[3px] w-[200px] rounded-full"></div>
            )}
          </div>
        </div>
        {activeFeature === 0 ? (
          <div className="w-full grid grid-cols-3 gap-10">
            <div className="flex flex-col justify-center items-start gap-4 col-span-1">
              <h1 className="text-2xl font-bold text-color-main">
                Randevu Yönetimi
              </h1>
              <h1 className="text-lg font-bold text-color-dark-primary">
                Doktor çalışma takviminize ve muayene sürelerinize göre
                randevularınızı kolaylıkla yönetebilirsiniz.
              </h1>
              <p className="text-color-dark-primary opacity-80">
                Megaverse randevu modülünüze entegre olarak hastalarınız web
                portalınızdan kolaylıkla randevu alabilir, sistem tercihlerinize
                göre hastalarınıza randevu hatırlatmalarını SMS veya Mail ile
                yapabilirsiniz.
              </p>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <img
                src={require("../../../assets/images/features/appointment-management-1.jpg")}
                alt=""
                className="w-4/5 h-full p-4 bg-color-white rounded-[25px] shadow-lg opacity-90"
              />
            </div>
          </div>
        ) : // activeFeature === 1 ? (
        //   <div className="w-full grid grid-cols-3 gap-10">
        //     <div className="flex flex-col justify-center items-start gap-4 col-span-1">
        //       <h1 className="text-2xl font-bold text-color-main">
        //         Medikal Takip
        //       </h1>
        //       <h1 className="text-lg font-bold text-color-dark-primary">
        //         Hastalar için medikal özgeçmiş ve muayene bilgilerini kolaylıkla
        //         kayıt altına alabilir, geçmiş bulgulara birkaç tıklama ile
        //         ulaşabilirsiniz.
        //       </h1>
        //       <p className="text-color-dark-primary opacity-80">
        //         Her branş için özel geliştirilmiş medikal ekranlar sayesinde
        //         medikal takiplerinizi kolaylıkla yapabilir, branşlara bağlı
        //         olarak değişen iş süreçlerinizi yönetebilirsiniz.
        //       </p>
        //     </div>
        //     <div className="col-span-2 flex justify-center items-center">
        //       <img
        //         src={require("../../../assets/images/features/medical-follow-1.jpg")}
        //         alt=""
        //         className="w-4/5 h-full p-4 bg-color-white rounded-[25px] shadow-lg opacity-90"
        //       />
        //     </div>
        //   </div>
        // )
        activeFeature === 2 ? (
          <div className="w-full grid grid-cols-3 gap-10">
            <div className="flex flex-col justify-center items-start gap-4 col-span-1">
              <h1 className="text-2xl font-bold text-color-main">
                Danışan Takibi
              </h1>
              <h1 className="text-lg font-bold text-color-dark-primary">
                Randevu yönetim sistemi ve finansal modüllere bağlı olarak
                çalışan Danışan Takip Sistemi ile danışan bilgilerini ve tüm
                geliş protokollerini sağlık sistematiğine göre kayıt altına
                alabilirsiniz.
              </h1>
              <p className="text-color-dark-primary opacity-80">
                Taahhütname, barkod gibi ihtiyaç duyacağınız tüm çıktılarınızı
                Megaverse üzerinden kendi tasarımınıza göre alabilirsiniz.
              </p>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <img
                src={require("../../../assets/images/features/patient-monitoring-1.jpg")}
                alt=""
                className="w-4/5 h-full p-4 bg-color-white rounded-[25px] shadow-lg opacity-90"
              />
            </div>
          </div>
        ) : activeFeature === 3 ? (
          <div className="w-full grid grid-cols-3 gap-10">
            <div className="flex flex-col justify-center items-start gap-4 col-span-1">
              <h1 className="text-2xl font-bold text-color-main">
                Finansal Bilgiler
              </h1>
              <h1 className="text-lg font-bold text-color-dark-primary">
                Danışanınız ile yaptığınız tüm işlemleri hizmet girişi olarak
                kayıt altına ala- bilirsiniz. Hizmetlere bağlı olarak oluşacak
                finansal bilgiler üzerinden fatura kesimlerini ve ödeme
                alımlarını gerçekleştirebilirsiniz.
              </h1>
              <p className="text-color-dark-primary opacity-80">
                Danışan finansal takibi ile yapılan ödemeleri kayıt altına
                alabilirsiniz. Ayrıca faturalarınızı Megaverse üzerinen
                kolaylıkla yazdırabilirsiniz.
              </p>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <img
                src={require("../../../assets/images/features/financial-information-1.jpg")}
                alt=""
                className="w-4/5 h-full p-4 bg-color-white rounded-[25px] shadow-lg opacity-90"
              />
            </div>
          </div>
        ) : activeFeature === 4 ? (
          <div className="w-full grid grid-cols-3 gap-10">
            <div className="flex flex-col justify-center items-start gap-4 col-span-1">
              <h1 className="text-2xl font-bold text-color-main">
                Ölçüm Takip
              </h1>
              <h1 className="text-lg font-bold text-color-dark-primary">
                Hastalarınızın Boy, kilo, adım, tansiyon, ateş, alınan kalori
                gibi takip etmek isteyeceğiz tüm bilgileri tarih bazlı kayıt
                altına alabilir, bu bilgileri grafik üzerinde
                görüntüleyebilirsiniz
              </h1>
              <p className="text-color-dark-primary opacity-80">
                Hasta Mobil Takip Uygulaması sayesinde hastalarınız ölçüm
                bilgilerini kayıt altına alabilir ve Megaverse'e entegre olarak
                sizin ile paylaşabilir.
              </p>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <img
                src={require("../../../assets/images/features/measure-follow-2.jpg")}
                alt=""
                className="w-4/5 h-full p-4 bg-color-white rounded-[25px] shadow-lg opacity-90"
              />
            </div>
          </div>
        ) : activeFeature === 5 ? (
          <div className="w-full grid grid-cols-3 gap-10">
            <div className="flex flex-col justify-center items-start gap-4 col-span-1">
              <h1 className="text-2xl font-bold text-color-main">Raporlama</h1>
              <h1 className="text-lg font-bold text-color-dark-primary">
                Kliniğinizde tüm verileri analiz edebileceğiniz raporlar sizin
                için hazır olarak gelmektedir. Dilerseniz grafik, dilerseniz
                liste raporlar alabilir, bunlar üzerinde revizyonlar
                yapabilirsiniz.
              </h1>
              <p className="text-color-dark-primary opacity-80">
                Yöneticiler için oluşturulmuş Dashboard modülü ile tek bakışta
                veri analizlerini canlı olarak görebilirsiniz.
              </p>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <img
                src={require("../../../assets/images/features/reporting-1.jpg")}
                alt=""
                className="w-4/5 h-full p-4 bg-color-white rounded-[25px] shadow-lg opacity-90"
              />
            </div>
          </div>
        ) : activeFeature === 6 ? (
          <div className="w-full grid grid-cols-3 gap-10">
            <div className="flex flex-col justify-center items-start gap-4 col-span-1">
              <h1 className="text-2xl font-bold text-color-main">
                Döküman Yönetimi
              </h1>
              <h1 className="text-lg font-bold text-color-dark-primary">
                Kişisel gelişim merkeziniz ve danışanlarınız için tüm
                dokümanlarınızı Megaverse toplayabilirsiniz.
              </h1>
              <p className="text-color-dark-primary opacity-80">
                Sürükle-bırak veya kameradan fotograf çekme yöntemi ile
                kolaylıkla yüklenebilen dokü- manlar, kişisel danışan dosyası
                ile eşleştirilmektedir. Böylelikle bir danışan dosyası
                içerisinde eklenmiş dokümanlara rahatlıkla ulaşabilirsiniz.
              </p>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <img
                src={require("../../../assets/images/features/document-management-1.jpg")}
                alt=""
                className="w-4/5 h-full p-4 bg-color-white rounded-[25px] shadow-lg opacity-90"
              />
            </div>
          </div>
        ) : (
          <div className="w-full grid grid-cols-3 gap-10">
            <div className="flex flex-col justify-center items-start gap-4 col-span-1">
              <h1 className="text-2xl font-bold text-color-main">
                Randevu Yönetimi
              </h1>
              <h1 className="text-lg font-bold text-color-dark-primary">
                Danışan takviminiz ve seans sürelerinize göre randevularınızı
                kolaylıkla yönetebilirsiniz.
              </h1>
              <p className="text-color-dark-primary opacity-80">
                Megaverse randevu modülünüze entegre olarak hastalarınız web
                portalınızdan kolaylıkla randevu alabilir, sistem tercihlerinize
                göre hastalarınıza randevu hatırlatmalarını SMS veya Mail ile
                yapabilirsiniz.
              </p>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <img
                src={require("../../../assets/images/features/appointment-management-1.jpg")}
                alt=""
                className="w-4/5 h-full p-4 bg-color-white rounded-[25px] shadow-lg opacity-90"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

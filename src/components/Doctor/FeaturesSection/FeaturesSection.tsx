import { motion } from "framer-motion";
import { useState } from "react";
import { ImSearch } from "react-icons/im";
import { IoIosPeople } from "react-icons/io";
import { IoFolder, IoTicket } from "react-icons/io5";
import { RiCalendarCheckFill } from "react-icons/ri";
import { TbReport, TbReportAnalytics } from "react-icons/tb";
import { TfiAgenda } from "react-icons/tfi";

type Props = {};

export default function FeaturesSection({}: Props) {
  const [activeFeature, setActiveFeature] = useState(0);
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-12 bg-color-white-secondary py-20 px-10 lg:px-0">
      <div className="flex w-full items-start justify-start lg:w-2/3">
        <div className="gap-21 flex flex-col items-start justify-start">
          <h1 className="text-2xl font-bold text-color-dark-primary">
            Öne Çıkan Özelliklerimiz
          </h1>
          <p className="text-color-dark-primary opacity-70">
            Klinik yönetimi ve danışan takibi için ihtiyaç duyacağınızdan
            fazlası.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-row items-start justify-start gap-4 lg:w-2/3 lg:flex-col lg:gap-8">
        <ul className="flex flex-col items-start justify-start gap-6 border-r-[1px] border-color-dark-primary border-opacity-10 lg:hidden">
          <li
            className="relative cursor-pointer pr-4"
            onClick={() => setActiveFeature(0)}
          >
            <RiCalendarCheckFill className="text-[28px] text-color-main transition-all duration-300 group-hover:scale-110" />
            {activeFeature === 0 ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="absolute -right-[3px] top-0 w-[3px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -right-[3px] rounded-full"></div>
            )}
          </li>
          <li
            className="relative cursor-pointer pr-4"
            onClick={() => setActiveFeature(1)}
          >
            <div className="relative">
              <TfiAgenda className="text-[28px] text-color-main transition-all duration-500 group-hover:scale-110" />
              <IoTicket className="absolute bottom-[70%] left-[70%] text-[16px] text-color-warning-primary" />
            </div>
            {activeFeature === 1 ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="absolute -right-[3px] top-0 w-[3px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -right-[3px] rounded-full"></div>
            )}
          </li>
          <li
            className="relative cursor-pointer pr-4"
            onClick={() => setActiveFeature(2)}
          >
            <div className="relative">
              <ImSearch className="text-[28px] text-color-main transition-all duration-500 group-hover:scale-110" />
            </div>
            {activeFeature === 2 ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="absolute -right-[3px] top-0 w-[3px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -right-[3px] rounded-full"></div>
            )}
          </li>
          <li
            className="relative cursor-pointer pr-4"
            onClick={() => setActiveFeature(3)}
          >
            <div className="relative">
              <TbReportAnalytics className="text-[28px] text-color-main transition-all duration-500 group-hover:scale-110" />
              <IoTicket className="absolute bottom-[70%] left-[70%] text-[16px] text-color-warning-primary" />
            </div>
            {activeFeature === 3 ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="absolute -right-[3px] top-0 w-[3px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -right-[3px] rounded-full"></div>
            )}
          </li>
          <li
            className="relative cursor-pointer pr-4"
            onClick={() => setActiveFeature(5)}
          >
            <div className="relative">
              <TbReport className="text-[28px] text-color-main transition-all duration-500 group-hover:scale-110" />
              <IoTicket className="absolute bottom-[70%] left-[70%] text-[16px] text-color-warning-primary" />
            </div>
            {activeFeature === 5 ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="absolute -right-[3px] top-0 w-[3px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -right-[3px] rounded-full"></div>
            )}
          </li>
          <li
            className="relative cursor-pointer pr-4"
            onClick={() => setActiveFeature(6)}
          >
            <div className="relative">
              <IoFolder className="text-[28px] text-color-main transition-all duration-500 group-hover:scale-110" />
            </div>
            {activeFeature === 6 ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "100%" }}
                transition={{
                  ease: "backInOut",
                  duration: 0.3,
                  reapat: 1,
                }}
                className="absolute -right-[3px] top-0 w-[3px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -right-[3px] rounded-full"></div>
            )}
          </li>
        </ul>
        <div className="relative hidden w-full items-start justify-between gap-y-4 border-b-[1px] border-color-dark-primary border-opacity-10 lg:flex">
          <div
            className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-6 hover:cursor-pointer"
            onClick={() => setActiveFeature(0)}
          >
            <div className="rounded-[25px] bg-color-white p-6 shadow-lg">
              <RiCalendarCheckFill className="text-[48px] text-color-main transition-all duration-300 group-hover:scale-110" />
            </div>
            <h1
              className={`text-center text-base font-bold text-color-dark-primary ${
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
                className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
            )}
          </div>

          <div
            className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-6 hover:cursor-pointer"
            onClick={() => setActiveFeature(1)}
          >
            <div className="relative rounded-[25px] bg-color-white p-6 shadow-lg">
              <TfiAgenda className="text-[48px] text-color-main transition-all duration-500 group-hover:scale-110" />
              <IoTicket className="absolute bottom-[80%] left-[80%] text-[24px] text-color-warning-primary" />
            </div>
            <h1
              className={`text-center text-base font-bold text-color-dark-primary ${
                activeFeature === 1
                  ? "opacity-80"
                  : "opacity-50 transition-all duration-300"
              }`}
            >
              Ajanda ve Notlar
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
                className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
            )}
          </div>

          <div
            className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-6 hover:cursor-pointer"
            onClick={() => setActiveFeature(2)}
          >
            <div className="rounded-[25px] bg-color-white p-6 shadow-lg">
              <ImSearch className="text-[48px] text-color-main transition-all duration-500 group-hover:scale-110" />
            </div>
            <h1
              className={`text-center text-base font-bold text-color-dark-primary ${
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
                className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
            )}
          </div>

          <div
            className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-6 hover:cursor-pointer"
            onClick={() => setActiveFeature(3)}
          >
            <div className="relative rounded-[25px] bg-color-white p-6 shadow-lg">
              <TbReportAnalytics className="text-[48px] text-color-main transition-all duration-500 group-hover:scale-110" />
              <IoTicket className="absolute bottom-[80%] left-[80%] text-[24px] text-color-warning-primary" />
            </div>
            <h1
              className={`text-center text-base font-bold text-color-dark-primary ${
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
                className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
            )}
          </div>

          <div
            className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-6 hover:cursor-pointer"
            onClick={() => setActiveFeature(4)}
          >
            <div className="relative rounded-[25px] bg-color-white p-6 shadow-lg">
              <IoIosPeople className="text-[48px] text-color-main transition-all duration-500 group-hover:scale-110" />
              <IoTicket className="absolute bottom-[80%] left-[80%] text-[24px] text-color-warning-primary" />
            </div>
            <h1
              className={`text-center text-base font-bold text-color-dark-primary ${
                activeFeature === 4
                  ? "opacity-80"
                  : "opacity-50 transition-all duration-300"
              }`}
            >
              Personel Yönetimi
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
                className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
            )}
          </div>

          <div
            className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-6 hover:cursor-pointer"
            onClick={() => setActiveFeature(5)}
          >
            <div className="relative rounded-[25px] bg-color-white p-6 shadow-lg">
              <TbReport className="text-[48px] text-color-main transition-all duration-500 group-hover:scale-110" />
              <IoTicket className="absolute bottom-[80%] left-[80%] text-[24px] text-color-warning-primary" />
            </div>
            <h1
              className={`text-center text-base font-bold text-color-dark-primary ${
                activeFeature === 5
                  ? "opacity-80"
                  : "opacity-50 transition-all duration-300"
              }`}
            >
              Raporlama / Analiz
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
                className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
            )}
          </div>

          <div
            className="group relative flex flex-col items-center justify-center gap-2 px-2 pb-6 hover:cursor-pointer"
            onClick={() => setActiveFeature(6)}
          >
            <div className="rounded-[25px] bg-color-white p-6 shadow-lg">
              <IoFolder className="text-[48px] text-color-main transition-all duration-500 group-hover:scale-110" />
            </div>
            <h1
              className={`text-center text-base font-bold text-color-dark-primary ${
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
                className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full bg-color-main"
              ></motion.div>
            ) : (
              <div className="absolute -bottom-[3px] h-[5px] w-[200px] rounded-full"></div>
            )}
          </div>
        </div>
        {activeFeature === 0 ? (
          <div className="flex w-full grid-cols-3 flex-col items-start justify-start gap-4 xl:grid xl:gap-0">
            <div className="col-span-1 flex flex-col items-start justify-start gap-4">
              <h1 className="text-2xl font-bold text-color-main">
                Randevu Yönetimi
              </h1>
              <h1 className="text-lg font-bold text-color-dark-primary">
                Uzman çalışma takviminize ve muayene sürelerinize göre
                randevularınızı kolaylıkla yönetebilirsiniz.
              </h1>
              <p className="text-color-dark-primary opacity-80">
                Megaverse randevu modülünüze entegre olarak hastalarınız web
                portalınızdan kolaylıkla randevu alabilir, sistem tercihlerinize
                göre hastalarınıza randevu hatırlatmalarını SMS veya Mail ile
                yapabilirsiniz.
              </p>
            </div>
            <div className="col-span-2 hidden items-center justify-center lg:flex">
              <img
                src={require("../../../assets/images/randevu_yonetimi.png")}
                alt=""
                className="w-full rounded-[25px]  bg-color-white p-4 opacity-90 shadow-lg xl:w-4/5"
              />
            </div>
          </div>
        ) : activeFeature === 1 ? (
          <div className="flex w-full grid-cols-3 flex-col items-start justify-start gap-4 xl:grid xl:gap-0">
            <div className="col-span-1 flex flex-col items-start justify-start gap-4">
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-2xl font-bold text-color-main">
                  Ajanda ve Notlar
                </h1>
                <h1 className="text-sm font-bold text-color-dark-primary text-opacity-50">
                  (yakında)
                </h1>
              </div>
              {/* <h1 className="text-lg font-bold text-color-dark-primary">
                Hastalar için medikal özgeçmiş ve muayene bilgilerini kolaylıkla
                kayıt altına alabilir, geçmiş bulgulara birkaç tıklama ile
                ulaşabilirsiniz.
              </h1> */}
              <p className="text-lg text-color-dark-primary opacity-80">
                Her şeyin dijitale yöneldiği günümüzde defter tarih olmak üzere,
                siz de güvenle ajandanızı, merkez notlarınızı, danışan
                notlarınızı ve her şeyi veri tabanımıza kaydederek hem güvende
                tutun hem de gözden kaçırmayın!
              </p>
            </div>
            <div className="col-span-2 hidden items-center justify-center lg:flex">
              <img
                src={require("../../../assets/images/no_feature.png")}
                alt=""
                className="w-full rounded-[25px] bg-color-white p-4 opacity-90 shadow-lg xl:w-4/5"
              />
            </div>
          </div>
        ) : activeFeature === 2 ? (
          <div className="flex w-full grid-cols-3 flex-col items-start justify-start gap-4 xl:grid xl:gap-0">
            <div className="col-span-1 flex flex-col items-start justify-start gap-4">
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
            <div className="col-span-2 hidden items-center justify-center lg:flex">
              <img
                src={require("../../../assets/images/danisan_takibi.png")}
                alt=""
                className="w-full rounded-[25px]  bg-color-white p-4 opacity-90 shadow-lg xl:w-4/5"
              />
            </div>
          </div>
        ) : activeFeature === 3 ? (
          <div className="flex w-full grid-cols-3 flex-col items-start justify-start gap-4 xl:grid xl:gap-0">
            <div className="col-span-1 flex flex-col items-start justify-start gap-4">
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-2xl font-bold text-color-main">
                  Finansal Bilgiler
                </h1>
                <h1 className="text-sm font-bold text-color-dark-primary text-opacity-50">
                  (yakında)
                </h1>
              </div>
              <h1 className="text-lg font-bold text-color-dark-primary">
                Danışanınız ile yaptığınız tüm işlemleri hizmet girişi olarak
                kayıt altına alabilirsiniz. Hizmetlere bağlı olarak oluşacak
                finansal bilgiler üzerinden fatura kesimlerini ve ödeme
                alımlarını gerçekleştirebilirsiniz.
              </h1>
              <p className="text-color-dark-primary opacity-80">
                Danışan finansal takibi ile yapılan ödemeleri kayıt altına
                alabilirsiniz. Ayrıca faturalarınızı Megaverse üzerinen
                kolaylıkla yazdırabilirsiniz.
              </p>
            </div>
            <div className="col-span-2 hidden items-center justify-center lg:flex">
              <img
                src={require("../../../assets/images/no_feature.png")}
                alt=""
                className="w-full rounded-[25px]  bg-color-white p-4 opacity-90 shadow-lg xl:w-4/5"
              />
            </div>
          </div>
        ) : activeFeature === 4 ? (
          <div className="flex w-full grid-cols-3 flex-col items-start justify-start gap-4 xl:grid xl:gap-0">
            <div className="col-span-1 flex flex-col items-start justify-start gap-4">
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-2xl font-bold text-color-main">
                  Personel Yönetimi
                </h1>
                <h1 className="text-sm font-bold text-color-dark-primary text-opacity-50">
                  (yakında)
                </h1>
              </div>
              {/* <h1 className="text-lg font-bold text-color-dark-primary">
                Hastalarınızın Boy, kilo, adım, tansiyon, ateş, alınan kalori
                gibi takip etmek isteyeceğiz tüm bilgileri tarih bazlı kayıt
                altına alabilir, bu bilgileri grafik üzerinde
                görüntüleyebilirsiniz
              </h1> */}
              <p className="text-lg text-color-dark-primary opacity-80">
                Birden fazla koç ile birlikte hizmet veren merkezlerde
                danışmanların randevu takibini anlık kayıt altına alarak
                tamamlanan ve iptal edilen görüşmeleri takip edebilir,
                merkezinizin muhasebesini, maaş ödeme ve izinleri kayıt altında
                tutabilirsiniz.
              </p>
            </div>
            <div className="col-span-2 hidden items-center justify-center lg:flex">
              <img
                src={require("../../../assets/images/no_feature.png")}
                alt=""
                className="w-full rounded-[25px]  bg-color-white p-4 opacity-90 shadow-lg xl:w-4/5"
              />
            </div>
          </div>
        ) : activeFeature === 5 ? (
          <div className="flex w-full grid-cols-3 flex-col items-start justify-start gap-4 xl:grid xl:gap-0">
            <div className="col-span-1 flex flex-col items-start justify-start gap-4">
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-2xl font-bold text-color-main">
                  Raporlama / Analiz
                </h1>
                <h1 className="text-sm font-bold text-color-dark-primary text-opacity-50">
                  (yakında)
                </h1>
              </div>
              {/* <h1 className="text-lg font-bold text-color-dark-primary">
                Kliniğinizde tüm verileri analiz edebileceğiniz raporlar sizin
                için hazır olarak gelmektedir. Dilerseniz grafik, dilerseniz
                liste raporlar alabilir, bunlar üzerinde revizyonlar
                yapabilirsiniz.
              </h1> */}
              <p className="text-lg text-color-dark-primary opacity-80">
                Merkezinizde gerçekleşen tüm işlem ve hareketleri görsel
                grafikler ve farklı filtrelerle raporlaştırabilirsiniz, tüm
                koçlarınız için ayrı ayrı raporlar oluşturabilirsiniz. Tüm
                bilgileri gözünüzün önünde bulundurun ve fiziksel kopyalarını
                çıkartın. Tarih aralıkları belirleyerek analizlerinizi
                şekillendirin.
              </p>
            </div>
            <div className="col-span-2 hidden items-center justify-center lg:flex">
              <img
                src={require("../../../assets/images/no_feature.png")}
                alt=""
                className="w-full rounded-[25px]  bg-color-white p-4 opacity-90 shadow-lg xl:w-4/5"
              />
            </div>
          </div>
        ) : activeFeature === 6 ? (
          <div className="flex w-full grid-cols-3 flex-col items-start justify-start gap-4 xl:grid xl:gap-0">
            <div className="col-span-1 flex flex-col items-start justify-start gap-4">
              <h1 className="text-2xl font-bold text-color-main">
                Döküman Yönetimi
              </h1>
              <h1 className="text-lg font-bold text-color-dark-primary">
                Kişisel gelişim merkeziniz ve danışanlarınız için tüm
                dokümanlarınızı Megaverse toplayabilirsiniz.
              </h1>
              <p className="text-color-dark-primary opacity-80">
                Sürükle-bırak veya kameradan fotograf çekme yöntemi ile
                kolaylıkla yüklenebilen dökümanlar, kişisel danışan dosyası ile
                eşleştirilmektedir. Böylelikle bir danışan dosyası içerisinde
                eklenmiş dokümanlara rahatlıkla ulaşabilirsiniz.
              </p>
            </div>
            <div className="col-span-2 hidden items-center justify-center lg:flex">
              <img
                src={require("../../../assets/images/dokuman_yonetimi.png")}
                alt=""
                className="w-full rounded-[25px]  bg-color-white p-4 opacity-90 shadow-lg xl:w-4/5"
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full grid-cols-3 flex-col items-start justify-start gap-4 xl:grid xl:gap-0">
            <div className="col-span-1 flex flex-col items-start justify-start gap-4">
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
            <div className="col-span-2 hidden items-center justify-center lg:flex">
              <img
                src={require("../../../assets/images/randevu_yonetimi.png")}
                alt=""
                className="w-full rounded-[25px]  bg-color-white p-4 opacity-90 shadow-lg xl:w-4/5"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

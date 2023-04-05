import { motion } from "framer-motion";
import CountUp from "react-countup";
import { IoIosPerson } from "react-icons/io";

type Props = {};

export default function PromotionSection({}: Props) {
  return (
    <div className="flex w-full items-center justify-center bg-doctor-color-main bg-opacity-50">
      <div className="relative flex w-full grid-cols-2 gap-10 py-20 px-10 lg:grid lg:py-0 xl:w-3/4 xl:px-0">
        <div className="z-0 hidden lg:inline-block">
          <img src={require("../../../assets/images/people.webp")} alt="" className="h-full w-full"/>
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
        <div className="z-0 flex min-h-full w-full items-center justify-center">
          <div className="grid grid-cols-2 items-center justify-around gap-10 md:grid-cols-4 lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-[30px] bg-color-white-secondary p-7 shadow-lg">
                <img
                  src={require("../../../assets/images/uzmansec.png")}
                  alt=""
                  className="w-[48px]"
                />
              </div>
              <h1 className="text-center text-base text-color-main text-opacity-80">
               Kayıt Ol
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-[30px] bg-color-white-secondary p-7 shadow-lg">
                <img
                  src={require("../../../assets/images/doktorbul.png")}
                  alt=""
                  className="w-[48px]"
                />
              </div>
              <h1 className="text-center text-base text-color-main text-opacity-80">
              Bilgilerini Gir
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-[30px] bg-color-white-secondary p-7 shadow-lg">
                <img
                  src={require("../../../assets/images/yuzyuzerandevu.png")}
                  alt=""
                  className="w-[48px]"
                />
              </div>
              <h1 className="text-center text-base text-color-main text-opacity-80">
                Takvimini Ayarla
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-[30px] bg-color-white-secondary p-7 shadow-lg">
                <img
                  src={require("../../../assets/images/onlinegorusme.png")}
                  alt=""
                  className="w-[48px]"
                />
              </div>
              <h1 className="text-center text-base text-color-main text-opacity-80">
                Görüşmeye Başla
              </h1>
            </div>
          </div>
        </div>
        {/* <div className="z-0 flex h-full w-full items-center justify-center">
          <div className="grid grid-cols-1 content-start items-start justify-around gap-10 md:grid-cols-2">
            <div className="flex flex-col items-start justify-center gap-4">
              <div className="flex items-center justify-center gap-6">
                <div className="rounded-xl border-4 border-solid border-color-main p-2">
                  <img
                    src={require("../../../assets/images/doktorbul.png")}
                    alt=""
                    className="w-[36px]"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      ease: "backInOut",
                      duration: 0.3,
                      reapat: 1,
                    }}
                    viewport={{ once: true }}
                    className="text-xl font-bold text-color-dark-primary"
                  >
                    <CountUp end={8712} duration={1} />
                  </motion.h1>
                  <h1 className="text-color-dark-primary opacity-70">
                    Aktif Uzman
                  </h1>
                </div>
              </div>
              <h1 className="text-color-dark-primary opacity-70">
                Hizmet veren aktif uzman sayımız.
              </h1>
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
              <div className="flex items-center justify-center gap-6">
                <div className="rounded-xl border-4 border-solid border-color-main p-2">
                  <IoIosPerson className="text-[36px] text-color-main" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      ease: "backInOut",
                      duration: 0.3,
                      reapat: 1,
                    }}
                    viewport={{ once: true }}
                    className="text-xl font-bold text-color-dark-primary"
                  >
                    <CountUp end={2790270} duration={1} />
                  </motion.h1>
                  <h1 className="text-color-dark-primary opacity-70">
                    Aktif Uzman
                  </h1>
                </div>
              </div>
              <h1 className="text-color-dark-primary opacity-70">
                Her geçen gün artan danışan sayımız.
              </h1>
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
              <div className="flex items-center justify-center gap-6">
                <div className="rounded-xl border-4 border-solid border-color-main p-2">
                  <img
                    src={require("../../../assets/images/yuzyuzerandevu.png")}
                    alt=""
                    className="w-[36px]"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      ease: "backInOut",
                      duration: 0.3,
                      reapat: 1,
                    }}
                    viewport={{ once: true }}
                    className="text-xl font-bold text-color-dark-primary"
                  >
                    <CountUp end={2270127} duration={1} />
                  </motion.h1>
                  <h1 className="text-color-dark-primary opacity-70">
                    Planlı Randevu
                  </h1>
                </div>
              </div>
              <h1 className="text-color-dark-primary opacity-70">
                Gerçekleşecek görüşme sayısı.
              </h1>
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
              <div className="flex items-center justify-center gap-6">
                <div className="rounded-xl border-4 border-solid border-color-main p-2">
                  <img
                    src={require("../../../assets/images/onlinegorusme.png")}
                    alt=""
                    className="w-[36px]"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      ease: "backInOut",
                      duration: 0.3,
                      reapat: 1,
                    }}
                    viewport={{ once: true }}
                    className="text-xl font-bold text-color-dark-primary"
                  >
                    <CountUp end={41568} duration={1} />
                  </motion.h1>
                  <h1 className="text-color-dark-primary opacity-70">Seans</h1>
                </div>
              </div>
              <h1 className="text-color-dark-primary opacity-70">
                Şu ana kadar gerçekleştirilen seans sayısı.
              </h1>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

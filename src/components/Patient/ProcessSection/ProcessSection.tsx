import { motion } from "framer-motion";

type Props = {};

export default function ProcessSection({}: Props) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-color-white-secondary px-10 py-20 lg:px-0">
      <div className="flex w-full flex-col items-start justify-center lg:w-2/3">
        <h1 className="text-2xl font-bold text-color-dark-primary">
          Sürecimiz Nasıl İlerliyor?
        </h1>
        <p className="text-color-dark-primary opacity-70">
          Megaverse'te süreçlerimiz olabildiğince basit işliyor.
        </p>
      </div>
      <div className="relative z-10 flex w-full items-center justify-center py-20 lg:w-2/3">
        <div className="absolute hidden h-full w-full items-center justify-center md:flex">
          <img src={require("../../../assets/images/arrow.png")} alt="" />
        </div>
        <div className="z-20 flex w-full flex-col md:gap-0 gap-56 items-center justify-center md:flex-row md:justify-between">
          <div className="relative flex flex-col items-center justify-center gap-8">
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-[50px] bg-color-white p-12 shadow-xl">
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  ease: "backInOut",
                  duration: 0.5,
                  reapat: 1,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
                src={require("../../../assets/images/icons/rating.png")}
                className="w-[50px]"
                alt=""
              />
            </div>
            <div className="absolute top-full flex w-[150%] flex-col items-center justify-center gap-2 py-8">
              <h1 className="text-center text-xl font-bold text-color-dark-primary opacity-80">
                Sertifikalı Uzman Ara
              </h1>
              <p className="text-center text-color-dark-primary opacity-80">
                İhtiyacınıza uygun sertifikalı uzmanlarımızdan birini seçin
              </p>
            </div>
          </div>
          <div className="relative flex flex-col items-center justify-center gap-8">
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-[50px] bg-color-white p-12 shadow-xl">
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  ease: "backInOut",
                  duration: 0.6,
                  reapat: 1,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
                src={require("../../../assets/images/medical-assistance.png")}
                className="w-[50px]"
                alt=""
              />
            </div>
            <div className="absolute top-full flex w-[150%] flex-col items-center justify-center gap-2 py-8">
              <h1 className="text-center text-xl font-bold text-color-dark-primary opacity-80">
                Uzman Profilini Görüntüle
              </h1>
              <p className="text-center text-color-dark-primary opacity-80">
                Seçtiğiniz uzmanın randevu saatlerini görüntüleyin ve sizin için
                uygun randevuyu bulun
              </p>
            </div>
          </div>
          <div className="relative flex flex-col items-center justify-center gap-8">
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-[50px] bg-color-white p-12 shadow-xl">
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  ease: "backInOut",
                  duration: 0.7,
                  reapat: 1,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
                src={require("../../../assets/images/meeting.png")}
                className="w-[50px]"
                alt=""
              />
            </div>
            <div className="absolute top-full flex w-[150%] flex-col items-center justify-center gap-2 py-8">
              <h1 className="text-center text-xl font-bold text-color-dark-primary opacity-80">
                Randevu Al
              </h1>
              <p className="text-center text-color-dark-primary opacity-80">
                Randevunuzu aldıktan sonrasında size gelen bildirimle
                uzmanınızın belir- lenen randevu saati için iletişim bilgilerini
                görün
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

type Props = {};

export default function Accordion({}: Props) {
  const [QA, setQA] = useState(0);
  return (
    <div className="col-span-2 flex flex-col justify-center items-center gap-4">
      <div
        onClick={() => setQA(0)}
        className="w-full hover:cursor-pointer flex justify-center items-start border-b-[1px] pb-4 border-solid border-color-dark-primary border-opacity-10"
      >
        <div className="w-full flex flex-col justify-center items-start gap-6">
          <h1 className="text-color-dark-primary text-lg">Megaverse nedir?</h1>
          <div className="w-full">
            {QA === 0 ? (
              <p className="w-full text-color-dark-primary opacity-70">
                Megaverse Uluslararası Kişisel Gelişim Portalı, Bülent
                Gardiyanoğlu'nun bireysel olarak geliştirdiği, 10 yıllık emeği
                barındıran bir çalışma yöntemidir. Danışan ve danışmanları bir
                araya getiren dünyanın ilk ve tek kişisel gelişim portalıdır.
              </p>
            ) : (
              <p className="w-full text-color-dark-primary opacity-70"></p>
            )}
          </div>
        </div>
        <div
          className={`p-1 rounded-full transition-all duration-500 ${
            QA === 0 ? "rotate-180 bg-color-main" : "rotate-0 bg-color-white"
          }`}
        >
          <IoMdArrowDropdown
            className={`${
              QA === 0 ? "text-color-white" : "text-color-main"
            } text-[30px] transition-all duration-500`}
          />
        </div>
      </div>
      <div
        onClick={() => setQA(1)}
        className="w-full hover:cursor-pointer flex justify-center items-start border-b-[1px] pb-4 border-solid border-color-dark-primary border-opacity-10"
      >
        <div className="w-full flex flex-col justify-center items-start gap-6">
          <h1 className="text-color-dark-primary text-lg">
            Megaverse Uluslararası Kişisel Gelişim Portalı Projesinin amacı
            nedir?
          </h1>
          <div className="w-full">
            {QA === 1 ? (
              <p className="w-full text-color-dark-primary opacity-70">
                Geçmiş olduğumuz pandemi ve kapanma dönemiyle beraber birçok
                etkinlik ve toplantı dijital tabanlı olmaya başladı; iyileşmenin
                yeri ya da zamanı olmaz, iyileşmek bir karardır. Megaverse
                Uluslararası Kişisel Gelişim Portalı ise her zaman ve her yerde
                iy- ileşmeyi, sağlığı amaçlamaktadır.
              </p>
            ) : (
              <p className="w-full text-color-dark-primary opacity-70"></p>
            )}
          </div>
          {/* <p
            className={`${
              QA === 0 ? "scale-y-100" : "scale-y-0"
            } transition-all duration-300 text-color-dark-primary opacity-70`}
          >
            Bulut Klinik kullanımının ilk 7 günü deneme süresidir, ve
            ücretsizdir. Deneme süresi içerisinde diğer tüm kullanıcılarımız
            gibi destek hizmetlerinden faydalanabilir, uygulamayı dilediğiniz
            gibi kullanabilirsiniz.
          </p> */}
        </div>
        <div
          className={`p-1 rounded-full transition-all duration-500 ${
            QA === 1 ? "rotate-180 bg-color-main" : "rotate-0 bg-color-white"
          }`}
        >
          <IoMdArrowDropdown
            className={`${
              QA === 1 ? "text-color-white" : "text-color-main"
            } text-[30px] transition-all duration-500`}
          />
        </div>
      </div>
      <div
        onClick={() => setQA(2)}
        className="w-full hover:cursor-pointer flex justify-center items-start border-b-[1px] pb-4 border-solid border-color-dark-primary border-opacity-10"
      >
        <div className="w-full flex flex-col justify-center items-start gap-6">
          <h1 className="text-color-dark-primary text-lg">
            Megaverse'e nasıl katılabilirsiniz?
          </h1>
          <div className="w-full">
            {QA === 2 ? (
              <p className="w-full text-color-dark-primary opacity-70">
                Sizlerin ihtiyaçlarına uygun olarak hazırladığımız 5 farklı
                model ile katılabilirsiniz. Daha detaylı bilgi için tıklayınız.
              </p>
            ) : (
              <p className="w-full text-color-dark-primary opacity-70"></p>
            )}
          </div>
          {/* <p
            className={`${
              QA === 0 ? "scale-y-100" : "scale-y-0"
            } transition-all duration-300 text-color-dark-primary opacity-70`}
          >
            Bulut Klinik kullanımının ilk 7 günü deneme süresidir, ve
            ücretsizdir. Deneme süresi içerisinde diğer tüm kullanıcılarımız
            gibi destek hizmetlerinden faydalanabilir, uygulamayı dilediğiniz
            gibi kullanabilirsiniz.
          </p> */}
        </div>
        <div
          className={`p-1 rounded-full transition-all duration-500 ${
            QA === 2 ? "rotate-180 bg-color-main" : "rotate-0 bg-color-white"
          }`}
        >
          <IoMdArrowDropdown
            className={`${
              QA === 2 ? "text-color-white" : "text-color-main"
            } text-[30px] transition-all duration-500`}
          />
        </div>
      </div>
      <div
        onClick={() => setQA(3)}
        className="w-full hover:cursor-pointer flex justify-center items-start border-b-[1px] pb-4 border-solid border-color-dark-primary border-opacity-10"
      >
        <div className="w-full flex flex-col justify-center items-start gap-6">
          <h1 className="text-color-dark-primary text-lg">
            İhtiyaç halinde nasıl teknik destek alırım?
          </h1>
          <div className="w-full">
            {QA === 3 ? (
              <p className="w-full text-color-dark-primary opacity-70">
                Danışmanlık ekibimiz Megaverse'ü kullandığınız süre boyunca
                sınırız ve ücretsiz destek ile yanınızdadır.
                destek@megaverse.com adresine e-posta göndererek, uygulamanın
                içinden (sağ üst köşedeki kullanıcı menüsü altında yer al
                “Destek Al” bölümünden) canlı mesajlaşma ile veya hafta içi
                09.30 - 17.00 saatleri arası 0850 711 0 258 no’lu telefonlar-
                dan bize ulaşabilirsiniz.
              </p>
            ) : (
              <p className="w-full text-color-dark-primary opacity-70"></p>
            )}
          </div>
          {/* <p
            className={`${
              QA === 0 ? "scale-y-100" : "scale-y-0"
            } transition-all duration-300 text-color-dark-primary opacity-70`}
          >
            Bulut Klinik kullanımının ilk 7 günü deneme süresidir, ve
            ücretsizdir. Deneme süresi içerisinde diğer tüm kullanıcılarımız
            gibi destek hizmetlerinden faydalanabilir, uygulamayı dilediğiniz
            gibi kullanabilirsiniz.
          </p> */}
        </div>
        <div
          className={`p-1 rounded-full transition-all duration-500 ${
            QA === 3 ? "rotate-180 bg-color-main" : "rotate-0 bg-color-white"
          }`}
        >
          <IoMdArrowDropdown
            className={`${
              QA === 3 ? "text-color-white" : "text-color-main"
            } text-[30px] transition-all duration-500`}
          />
        </div>
      </div>
      
    </div>
  );
}

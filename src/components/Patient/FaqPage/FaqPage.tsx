type Props = {};

export default function FaqPage({}: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-color-white-secondary py-20 pt-[130px]">
      <div className="flex min-h-[25vh] w-full items-start justify-center bg-color-white-secondary">
        <div className="flex w-2/3 flex-col items-start justify-start gap-10">
          <h1 className="text-2xl font-bold text-color-dark-primary">
            Sık Sorulan Sorular
          </h1>
          <div className="flex flex-col items-start justify-start gap-4">
            <div className="flex flex-col items-start justify-start gap-2">
              <div>
                <h1 className="text-lg text-color-dark-primary">
                  Megaverse nedir?
                </h1>
                <p className="w-full text-color-dark-primary opacity-70">
                  Megaverse Uluslararası Kişisel Gelişim Portalı, Bülent
                  Gardiyanoğlu'nun bireysel olarak geliştirdiği, 10 yıllık emeği
                  barındıran bir çalışma yöntemidir. Danışan ve danışmanları bir
                  araya getiren dünyanın ilk ve tek kişisel gelişim portalıdır.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <div>
                <h1 className="text-lg text-color-dark-primary">
                  Megaverse Uluslararası Kişisel Gelişim Portalı Projesinin
                  amacı nedir?
                </h1>
                <p className="w-full text-color-dark-primary opacity-70">
                  Geçmiş olduğumuz pandemi ve kapanma dönemiyle beraber birçok
                  etkinlik ve toplantı dijital tabanlı olmaya başladı;
                  iyileşmenin yeri ya da zamanı olmaz, iyileşmek bir karardır.
                  Megaverse Uluslararası Kişisel Gelişim Portalı ise her zaman
                  ve her yerde iyileşmeyi, sağlığı amaçlamaktadır.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <div>
                <h1 className="text-lg text-color-dark-primary">
                  Megaverse'e nasıl katılabilirsiniz?
                </h1>
                <p className="w-full text-color-dark-primary opacity-70">
                  Sizlerin ihtiyaçlarına uygun olarak hazırladığımız 5 farklı
                  model ile katılabilirsiniz. Daha detaylı bilgi için
                  tıklayınız.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <div>
                <h1 className="text-lg text-color-dark-primary">
                  İhtiyaç halinde nasıl teknik destek alırım?
                </h1>
                <p className="w-full text-color-dark-primary opacity-70">
                  Danışmanlık ekibimiz Megaverse'ü kullandığınız süre boyunca
                  sınırız ve ücretsiz destek ile yanınızdadır.
                  destek@megaverse.com adresine e-posta göndererek veya hafta
                  içi 09.30 - 17.00 saatleri arası 0850 711 0 258 no’lu
                  telefonlardan bize ulaşabilirsiniz.
                  {/* , uygulamanın
                  içinden (sağ üst köşedeki kullanıcı menüsü altında yer al
                  “Destek Al” bölümünden) canlı mesajlaşma ile */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

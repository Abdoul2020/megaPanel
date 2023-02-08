
type Props = {};

export default function AboutPage({}: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-color-white-secondary py-20 pt-[170px]">
      <div className="flex min-h-[25vh] w-full items-start justify-center bg-color-white-secondary">
        <div className="flex w-2/3 flex-col items-start justify-start gap-10">
          <h1 className="text-2xl font-bold text-color-dark-primary">
            Megaverse Nedir?
          </h1>
          <div className="flex flex-col items-start justify-start gap-2 text-color-dark-primary opacity-70">
            <p className="text-lg">
              Geçtiğimiz kısa sürede bütün dünya büyük bir sınav verdi, bu
              sınavın ise günümüzde iletişime büyük etkileri oldu; bu etkileri
              hala günümüzde devam ediyor, bu sınavın adı pandemiydi. Pandemi
              döneminin başlangıcıyla fiziksel olarak sosyal ortam- lardan
              koparılan toplum seminerlerden webinarlara, yüzyüze kahve
              sohbetlerinden görüntülü konuşmalara geçti, ruh sağlığımızında en
              az bir o kadar etkilendiği dönemde bütün dünyayı kucaklamak,
              iyileşme yolunda adım atmaya hazır her cana ulaşmayı hedefleyen
              Megaverse Projesinin temelleri bu zamanda atıldı.
            </p>
            <p className="text-lg">
              Megaverse Uluslararası Kişisel Gelişim Portalı, sertifikalı
              uzmanların, profesyonellerin, koçların sürecine yardımcı olmak
              üzere tasarlanırken danışanlar için ise kul- lanıcı dostu, kolay
              kullanımlı ama bir o kadar da fonksiyonel olması hedeflendi.
            </p>
            <p className="text-lg">
              Çünkü bölünürsek yok oluruz, bölüşürsek tok. Dünyanın dört bir
              yanından koçluk merkezlerine ve danışanlara hizmet ve bir buluşma
              platformu sağlayan Megaverse her zaman teknoloji ile kendini
              geliştirmeye açık ve iyiliğin yolunda yürümeye kararlıdır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

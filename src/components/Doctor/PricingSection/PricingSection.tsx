
type Props = {};

export default function PricingSection({}: Props) {
  return (
    <div className="py-20 w-full relative bg-color-white-secondary flex flex-col justify-center items-center gap-10">
      <div className="w-2/3 flex justify-start items-start">
        <div className="flex flex-col justify-start items-start gap-21">
          <h1 className="text-2xl text-color-dark-primary font-bold">
            Fiyatlandırma
          </h1>
          <p className="text-color-dark-primary opacity-70">
            Hizmetimizin sizlere özel kampanya fiyatları.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="p-8 rounded-[25px] shadow-lg bg-color-white flex flex-col justify-center items-center gap-6 max-w-[300px] hover:cursor-pointer">
          <div className="h-[100px] w-[100px] bg-doctor-color-main bg-opacity-30 rounded-[25px] flex justify-center items-center">
            <img
              src={require("../../../assets/images/megaverse_logo_3.png")}
              alt=""
              className="w-[50%]"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <h1 className="text-2xl font-bold text-color-main">Ücretsiz</h1>
            <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
              7 Günlük Deneme
            </h1>
          </div>
          <p className="text-color-dark-primary opacity-80 text-center">
            Kredi kartı gerekmeden ücretsiz deneyin, memnun kalırsanız abone
            olun.
          </p>
          <button className="col-span-1 py-4 px-6 flex justify-center bg-opacity-50 items-center group gap-4 bg-doctor-color-main rounded-[25px] hover:bg-opacity-100 transition-all duration-500">
            <h1 className="font-bold text-sm text-color-main group-hover:text-color-white transition-all duration-500">
              Ücretsiz Dene
            </h1>
          </button>
        </div>
        <div className="p-8 rounded-[25px] shadow-lg bg-color-white flex flex-col justify-center items-center gap-6 max-w-[300px] hover:cursor-pointer">
          <div className="h-[100px] w-[100px] bg-color-warning-primary bg-opacity-30 rounded-[25px] flex justify-center items-center">
            <img
              src={require("../../../assets/images/megaverse_logo_3.png")}
              alt=""
              className="w-[50%]"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <h1 className="text-2xl font-bold text-color-main">₺300</h1>
            <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
              1 Aylık Üyelik
            </h1>
          </div>
          <p className="text-color-dark-primary opacity-80 text-center">
            Megaverse ile tanışın. Dilediğiniz zaman daha ekonomik paketlere
            geçin.
          </p>
          <button className="col-span-1 py-4 px-6 flex justify-center bg-opacity-50 items-center group gap-4 bg-doctor-color-main rounded-[25px] hover:bg-color-warning-primary hover:bg-opacity-100 transition-all duration-500">
            <h1 className="font-bold text-sm text-color-main group-hover:text-color-white transition-all duration-500">
              Hemen Kaydol
            </h1>
          </button>
        </div>
        <div className="p-8 rounded-[25px] shadow-lg bg-color-white flex flex-col justify-center items-center gap-6 max-w-[300px] hover:cursor-pointer">
          <div className="h-[100px] w-[100px] bg-color-success-primary bg-opacity-30 rounded-[25px] flex justify-center items-center">
            <img
              src={require("../../../assets/images/megaverse_logo_3.png")}
              alt=""
              className="w-[50%]"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <h1 className="text-2xl font-bold text-color-main">₺2400</h1>
            <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
              1 Yıllık Üyelik
            </h1>
          </div>
          <p className="text-color-dark-primary opacity-80 text-center">
            Yıllık ödeme yapın. Aylık fiyata göre %30'a varan indirimden
            yararlanın.
          </p>
          <button className="col-span-1 py-4 px-6 flex justify-center bg-opacity-50 items-center group gap-4 bg-doctor-color-main rounded-[25px] hover:bg-color-success-primary hover:bg-opacity-100 transition-all duration-500">
            <h1 className="font-bold text-sm text-color-main group-hover:text-color-white transition-all duration-500">
              Hemen Kaydol
            </h1>
          </button>
        </div>
        <div className="p-8 rounded-[25px] shadow-lg bg-color-white flex flex-col justify-center items-center gap-6 max-w-[300px] hover:cursor-pointer">
          <div className="h-[100px] w-[100px] bg-doctor-color-main bg-opacity-30 rounded-[25px] flex justify-center items-center">
            <img
              src={require("../../../assets/images/megaverse_logo_3.png")}
              alt=""
              className="w-[50%]"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <h1 className="text-2xl font-bold text-color-main">Ücretsiz</h1>
            <h1 className="text-lg font-bold text-color-dark-primary opacity-80">
              Telemedicine
            </h1>
          </div>
          <p className="text-color-dark-primary opacity-80 text-center">
            Sadece telemedicine özellikleri ile kısıtlanmış versiyon.
          </p>
          <button className="col-span-1 py-4 px-6 flex justify-center bg-opacity-50 items-center group gap-4 bg-doctor-color-main rounded-[25px] hover:bg-opacity-100 transition-all duration-500">
            <h1 className="font-bold text-sm text-color-main group-hover:text-color-white transition-all duration-500">
              Hemen Kaydol
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
}

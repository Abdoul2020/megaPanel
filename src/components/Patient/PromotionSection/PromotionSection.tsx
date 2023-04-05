type Props = {};

export default function PromotionSection({}: Props) {
  return (
    <div
      className="relative flex w-full items-center justify-center bg-opacity-50"
      style={{
        background:
          "radial-gradient(circle, rgba(51,169,179,1) 0%, rgba(22,63,64,1) 0%)",
      }}
    >
      <div className="absolute h-full w-full bg-color-main opacity-80"></div>
      <div className="relative flex w-full grid-cols-2 gap-10 py-20 px-10 lg:grid lg:py-0 xl:w-3/4 xl:px-0">
        <div className="z-0 hidden lg:inline-block">
          <img src={require("../../../assets/images/people.webp")} alt="" className="w-full h-full"/>
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
              <h1 className="text-center text-base text-color-white text-opacity-80">
                Uzman Ara
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
              <h1 className="text-center text-base text-color-white text-opacity-80">
                Uzman Bul
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
              <h1 className="text-center text-base text-color-white text-opacity-80">
                Randevu Al
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
              <h1 className="text-center text-base text-color-white text-opacity-80">
                Görüşmeye Başla
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div
    //   className="relative grid w-full grid-cols-2"
    //   style={{
    //     background:
    //       "radial-gradient(circle, rgba(51,169,179,1) 0%, rgba(22,63,64,1) 0%)",
    //   }}
    // >
    //   <div className="absolute h-full w-full bg-color-main opacity-80"></div>
    //   <div className="z-20">
    //     <img src={require("../../../assets/images/people.png")} alt="" />
    //     {/* <div className="absolute -top-10 -right-16 shadow-lg bg-color-white rounded-3xl px-2 py-4 w-[150px] flex flex-col justify-center items-center gap-6">
    //       <MdQuestionAnswer className="text-color-main text-[48px]" />
    //       <div className="flex flex-col justify-center items-center">
    //         <h1 className="text-lg text-color-dark-primary font-bold">
    //           Soru Sor
    //         </h1>
    //         <h1 className="text-color-dark-primary text-center opacity-70">
    //           Uzmanlarımıza danış istediğini sor.
    //         </h1>
    //       </div>
    //     </div> */}
    //   </div>
    //   <div className="z-20 flex h-full w-full items-center justify-center">
    //     <div className="grid grid-cols-2 items-center justify-around gap-20">
    //       <div className="flex flex-col items-center justify-center gap-2">
    //         <div className="rounded-[30px] bg-color-white p-8 shadow-lg">
    //           <TbHandClick className="text-[64px] text-color-main" />
    //         </div>
    //         <h1 className="text-lg text-color-white text-opacity-80">
    //           Uzman Seç
    //         </h1>
    //       </div>
    //       <div className="flex flex-col items-center justify-center gap-2">
    //         <div className="rounded-[30px] bg-color-white p-8 shadow-lg">
    //           <GiDoctorFace className="text-[64px] text-color-main" />
    //         </div>
    //         <h1 className="text-lg text-color-white text-opacity-80">
    //           Doktor Bul
    //         </h1>
    //       </div>
    //       <div className="flex flex-col items-center justify-center gap-2">
    //         <div className="rounded-[30px] bg-color-white p-8 shadow-lg">
    //           <GiFaceToFace className="text-[64px] text-color-main" />
    //         </div>
    //         <h1 className="text-lg text-color-white text-opacity-80">
    //           Yüz yüze Randevu
    //         </h1>
    //       </div>
    //       <div className="flex flex-col items-center justify-center gap-2">
    //         <div className="rounded-[30px] bg-color-white p-8 shadow-lg">
    //           <SiGooglemeet className="text-[64px] text-color-main" />
    //         </div>
    //         <h1 className="text-lg text-color-white text-opacity-80">
    //           Online Görüşme
    //         </h1>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

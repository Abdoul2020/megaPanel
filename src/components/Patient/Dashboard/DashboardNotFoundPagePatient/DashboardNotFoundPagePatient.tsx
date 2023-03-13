
type Props = {};

export default function DashboardNotFoundPagePatient({}: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="">
          <h3 className="tracking-[3px] opacity-80">OOPS! SAYFA BULUNAMADI</h3>
        </div>
        <div className="">
          <h1 className="text-[80px] font-bold">
            <span className="text-color-main opacity-60">4</span>
            <span className="text-color-main opacity-60">0</span>
            <span className="text-color-main opacity-60">4</span>
          </h1>
        </div>
        <div className="">
          <h3 className="text-[16px] tracking-[3px]">
            ÜZGÜNÜZ, AMA İSTEDİĞİNİZ SAYFA BULUNAMADI
          </h3>
        </div>
        {/* <div className="mt-3 flex flex-col items-center justify-center gap-2">
          <h1 className="text-[16px] font-bold tracking-[3px] opacity-70">
            Ana Safaya Gidin
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Link to="/">
              <div
                className={`group z-20 flex cursor-pointer items-center justify-center gap-4 rounded-[15px] bg-color-secondary px-10 py-[18px] transition-all duration-500 hover:bg-color-white`}
              >
                <FiSearch
                  fontSize={15}
                  className="text-color-white transition-all duration-500 group-hover:text-color-secondary"
                />
                <button className="z-30">
                  <h1 className="text-sm font-normal text-color-white transition-all duration-500 group-hover:text-color-secondary">
                    Danışan
                  </h1>
                </button>
              </div>
            </Link>
            <Link to="/experts">
              <div
                className={`group z-20 flex cursor-pointer items-center justify-center gap-4 rounded-[15px] bg-doctor-color-main px-10 py-[18px] transition-all duration-500 hover:bg-color-white`}
              >
                <FaStethoscope
                  fontSize={15}
                  className="text-color-white transition-all duration-500 group-hover:text-color-secondary"
                />
                <button className="z-30">
                  <h1 className="text-sm font-normal text-color-white transition-all duration-500 group-hover:text-color-secondary">
                    Uzman
                  </h1>
                </button>
              </div>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}

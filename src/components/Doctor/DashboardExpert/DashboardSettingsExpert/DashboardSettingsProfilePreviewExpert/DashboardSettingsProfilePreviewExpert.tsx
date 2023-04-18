import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { BsCameraVideoFill, BsCheckLg, BsFillPersonFill } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { FaClinicMedical, FaMap } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { GiTreeBranch } from "react-icons/gi";
import { HiAcademicCap } from "react-icons/hi2";
import { IoMdInformationCircle } from "react-icons/io";
import { IoCopy, IoShareSocialSharp } from "react-icons/io5";
import { MdLocationPin, MdWork } from "react-icons/md";
import { SocialIcon } from "react-social-icons";
import { useAppSelector } from "../../../../../app/hooks";
import { Doctor } from "../../../../../common/types/Doctor.entity";
import CalendarLocation from "../../../../Patient/DoctorCard/CalendarLocation/CalendarLocation";
import CalendarOnline from "../../../../Patient/DoctorCard/CalendarOnline/CalendarOnline";
import {
  fetchExpert,
  fetchExpertProfilePicture,
} from "../../../../../features/doctorSlice/doctorAPI";

type Props = {};

export default function DashboardSettingsProfilePreview({}: Props) {
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );

  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const [appointmentBoxOpen, setAppointmentBoxOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const [calendarLoading, setCalenderLoading] = useState(false);

  const [referenceIdCopied, setReferenceIdCopied] = useState(false);

  const handleAppointmentBoxClose = () => {
    setAppointmentBoxOpen(false);
  };

  useEffect(() => {
    setCalenderLoading(true);
    setTimeout(() => {
      setCalenderLoading(false);
    }, 500);
  }, [online]);

  useEffect(() => {
    async function fetchData() {
      setProfileImageLoader(true);
      const authExpertDownloadProfilePictureResponse =
        await fetchExpertProfilePicture(authExpertObject?._id);
      setProfileImageLoader(true);
      const authExpertDownloadProfilePictureSuccess =
        authExpertDownloadProfilePictureResponse.success;

      if (authExpertDownloadProfilePictureSuccess) {
        const base64 = authExpertDownloadProfilePictureResponse.data.data;
        setProfileImageBase64(base64);
      } else {
        // console.log({ authExpertDownloadProfilePictureResponse });
      }
    }
    if (
      authExpertObject &&
      authExpertObject.expert_avatar_path !== "" &&
      authExpertObject.expert_avatar_path !== undefined
    ) {
      fetchData();
    }
  }, [authExpertObject]);
  const copyToClipboard = (text?: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setReferenceIdCopied(true);
      setTimeout(() => {
        setReferenceIdCopied(false);
      }, 3000);
    }
  };
  return (
    <div className="flex w-full flex-col items-center justify-center bg-color-white-fourth">
      <div className="flex w-full flex-col items-center justify-start bg-color-white-secondary">
        <div className="flex w-full items-end justify-center bg-doctor-color-main bg-opacity-50">
          <div className="flex h-full w-full flex-col items-start justify-start px-10 py-5">
            <div className="flex items-start justify-start gap-5">
              <div className="h-[150px] w-[150px] overflow-hidden rounded-[20px]">
                {profileImageBase64 ? (
                  <img
                    src={`data:image/jpeg;base64,${profileImageBase64}`}
                    alt=""
                    className="h-full w-full rounded-[20px] transition-all duration-300 hover:scale-110"
                  />
                ) : (
                  <img
                    src={require("../../../../../assets/images/doc_pp.jpg")}
                    alt=""
                    className="h-full w-full rounded-[20px]"
                  />
                )}
              </div>
              <div className="flex-col items-start justify-start gap-6">
                <div className="flex flex-wrap items-start justify-start gap-4 gap-y-0">
                  <div className="flex flex-wrap items-start justify-start gap-1 gap-y-0">
                    <h1 className="text-lg font-bold text-color-dark-primary">
                      {authExpertObject?.expert_title !== undefined
                        ? authExpertObject?.expert_title.title_title
                        : ""}
                    </h1>
                    <h1 className="text-lg text-color-dark-primary">
                      {authExpertObject?.expert_name}
                    </h1>
                    <h1 className="text-lg text-color-dark-primary">
                      {authExpertObject?.expert_surname}
                    </h1>
                  </div>
                  <div
                    className={`flex cursor-pointer items-center justify-center gap-1 ${
                      referenceIdCopied ? "opacity-100" : "opacity-30"
                    } transition-all duration-100 ease-in-out hover:opacity-80`}
                    onClick={() => copyToClipboard(authExpertObject?.expert_reference_id)}
                  >
                    <h1
                      className={`text-base font-bold uppercase ${
                        referenceIdCopied
                          ? "text-color-main"
                          : "text-color-dark-primary"
                      }`}
                    >
                      {authExpertObject?.expert_reference_id}
                    </h1>
                    {referenceIdCopied ? (
                      <BsCheckLg className="text-color-main" />
                    ) : (
                      <IoCopy className="text-color-dark-primary" />
                    )}
                  </div>
                </div>
                <ul className="flex max-w-[300px] flex-wrap items-start justify-start gap-2 gap-y-0">
                  {authExpertObject?.expert_branch.map((branch) => {
                    return (
                      <h1 className="font-bold text-color-dark-primary text-opacity-50">
                        {branch.branch_title}
                      </h1>
                    );
                  })}
                </ul>
                <div className="flex items-start justify-start gap-2">
                  <div className="flex items-center justify-center gap-1">
                    <MdLocationPin
                      className={`${
                        authExpertObject?.expert_operating_type !== 2
                          ? "text-color-main"
                          : "text-color-dark-primary"
                      } text-lg opacity-80`}
                    />
                    <h1 className="text-lg text-color-dark-primary opacity-80">
                      {authExpertObject?.expert_city ? authExpertObject?.expert_city : ""}
                    </h1>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <BsCameraVideoFill
                      className={`${
                        authExpertObject?.expert_operating_type === 2 ||
                        authExpertObject?.expert_operating_type === 0
                          ? "text-color-main"
                          : "text-color-dark-primary"
                      } text-lg opacity-80`}
                    />
                    <h1 className="text-lg text-color-dark-primary opacity-80">
                      {authExpertObject?.expert_operating_type === 2 ||
                      authExpertObject?.expert_operating_type === 0
                        ? "Online"
                        : "Yüz Yüze"}
                    </h1>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <CgSandClock className="text-lg text-color-main opacity-80" />
                    <h1 className="text-lg text-color-dark-primary opacity-80">
                      {authExpertObject?.expert_appointment_schedule.appointment_duration}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="block w-full py-5 lg:hidden">
              <button
                className="w-full rounded-[10px] bg-color-main py-2"
                onClick={() => setAppointmentBoxOpen(true)}
              >
                <h1 className="tracking-wide text-color-white">Randevu al</h1>
              </button>
            </div>
          </div>
        </div>
        <div className="flex min-h-[100vh] w-full grid-cols-5 gap-10 px-10 py-10 lg:grid">
          <div className="col-span-3 flex w-full flex-col items-start justify-start gap-10">
            <div className="flex w-full flex-col items-start justify-start gap-4">
              <h1 className="text-lg font-bold text-color-main">Özgeçmiş</h1>
              <div className="flex w-full flex-col items-start justify-start gap-10 rounded-[15px] bg-color-white p-5">
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={require("../../../../../assets/images/doktorbul.png")}
                    alt=""
                    className="w-[48px]"
                  />
                  <div className="flex flex-col items-start justify-start">
                    <h1 className="text-color-dark-primary text-opacity-50">
                      Uzman Bilgisi
                    </h1>
                    <div className="flex items-center justify-center gap-1">
                      <h1 className="text-lg font-bold text-color-dark-primary">
                        {authExpertObject?.expert_title !== undefined
                          ? authExpertObject?.expert_title.title_title
                          : ""}
                      </h1>
                      <h1 className="text-lg text-color-dark-primary">
                        {authExpertObject?.expert_name}
                      </h1>
                      <h1 className="text-lg text-color-dark-primary">
                        {authExpertObject?.expert_surname}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-2 py-5">
                    <div className="flex items-end justify-end gap-2">
                      <BsFillPersonFill className="text-[24px] text-color-main" />
                      <h1 className="font-bold text-color-dark-primary">
                        Hakkımda
                      </h1>
                    </div>
                    <p className="text-color-dark-primary text-opacity-50">
                      {authExpertObject?.expert_about_me}
                    </p>
                  </div>
                  <div className="flex w-full flex-col items-start justify-start gap-2 border-t-[1px] border-solid border-color-dark-primary border-opacity-10 py-5">
                    <div className="flex items-end justify-end gap-2">
                      <GiTreeBranch className="text-[24px] text-color-main" />
                      <h1 className="font-bold text-color-dark-primary">
                        Branşlar
                      </h1>
                    </div>
                    <ul className="flex flex-wrap items-center justify-center gap-2">
                      {authExpertObject?.expert_branch.map((branch) => {
                        return (
                          <li className="rounded-[10px] bg-color-main px-2 py-1">
                            <h1 className="text-color-white">
                              {branch.branch_title}
                            </h1>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="flex w-full flex-col items-start justify-start gap-2 border-t-[1px] border-solid border-color-dark-primary border-opacity-10 py-5">
                    <div className="flex items-end justify-end gap-2">
                      <HiAcademicCap className="text-[24px] text-color-main" />
                      <h1 className="font-bold text-color-dark-primary">
                        Eğitim
                      </h1>
                    </div>
                    <p className="text-color-dark-primary text-opacity-50">
                      {authExpertObject?.expert_training}
                    </p>
                  </div>
                  <div className="flex w-full flex-col items-start justify-start gap-2 border-t-[1px] border-solid border-color-dark-primary border-opacity-10 py-5">
                    <div className="flex items-end justify-end gap-2">
                      <MdWork className="text-[24px] text-color-main" />
                      <h1 className="font-bold text-color-dark-primary">
                        Tecrübeler
                      </h1>
                    </div>
                    <p className="text-color-dark-primary text-opacity-50">
                      {authExpertObject?.expert_experience}
                    </p>
                  </div>
                  <div className="flex w-full flex-col items-start justify-start gap-2 border-t-[1px] border-solid border-color-dark-primary border-opacity-10 py-5">
                    <div className="flex items-end justify-end gap-2">
                      <IoMdInformationCircle className="text-[24px] text-color-main" />
                      <h1 className="font-bold text-color-dark-primary">
                        Ekstra Bilgi
                      </h1>
                    </div>
                    <p className="text-color-dark-primary text-opacity-50">
                      {authExpertObject?.expert_additional_information}
                    </p>
                  </div>
                  <div className="flex w-full flex-col items-start justify-start gap-2 border-t-[1px] border-solid border-color-dark-primary border-opacity-10 py-5">
                    <div className="flex items-end justify-end gap-2">
                      <IoShareSocialSharp className="text-[24px] text-color-main" />
                      <h1 className="font-bold text-color-dark-primary">
                        Sosyal Medya
                      </h1>
                    </div>
                    <ul className="flex items-center justify-center gap-2">
                      {authExpertObject?.expert_socials.map((social) => {
                        return (
                          <SocialIcon
                            url={`${social}`}
                            style={{ height: "25px", width: "25px" }}
                            target="_blank"
                          />
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-4">
              <h1 className="text-lg font-bold text-color-main">Adresler</h1>
              <div className="flex w-full flex-col items-start justify-start gap-10 rounded-[15px] bg-color-white p-5">
                <div className="flex items-center justify-center gap-4">
                  <FaClinicMedical className="text-[48px] text-color-main" />
                  <div className="flex flex-col items-start justify-start">
                    <h1 className="text-color-dark-primary text-opacity-50">
                      Adres Bilgisi
                    </h1>
                    <h1 className="text-lg text-color-dark-primary">
                      {`${authExpertObject?.expert_city}, ${authExpertObject?.expert_country}`}
                    </h1>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-2 py-5">
                  <div className="flex items-end justify-end gap-2">
                    <FaMap className="text-[24px] text-color-main" />
                    <h1 className="font-bold text-color-dark-primary">
                      Açık Adres
                    </h1>
                  </div>
                  <p className="text-color-dark-primary text-opacity-50">
                    {authExpertObject?.expert_physical_location}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="flex w-full flex-col items-start justify-start gap-4">
              <h1 className="text-lg font-bold text-color-main">Ekstra Bilgi</h1>
              <div className="flex w-full flex-col items-start justify-start gap-10 rounded-[15px] bg-color-white p-5">
                <div className="flex items-center justify-center gap-4">
                  <RiInformationFill className="text-[48px] text-color-main" />
                  <div className="flex flex-col items-start justify-start">
                    <h1 className="text-color-dark-primary text-opacity-50">
                      Ekstra Bilgiler
                    </h1>
                    <h1 className="text-lg text-color-dark-primary">
                      {authExpertObject?.expert_city}
                    </h1>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-2 py-5">
                  <div className="flex items-end justify-end gap-2">
                    <FaMap className="text-[24px] text-color-main" />
                    <h1 className="font-bold text-color-dark-primary">
                      Açık Adres
                    </h1>
                  </div>
                  <p className="text-color-dark-primary text-opacity-50">
                    {authExpertObject?.expert_physical_location}
                  </p>
                </div>
              </div>
            </div> */}
          </div>
          <div className="sticky top-0 bottom-10 col-span-2 hidden h-[650px] w-full flex-col items-start justify-start gap-4 lg:flex">
            <h1 className="text-lg font-bold text-color-main opacity-0">
              Empty
            </h1>
            <div className="w-full flex-col items-start justify-start gap-4 overflow-hidden rounded-[15px] bg-color-white p-5">
              <div className="flex flex-col items-start justify-start gap-5 pb-5">
                <div className="w-full rounded-[30px] bg-color-third p-2">
                  <div className="relative grid grid-cols-2 py-2">
                    <div
                      className="flex cursor-pointer items-center justify-center py-4"
                      onClick={() => setOnline(true)}
                    >
                      <h1 className="z-50 text-xs font-bold text-color-white">
                        Online Görüşme
                      </h1>
                    </div>
                    <div
                      className="flex cursor-pointer items-center justify-center py-4"
                      onClick={() => setOnline(false)}
                    >
                      <h1 className="z-50 text-xs font-bold text-color-white">
                        Yüz Yüze Görüşme
                      </h1>
                    </div>
                    <div
                      className={`transition-all duration-500 ${
                        online ? "translate-x-0" : "translate-x-full"
                      } pointer-events-none absolute h-full w-1/2 rounded-[25px] bg-color-main`}
                    ></div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center">
                  {online ? (
                    <div className="flex w-full items-center justify-start gap-5">
                      <img
                        src={require("../../../../../assets/images/onlinegorusme.png")}
                        alt=""
                        className="w-[64px]"
                      />
                      <div className="flex flex-col items-start justify-start">
                        <h1 className="text-lg font-bold text-color-dark-primary">
                          Online Görüşme
                        </h1>
                        <p className="text-color-dark-primary text-opacity-50">
                          Evinden ayrılmadan uzmanına ulaş, görüntülü görüşerek
                          muayene ol.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full items-center justify-start gap-5">
                      <img
                        src={require("../../../../../assets/images/yuzyuzerandevu.png")}
                        alt=""
                        className="w-[64px]"
                      />
                      <div className="flex flex-col items-start justify-start">
                        <h1 className="text-lg font-bold text-color-dark-primary">
                          Yüz Yüze Görüşme
                        </h1>
                        <p className="text-color-dark-primary text-opacity-50">
                          Yüz yüze görüşerek muayene ol.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex min-h-[350px] w-full items-center justify-center border-t-2 border-solid border-color-dark-primary border-opacity-10 py-5">
                {calendarLoading ? (
                  <div className="animate-spin">
                    <BiLoaderAlt className="text-[48px] text-color-main text-opacity-80" />
                  </div>
                ) : (
                  <div className="h-full w-full items-start justify-start">
                    {online ? (
                      <CalendarOnline expert={authExpertObject} />
                    ) : (
                      <CalendarLocation expert={authExpertObject} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog onClose={handleAppointmentBoxClose} open={appointmentBoxOpen}>
        <div className="left-0 flex h-full w-full flex-col items-start justify-start gap-4 place-self-start justify-self-start">
          <div
            className="grid w-full grid-rows-3 rounded-[25px] bg-color-white 
            p-6 shadow-sm transition-all duration-300"
          >
            <div
              className="row-span-1 flex flex-col items-center justify-center border-b-[1px] border-solid
             border-color-dark-primary border-opacity-10"
            >
              <div className="h-[75px] w-full rounded-[30px] bg-color-third p-2">
                <div className="relative grid h-full grid-cols-2 content-center">
                  <div className="flex h-full cursor-pointer items-center justify-center p-1">
                    <h1 className="z-50 h-full text-xs font-bold text-color-white">
                      Online Görüşme
                    </h1>
                  </div>
                  <div className="flex h-full cursor-pointer items-center justify-center p-1">
                    <h1 className="z-50 h-full text-xs font-bold text-color-white">
                      Yüz Yüze Randevu
                    </h1>
                  </div>
                  <div
                    className={`transition-all duration-500 ${
                      online ? "translate-x-0" : "translate-x-full"
                    } pointer-events-none absolute h-full w-1/2 rounded-[25px] bg-color-secondary`}
                  ></div>
                </div>
              </div>
              <div className="flex w-full items-center justify-center py-6">
                {online ? (
                  <div className="flex w-full items-center justify-between gap-4 px-2">
                    <div className="flex items-start justify-center gap-4">
                      <div className="rounded-xl border-4 border-solid border-color-main p-2">
                        <FiSmartphone className="text-[24px] text-color-main" />
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <h1 className="text-base font-bold text-color-dark-primary opacity-80">
                          Online Konsültasyon.
                        </h1>
                        <h1 className="text-sm text-color-dark-primary opacity-50">
                          Evinden ayrılmadan uzmanına ulaş, görüntülü görüşerek
                          muayene ol.
                        </h1>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full flex-col items-start justify-between gap-4 px-2">
                    <div className="flex items-start justify-center gap-4">
                      <div className="rounded-xl border-4 border-solid border-color-main p-2">
                        <FaClinicMedical className="text-[24px] text-color-main" />
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <h1 className="text-base font-bold text-color-dark-primary opacity-80">
                          Yüz Yüze Konsültasyon.
                        </h1>
                        <h1 className="text-sm text-color-dark-primary opacity-50">
                          Yüz Yüze görüşerek muayene ol.
                        </h1>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MdLocationPin className="text-[16px] text-color-main" />
                      <h1>{authExpertObject?.expert_physical_location}</h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="row-span-2 w-full">
              <div className="relative flex h-full w-full items-start justify-center py-10">
                {online ? (
                  <CalendarOnline expert={authExpertObject} />
                ) : (
                  <CalendarLocation expert={authExpertObject} />
                )}
                <div
                  className={`${
                    calendarLoading ? "flex" : "hidden"
                  } absolute top-0 left-0 z-10 h-full w-full bg-color-white`}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="animate-spin">
                      <BiLoaderAlt className="text-[48px] text-color-main text-opacity-80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

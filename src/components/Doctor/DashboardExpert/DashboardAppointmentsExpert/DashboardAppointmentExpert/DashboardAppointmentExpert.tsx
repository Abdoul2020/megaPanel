import { useEffect, useState } from "react";
import {
  AiFillCalendar,
  AiFillCheckCircle,
  AiFillClockCircle,
  AiFillCloseCircle,
  AiFillPhone,
  AiOutlineFieldTime,
  AiTwotoneMail,
} from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { BsFillClockFill } from "react-icons/bs";
import { MdLocationPin, MdPeopleAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../app/hooks";
import { Alert } from "../../../../../common/types/Alert";
import { Appointment } from "../../../../../common/types/Appointment.entity";
import {
  acceptAppointment,
  declineAppointment,
} from "../../../../../features/appointments/appointmentsAPI";
import {
  addAuthExpertObject,
  updateAuthExpertAppointment,
} from "../../../../../features/authExpert/authExpertSlice";
import { fetchClientProfilePicture } from "../../../../../features/clients/clientsAPI";
import { fetchExpertProfilePicture } from "../../../../../features/doctorSlice/doctorAPI";
import { updateAlert } from "../../../../../features/options/optionsSlice";
import { unauthenticateExpert } from "../../../../../helpers/authExpertHelper";
import { getCookie } from "../../../../../helpers/authHelper";

type Props = {
  appointment: Appointment;
  key: string;
};

export default function DashboardAppointmentExpert(props: Props) {
  const navigate = useNavigate();
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [loader, setLoader] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setAppointmentDate(editDate(props.appointment.appointment_date || ""));
  }, []);

  const handleAppointmentStatus = () => {
    async function fetchData() {
      const tokenExpert = getCookie("m_e_t");
      const id = props.appointment._id;
      setLoader(true);
      setSubmitDisable(true);
      const acceptAppointmentResponse = await acceptAppointment(
        tokenExpert,
        id
      );
      setLoader(false);
      setSubmitDisable(false);
      const acceptAppointmentSuccess = acceptAppointmentResponse.success;
      if (acceptAppointmentSuccess) {
        const alert: Alert = {
          type: "success",
          text: "Randevu başarıyla güncellendi.",
          active: true,
          statusCode: 200,
        };
        dispatch(updateAlert(alert));
        const data = acceptAppointmentResponse.data.data;
        dispatch(updateAuthExpertAppointment(data));
      } else {
        if (
          acceptAppointmentResponse.data.response.data.message &&
          acceptAppointmentResponse.data.response.data.message ===
            "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode: acceptAppointmentResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthExpertObject(undefined));
          unauthenticateExpert(navigate("/for-doctors/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: acceptAppointmentResponse.data.response.data.message,
            active: true,
            statusCode: acceptAppointmentResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
      }
    }
    async function fetchDataDecline() {
      const tokenExpert = getCookie("m_e_t");
      const id = props.appointment._id;
      setLoader(true);
      setSubmitDisable(true);
      const declineAppointmentResponse = await declineAppointment(
        tokenExpert,
        id
      );
      setLoader(false);
      setSubmitDisable(false);
      const declineAppointmentSuccess = declineAppointmentResponse.success;
      if (declineAppointmentSuccess) {
        const alert: Alert = {
          type: "success",
          text: "Randevu başarıyla güncellendi.",
          active: true,
          statusCode: 200,
        };
        dispatch(updateAlert(alert));
        const data = declineAppointmentResponse.data.data;
        dispatch(updateAuthExpertAppointment(data));
      } else {
        if (
          declineAppointmentResponse.data.response.data.message &&
          declineAppointmentResponse.data.response.data.message ===
            "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode: declineAppointmentResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthExpertObject(undefined));
          unauthenticateExpert(navigate("/for-doctors/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: declineAppointmentResponse.data.response.data.message,
            active: true,
            statusCode: declineAppointmentResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
      }
    }
    if (!submitDisable) {
      if (props.appointment.appointment_status === 0) {
        fetchData();
      } else if (props.appointment.appointment_status === 2) {
        fetchData();
      } else {
        fetchDataDecline();
      }
    }
  };

  const editDate = (date: string) => {
    const day = date.split(" ")[0].split(".")[0];
    const month = date.split(" ")[0].split(".")[1];
    const year = date.split(" ")[0].split(".")[2];

    const hour = date.split(" ")[1].split(":")[0];
    const minute = date.split(" ")[1].split(":")[1];
    const seconds = date.split(" ")[1].split(":")[2];

    const dateToday = new Date();
    dateToday.setDate(parseInt(day));
    dateToday.setMonth(parseInt(month) - 1);
    dateToday.setFullYear(parseInt(year));
    dateToday.setHours(parseInt(hour), parseInt(minute), parseInt(seconds));
    const realDate = dateToday;
    return realDate;
  };

  const months_string: any = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const toMonthTr = (str: string) => {
    switch (str) {
      case "January":
        return "Ocak";
      case "February":
        return "Şubat";
      case "March":
        return "Mart";
      case "April":
        return "Nisan";
      case "May":
        return "Mayıs";
      case "June":
        return "Haziran";
      case "July":
        return "Temmuz";
      case "August":
        return "Ağustos";
      case "September":
        return "Eylül";
      case "October":
        return "Ekim";
      case "November":
        return "Kasım";
      case "December":
        return "Aralık";
      default:
        break;
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (
        props.appointment.appointment_client_expert &&
        props.appointment.appointment_client_expert.expert_avatar_path !== ""
      ) {
        setProfileImageLoader(true);
        const authExpertDownloadProfilePictureResponse =
          await fetchExpertProfilePicture(
            props.appointment.appointment_client_expert?._id
          );
        setProfileImageLoader(true);
        const authExpertDownloadProfilePictureSuccess =
          authExpertDownloadProfilePictureResponse.success;

        if (authExpertDownloadProfilePictureSuccess) {
          const base64 = authExpertDownloadProfilePictureResponse.data.data;
          setProfileImageBase64(base64);
        } else {
          // console.log({ authExpertDownloadProfilePictureResponse });
        }
      } else if (
        props.appointment.appointment_client_client &&
        props.appointment.appointment_client_client.client_avatar_path !== ""
      ) {
        setProfileImageLoader(true);
        const authClientDownloadProfilePictureResponse =
          await fetchClientProfilePicture(
            props.appointment.appointment_client_client?._id
          );
        setProfileImageLoader(true);
        const authClientDownloadProfilePictureSuccess =
          authClientDownloadProfilePictureResponse.success;

        if (authClientDownloadProfilePictureSuccess) {
          const base64 = authClientDownloadProfilePictureResponse.data.data;
          setProfileImageBase64(base64);
        } else {
          // console.log({ authClientDownloadProfilePictureResponse });
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div
      className="flex h-[400px] w-full items-center justify-between
    rounded-[15px] border-[1px] border-solid border-color-dark-primary border-opacity-10 
    bg-opacity-10 shadow-lg md:h-[350px] lg:h-[300px] xl:h-[250px]"
    >
      <div className="h-full">
        {props.appointment.appointment_status === 0 ? (
          <div
            className="flex h-full cursor-pointer flex-col
           items-center justify-center rounded-l-[15px] bg-color-warning-primary px-4 transition-all duration-300 hover:opacity-80"
            onClick={handleAppointmentStatus}
          >
            {loader ? (
              <div className="animate-spin">
                <BiLoaderAlt className="text-[24px] text-color-white text-opacity-80" />
              </div>
            ) : (
              <BsFillClockFill className="text-[24px] text-color-white" />
            )}
          </div>
        ) : props.appointment.appointment_status === 1 ? (
          <div
            className="flex h-full cursor-pointer flex-col
           items-center justify-center rounded-l-[15px] bg-color-success-primary px-4 transition-all duration-300 hover:opacity-80"
            onClick={handleAppointmentStatus}
          >
            {loader ? (
              <div className="animate-spin">
                <BiLoaderAlt className="text-[24px] text-color-white text-opacity-80" />
              </div>
            ) : (
              <AiFillCheckCircle className="text-[24px] text-color-white" />
            )}
          </div>
        ) : (
          <div
            className="flex h-full cursor-pointer flex-col items-center
           justify-center rounded-l-[15px] bg-color-danger-primary px-4 transition-all duration-300 hover:opacity-80"
            onClick={handleAppointmentStatus}
          >
            {loader ? (
              <div className="animate-spin">
                <BiLoaderAlt className="text-[24px] text-color-white text-opacity-80" />
              </div>
            ) : (
              <AiFillCloseCircle className="text-[24px] text-color-white" />
            )}
          </div>
        )}
      </div>
      <div className="flex h-full w-full grid-cols-6 flex-col items-start justify-start 2xl:grid">
        <div className="col-span-2 flex h-full w-full items-center justify-center gap-10 self-center rounded-r-[15px] bg-color-white-secondary py-2 2xl:py-0">
          {props.appointment.appointment_client_expert ? (
            <div className="flex h-full flex-col items-start justify-start gap-2 py-4">
              <h1 className="font-bold text-color-dark-primary opacity-50">
                Danışan
              </h1>
              <div className="flex items-start justify-start gap-4">
                <div className="h-[75px] w-[75px] overflow-hidden rounded-[15px]">
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
                <div className="flex flex-col items-start justify-start gap-2">
                  <div
                    className="group flex 
            items-center justify-center gap-2 hover:cursor-pointer"
                  >
                    <h1
                      className="text-center text-lg font-bold text-color-dark-primary transition-all
               duration-300 group-hover:text-color-main"
                    >
                      {
                        props.appointment.appointment_client_expert
                          ?.expert_title.title_title
                      }
                    </h1>
                    <div className="flex items-center justify-center">
                      <h1 className="text-center text-color-dark-primary opacity-80 transition-all duration-300 group-hover:text-color-main">
                        {
                          props.appointment.appointment_client_expert
                            ?.expert_name
                        }
                      </h1>
                      <h1 className="text-center text-color-dark-primary opacity-80 transition-all duration-300 group-hover:text-color-main">
                        {
                          props.appointment.appointment_client_expert
                            ?.expert_surname
                        }
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-1">
                    <div className="flex items-center justify-center gap-1">
                      <MdLocationPin className="text-color-main opacity-80" />
                      <h1 className="text-color-dark-primary opacity-80">
                        {
                          props.appointment.appointment_client_expert
                            ?.expert_physical_location
                        }
                      </h1>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <AiTwotoneMail className="text-color-main opacity-80" />
                      <h1 className="text-color-dark-primary opacity-80">
                        {
                          props.appointment.appointment_client_expert
                            ?.expert_email
                        }
                      </h1>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <AiFillPhone className="text-color-main opacity-80" />
                      <h1 className="text-color-dark-primary opacity-80">
                        {
                          props.appointment.appointment_client_expert
                            ?.expert_tel
                        }
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-start justify-start gap-2 py-4">
              <h1 className="font-bold text-color-dark-primary opacity-50">
                Danışan
              </h1>
              <div className="flex items-start justify-start gap-4">
                <div className="h-[75px] w-[75px] overflow-hidden rounded-[15px]">
                  {profileImageBase64 ? (
                    <img
                      src={`data:image/jpeg;base64,${profileImageBase64}`}
                      alt=""
                      className="h-full w-full rounded-[20px] transition-all duration-300 hover:scale-110"
                    />
                  ) : (
                    <img
                      src={require("../../../../../assets/images/client_pp.jpg")}
                      alt=""
                      className="h-full w-full rounded-[20px]"
                    />
                  )}
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <div
                    className="group flex 
          items-center justify-center gap-2 hover:cursor-pointer"
                  >
                    <div className="flex items-center justify-center">
                      <h1 className="text-center text-color-dark-primary opacity-80 transition-all duration-300 group-hover:text-color-main">
                        {
                          props.appointment.appointment_client_client
                            ?.client_name
                        }
                      </h1>
                      <h1 className="text-center text-color-dark-primary opacity-80 transition-all duration-300 group-hover:text-color-main">
                        {
                          props.appointment.appointment_client_client
                            ?.client_surname
                        }
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-1">
                    {/* <div className="flex justify-center items-center gap-1">
                  <MdLocationPin className="text-color-main opacity-80" />
                  <h1 className="text-color-dark-primary opacity-80">
                    {
                      props.appointment.appointment_client_expert
                        ?.expert_physical_location
                    }
                  </h1>
                </div> */}
                    <a
                      href={`mailto:${props.appointment.appointment_client_client?.client_email}`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <AiTwotoneMail className="text-color-main opacity-80" />
                        <h1 className="text-color-dark-primary opacity-80">
                          {
                            props.appointment.appointment_client_client
                              ?.client_email
                          }
                        </h1>
                      </div>
                    </a>
                    {/* <div className="flex justify-center items-center gap-1">
                  <AiFillPhone className="text-color-main opacity-80" />
                  <h1 className="text-color-dark-primary opacity-80">
                    {props.appointment.appointment_client_client?.client_tel}
                  </h1>
                </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-4 grid w-full grid-cols-3 place-items-center items-center justify-around gap-y-10 self-center py-10 md:flex">
          {/* <div className="flex justify-start items-center">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="flex justify-center items-center gap-1">
                <SiStatuspage className="text-color-main text-[20px]" />
                <h1 className="text-color-dark-primary">Statüs</h1>
              </div>
              {props.appointment.appointment_status === 0 ? (
                <div className="p-1 px-3 rounded-[15px] bg-color-warning-primary">
                  <h1 className="font-bold text-color-white">
                    Onay Bekleniyor
                  </h1>
                </div>
              ) : props.appointment.appointment_status === 1 ? (
                <div className="p-1 px-3 rounded-[15px] bg-color-success-primary">
                  <h1 className="font-bold text-color-white">Onaylandı</h1>
                </div>
              ) : (
                <div className="p-1 px-3 rounded-[15px] bg-color-danger-primary">
                  <h1 className="font-bold text-color-white">Reddedildi</h1>
                </div>
              )}
            </div>
          </div> */}
          <div className="flex items-center justify-start">
            <div className="flex flex-col items-start justify-center gap-2">
              <div className="flex items-center justify-center gap-1">
                <AiFillCalendar className="text-[20px] text-color-main" />
                <h1 className="text-color-dark-primary">Tarih</h1>
              </div>
              {appointmentDate ? (
                <h1 className="text-color-dark-primary opacity-50">
                  {`${appointmentDate?.getDate()} ${toMonthTr(
                    months_string[appointmentDate?.getMonth()]
                  )} ${appointmentDate?.getFullYear()}`}
                </h1>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="flex flex-col items-start justify-center gap-2">
              <div className="flex items-center justify-center gap-1">
                <AiFillClockCircle className="text-[20px] text-color-main" />
                <h1 className="text-color-dark-primary">Saat</h1>
              </div>
              {appointmentDate ? (
                <h1 className="text-color-dark-primary opacity-50">
                  {`${
                    String(appointmentDate?.getHours()).length === 1
                      ? `0${appointmentDate?.getHours()}`
                      : String(appointmentDate?.getHours())
                  }:${
                    String(appointmentDate?.getMinutes()).length === 1
                      ? `0${appointmentDate?.getMinutes()}`
                      : String(appointmentDate?.getMinutes())
                  }`}
                </h1>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="flex flex-col items-start justify-center gap-2">
              <div className="flex items-center justify-center gap-1">
                <MdPeopleAlt className="text-[20px] text-color-main" />
                <h1 className="text-color-dark-primary">Seans türü</h1>
              </div>
              <h1 className="text-color-dark-primary opacity-50">
                {props.appointment.appointment_type?.appointment_type_title ===
                "online"
                  ? "Online"
                  : "Yüz yüze"}
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="flex flex-col items-start justify-center gap-2">
              <div className="flex items-center justify-center gap-1">
                <AiOutlineFieldTime className="text-[20px] text-color-main" />
                <h1 className="text-color-dark-primary">Seans süresi</h1>
              </div>
              <h1 className="text-color-dark-primary opacity-50">
                {props.appointment.appointment_time} dk.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

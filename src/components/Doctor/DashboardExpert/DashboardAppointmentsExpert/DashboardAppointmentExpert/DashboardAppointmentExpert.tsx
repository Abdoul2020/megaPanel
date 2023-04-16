import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { HiOutlineMail } from "react-icons/hi";
import { BsCheck, BsX } from "react-icons/bs";
import { BiDetail, BiLoaderAlt } from "react-icons/bi";
import { Dialog } from "@mui/material";
import { CgDetailsMore } from "react-icons/cg";

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

  const [justificationMessage, setJustificationMessage] = useState("");

  const [
    dialogDeclineJustificationAppointment,
    setDialogDeclineJustificationAppointment,
  ] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setAppointmentDate(editDate(props.appointment.appointment_date || ""));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (justificationMessage === "") {
      const alert: Alert = {
        type: "danger",
        text: "Bu alanı boş bırakamazsınız.",
        active: true,
        statusCode: 400,
      };
      dispatch(updateAlert(alert));
    } else {
      handleDeclineAppointment(props.appointment._id, justificationMessage);
      setDialogDeclineJustificationAppointment(false);
      setJustificationMessage("");
    }
  };

  const handleAcceptAppointment = () => {
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
          unauthenticateExpert(navigate("/experts/login"));
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
    fetchData();
  };

  const handleDeclineAppointment = (id: string, justification: string) => {
    async function fetchData() {
      const tokenExpert = getCookie("m_e_t");
      const id = props.appointment._id;
      const body = {
        appointment_reject_justification: justification,
      };
      setLoader(true);
      setSubmitDisable(true);
      const declineAppointmentResponse = await declineAppointment(
        tokenExpert,
        id,
        body
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
          unauthenticateExpert(navigate("/experts/login"));
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
    fetchData();
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
    <div className="relative flex w-full items-center justify-between overflow-hidden rounded-[10px] border-[1px] border-solid border-color-main">
      <div className="p-5">
        <div className="flex h-full items-start justify-start gap-5">
          {props.appointment.appointment_client_client !== undefined ? (
            <div className="items-star flex justify-start gap-5">
              <div className="hidden h-[75px] w-[75px] overflow-hidden rounded-[15px] sm:block">
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
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-col items-start justify-start">
                  <div className="flex items-center justify-center gap-1">
                    <h5 className="text-sm">
                      {props.appointment.appointment_client_client.client_name}
                    </h5>
                    <h5 className="text-sm">
                      {
                        props.appointment.appointment_client_client
                          .client_surname
                      }
                    </h5>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <HiOutlineMail className="text-color-main opacity-80" />
                  <a
                    href={`mailto:${props.appointment.appointment_client_client?.client_email}`}
                  >
                    {props.appointment.appointment_client_client.client_email}
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-start gap-5">
              <div className="hidden h-[75px] w-[75px] overflow-hidden rounded-[15px] sm:block">
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
              <div className="flex flex-col items-start justify-start">
                <Link
                  to={`/experts/${props.appointment.appointment_client_expert?._id}`}
                >
                  <div className="flex flex-col items-start justify-start">
                    <h5 className="text-sm font-bold opacity-50">
                      {props.appointment.appointment_client_expert
                        ?.expert_title !== undefined
                        ? props.appointment.appointment_client_expert
                            .expert_title.title_title
                        : ""}
                    </h5>
                    <div className="flex items-center justify-center gap-1">
                      <h5 className="text-sm">
                        {
                          props.appointment.appointment_client_expert
                            ?.expert_name
                        }
                      </h5>
                      <h5 className="text-sm">
                        {
                          props.appointment.appointment_client_expert
                            ?.expert_surname
                        }
                      </h5>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <HiOutlineMail className="text-color-main opacity-80" />
                  <a
                    href={`mailto:${props.appointment.appointment_client_expert?.expert_email}`}
                  >
                    {props.appointment.appointment_client_expert?.expert_email}
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="h-[75px] border-[1px] border-solid border-l-color-dark-primary opacity-50"></div>
          <div className="flex h-[75px] items-start justify-start gap-5">
            <div className="flex h-full flex-col items-start justify-between">
              <div className="flex flex-col items-start justify-start">
                <h5 className="text-sm">Randevu Durumu: </h5>
                {props.appointment.appointment_status === 0 ? (
                  <h5 className="text-sm font-bold text-color-warning-primary">
                    Onay Bekliyor
                  </h5>
                ) : props.appointment.appointment_status === 1 ? (
                  <h5 className="text-sm font-bold text-color-success-primary">
                    Onaylandı
                  </h5>
                ) : (
                  <h5 className="text-sm font-bold text-color-danger-primary">
                    Onaylanmadı
                  </h5>
                )}
              </div>
              {props.appointment.appointment_status === 0 ? (
                <div className="z-50 flex items-center justify-center">
                  <button
                    className="flex h-full cursor-pointer items-center justify-center bg-color-success-primary p-1"
                    disabled={submitDisable}
                    onClick={() => handleAcceptAppointment()}
                  >
                    {loader ? (
                      <div className="animate-spin">
                        <BiLoaderAlt className="text-[18px] text-color-white text-opacity-80" />
                      </div>
                    ) : (
                      <BsCheck className="text-[18px] text-color-white" />
                    )}
                  </button>
                  <button
                    className="flex h-full cursor-pointer items-center justify-center bg-color-danger-primary p-1"
                    disabled={submitDisable}
                    onClick={() =>
                      setDialogDeclineJustificationAppointment(true)
                    }
                  >
                    {loader ? (
                      <div className="animate-spin">
                        <BiLoaderAlt className="text-[18px] text-color-white text-opacity-80" />
                      </div>
                    ) : (
                      <BsX className="text-[18px] text-color-white" />
                    )}
                  </button>
                </div>
              ) : (
                <div className="hidden"></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Link
        to={`/experts/dashboard/appointments/${props.appointment._id}`}
        className="absolute top-0 right-0 bg-color-main p-2 opacity-80"
      >
        <h5 className="text-sm text-color-white">Detay</h5>
      </Link>
      <Dialog
        open={dialogDeclineJustificationAppointment}
        onClose={() => setDialogDeclineJustificationAppointment(false)}
      >
        <div className="item-start flex flex-col justify-start gap-4 rounded-[20px] p-10">
          <h1 className="text-2xl text-color-dark-primary text-opacity-80">
            Randevu İsteği Reddetme Gerekçesi
          </h1>
          <div className="items-star flex flex-col justify-start gap-1">
            <h1 className="text-lg font-bold">Örnek Gerekçeler</h1>
            <ul className="flex list-decimal flex-col items-start justify-start gap-2 pl-4">
              <li
                className="cursor-pointer rounded-[10px] bg-color-gray-primary p-1 px-3"
                onClick={() =>
                  setJustificationMessage(
                    "Daha önce bu konuda çalışılmamış olması"
                  )
                }
              >
                <h5>Daha önce bu konuda çalışılmamış olması</h5>
              </li>
              <li
                className="cursor-pointer rounded-[10px] bg-color-gray-primary p-1 px-3"
                onClick={() =>
                  setJustificationMessage(
                    "Danışanın özellikle uzmanlık alanınız dışında olması"
                  )
                }
              >
                <h5>Danışanın özellikle uzmanlık alanınız dışında olması</h5>
              </li>
              <li
                className="cursor-pointer rounded-[10px] bg-color-gray-primary p-1 px-3"
                onClick={() =>
                  setJustificationMessage(
                    "Danışanın durumu için uygun olmamanız"
                  )
                }
              >
                <h5>Danışanın durumu için uygun olmamanız</h5>
              </li>
              <li
                className="cursor-pointer rounded-[10px] bg-color-gray-primary p-1 px-3"
                onClick={() =>
                  setJustificationMessage(
                    "Danışanın gereksiz bir ziyaret isteği olması"
                  )
                }
              >
                <h5>Danışanın gereksiz bir ziyaret isteği olması</h5>
              </li>
            </ul>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-start gap-4"
          >
            <textarea
              value={justificationMessage}
              onChange={(e: any) => setJustificationMessage(e.target.value)}
              rows={4}
              cols={50}
              name="message"
              id="message"
              placeholder="Mesaj"
              className="w-full rounded-lg border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
          text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
            />
            <button
              disabled={submitDisable}
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-color-danger-primary py-2 transition-all 
      duration-300 hover:bg-color-danger-dark"
            >
              {loader ? (
                <div className="animate-spin">
                  <BiLoaderAlt className="text-[24px] text-color-white text-opacity-80" />
                </div>
              ) : (
                <h1 className="text-lg text-color-white">Reddet</h1>
              )}
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

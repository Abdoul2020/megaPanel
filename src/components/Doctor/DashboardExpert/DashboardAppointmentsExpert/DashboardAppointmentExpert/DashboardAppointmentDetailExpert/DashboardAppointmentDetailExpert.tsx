import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAppointment } from "../../../../../../features/appointments/appointmentsAPI";
import { Appointment } from "../../../../../../common/types/Appointment.entity";
import { fetchExpertProfilePicture } from "../../../../../../features/doctorSlice/doctorAPI";
import { fetchClientProfilePicture } from "../../../../../../features/clients/clientsAPI";
import { HiOutlineMail } from "react-icons/hi";

type Props = {};

export default function DashboardAppointmentDetailExpert({}: Props) {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<Appointment>();
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [loader, setLoader] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const [justificationMessage, setJustificationMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const appointmentDetailResponse = await fetchAppointment(id || "");
      if (appointmentDetailResponse.success) {
        console.log(appointmentDetailResponse.data.data);
        setAppointment(appointmentDetailResponse.data.data);
        setAppointmentDate(
          editDate(appointmentDetailResponse.data.data.appointment_date || "")
        );
      }
    }
    fetchData();
  }, []);

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
        appointment?.appointment_client_expert &&
        appointment?.appointment_client_expert.expert_avatar_path !== ""
      ) {
        setProfileImageLoader(true);
        const authExpertDownloadProfilePictureResponse =
          await fetchExpertProfilePicture(
            appointment?.appointment_client_expert?._id
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
        appointment?.appointment_client_client &&
        appointment?.appointment_client_client.client_avatar_path !== ""
      ) {
        setProfileImageLoader(true);
        const authClientDownloadProfilePictureResponse =
          await fetchClientProfilePicture(
            appointment?.appointment_client_client?._id
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
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <div className="flex w-full items-center justify-start gap-2">
        <h1 className="font-bold text-color-dark-primary">Randevu Detay</h1>
      </div>
      <div className="flex min-h-[85vh] w-full flex-col items-start justify-start gap-5 rounded-[25px] bg-color-white p-5 shadow-lg">
        <div className="flex flex-col items-start justify-start gap-5">
          {appointment?.appointment_client_client !== undefined ? (
            <div className="items-star flex justify-start gap-5">
              <div className="h-[75px] w-[75px] overflow-hidden rounded-[15px]">
                {profileImageBase64 ? (
                  <img
                    src={`data:image/jpeg;base64,${profileImageBase64}`}
                    alt=""
                    className="h-full w-full rounded-[20px] transition-all duration-300 hover:scale-110"
                  />
                ) : (
                  <img
                    src={require("../../../../../../assets/images/doc_pp.jpg")}
                    alt=""
                    className="h-full w-full rounded-[20px]"
                  />
                )}
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-col items-start justify-start">
                  <div className="flex items-center justify-center gap-1">
                    <h5 className="text-sm">
                      {appointment?.appointment_client_client.client_name}
                    </h5>
                    <h5 className="text-sm">
                      {appointment?.appointment_client_client.client_surname}
                    </h5>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <HiOutlineMail className="text-color-main opacity-80" />
                  <a
                    href={`mailto:${appointment?.appointment_client_client?.client_email}`}
                  >
                    {appointment?.appointment_client_client.client_email}
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-start gap-5">
              <div className="h-[75px] w-[75px] overflow-hidden rounded-[15px]">
                {profileImageBase64 ? (
                  <img
                    src={`data:image/jpeg;base64,${profileImageBase64}`}
                    alt=""
                    className="h-full w-full rounded-[20px] transition-all duration-300 hover:scale-110"
                  />
                ) : (
                  <img
                    src={require("../../../../../../assets/images/doc_pp.jpg")}
                    alt=""
                    className="h-full w-full rounded-[20px]"
                  />
                )}
              </div>
              <div className="flex flex-col items-start justify-start">
                <Link
                  to={`/experts/${appointment?.appointment_client_expert?._id}`}
                >
                  <div className="flex flex-col items-start justify-start">
                    <h5 className="text-sm font-bold opacity-50">
                      {appointment?.appointment_client_expert?.expert_title !==
                      undefined
                        ? appointment?.appointment_client_expert.expert_title
                            .title_title
                        : ""}
                    </h5>
                    <div className="flex items-center justify-center gap-1">
                      <h5 className="text-sm">
                        {appointment?.appointment_client_expert?.expert_name}
                      </h5>
                      <h5 className="text-sm">
                        {appointment?.appointment_client_expert?.expert_surname}
                      </h5>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <HiOutlineMail className="text-color-main opacity-80" />
                  <a
                    href={`mailto:${appointment?.appointment_client_expert?.expert_email}`}
                  >
                    {appointment?.appointment_client_expert?.expert_email}
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 items-start justify-start gap-5 lg:flex">
            <div className="flex flex-col items-start justify-start">
              <h5>Randevu Tarihi: </h5>
              {appointmentDate ? (
                <div className="flex items-center justify-center gap-1">
                  <h5 className="text-color-dark-primary opacity-50">
                    {`${appointmentDate?.getDate()} ${toMonthTr(
                      months_string[appointmentDate?.getMonth()]
                    )} ${appointmentDate?.getFullYear()}`}
                  </h5>
                  <h5 className="text-color-dark-primary opacity-50">
                    {`${
                      String(appointmentDate?.getHours()).length === 1
                        ? `0${appointmentDate?.getHours()}`
                        : String(appointmentDate?.getHours())
                    }:${
                      String(appointmentDate?.getMinutes()).length === 1
                        ? `0${appointmentDate?.getMinutes()}`
                        : String(appointmentDate?.getMinutes())
                    }`}
                  </h5>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="flex flex-col items-start justify-start">
              <h5>Randevu Tipi: </h5>
              <h5 className="text-color-dark-primary opacity-50">
                {appointment?.appointment_type?.appointment_type_title ===
                "online"
                  ? "Online"
                  : "Yüz Yüze"}
              </h5>
            </div>
            <div className="flex flex-col items-start justify-start">
              <h5>Randevu Süresi: </h5>
              <h5 className="text-color-dark-primary opacity-50">
                {appointment?.appointment_time} dk.
              </h5>
            </div>
            <div className="flex flex-col items-start justify-start">
              <h5>Randevu Ücreti: </h5>
              <h5 className="text-color-dark-primary opacity-50">
                {appointment?.appointment_owner?.expert_session_fee}
              </h5>
            </div>
            <div className="flex flex-col items-start justify-start">
              <h5>Randevu Lokasyon: </h5>
              {appointment?.appointment_type?.appointment_type_title ===
              "physical" ? (
                <p className="text-color-dark-primary opacity-50">
                  {appointment?.appointment_owner?.expert_physical_location}
                </p>
              ) : (
                <p className="text-color-dark-primary opacity-50">-</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import {
  AiFillCalendar,
  AiFillClockCircle,
  AiFillCloseCircle,
  AiFillLock,
  AiFillPhone,
  AiOutlineFieldTime,
  AiTwotoneMail,
} from "react-icons/ai";
import { MdLocationPin, MdPeopleAlt } from "react-icons/md";
import { SiStatuspage } from "react-icons/si";
import { Link } from "react-router-dom";
import { Appointment } from "../../../../../common/types/Appointment.entity";
import { fetchExpertProfilePicture } from "../../../../../features/doctorSlice/doctorAPI";

type Props = {
  appointment: Appointment;
  key: string;
};

export default function DashboardAppointment(props: Props) {
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  useEffect(() => {
    setAppointmentDate(editDate(props.appointment.appointment_date || ""));
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
      if (props.appointment.appointment_owner) {
        setProfileImageLoader(true);
        const authExpertDownloadProfilePictureResponse =
          await fetchExpertProfilePicture(
            props.appointment.appointment_owner?._id
          );
        setProfileImageLoader(true);
        const authExpertDownloadProfilePictureSuccess =
          authExpertDownloadProfilePictureResponse.success;

        if (authExpertDownloadProfilePictureSuccess) {
          const base64 = authExpertDownloadProfilePictureResponse.data.data;
          setProfileImageBase64(base64);
        } else {
          console.log({ authExpertDownloadProfilePictureResponse });
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div
      className="h-[200px] border-[1px]
    border-solid border-color-dark-primary border-opacity-10 bg-opacity-10 shadow-lg flex justify-between items-center w-full gap-20 rounded-[15px]"
    >
      <div className="h-full w-full flex justify-between items-center">
        <div className="flex justify-center items-center gap-10 pl-10 rounded-l-[15px] bg-color-white-secondary h-full">
          <div className="flex justify-start items-start gap-4">
            <div className="w-[75px] h-[75px] rounded-[20px] overflow-hidden">
              {profileImageBase64 ? (
                <img
                  src={`data:image/jpeg;base64,${profileImageBase64}`}
                  alt=""
                  className="w-full h-full rounded-[20px] hover:scale-110 transition-all duration-300"
                />
              ) : (
                <img
                  src={require("../../../../../assets/images/doc_pp.jpg")}
                  alt=""
                  className="w-full h-full rounded-[20px]"
                />
              )}
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
              <div
                className="group hover:cursor-pointer 
            flex justify-center items-center gap-2"
              >
                <Link
                  to={`/doctors/${props.appointment.appointment_owner?.expert_title}`}
                >
                  <h1
                    className="group-hover:text-color-main transition-all duration-300 text-lg font-bold
               text-color-dark-primary text-center"
                  >
                    {
                      props.appointment.appointment_owner?.expert_title
                        .title_title
                    }
                  </h1>
                </Link>
                <div className="flex justify-center items-center">
                  <h1 className="group-hover:text-color-main transition-all duration-300 text-color-dark-primary opacity-80 text-center">
                    {props.appointment.appointment_owner?.expert_name}
                  </h1>
                  <h1 className="group-hover:text-color-main transition-all duration-300 text-color-dark-primary opacity-80 text-center">
                    {props.appointment.appointment_owner?.expert_surname}
                  </h1>
                </div>
              </div>
              {props.appointment.appointment_status === 1 ? (
                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="flex justify-center items-center gap-1">
                    <MdLocationPin className="text-color-main opacity-80" />
                    <h1 className="text-color-dark-primary opacity-80">
                      {
                        props.appointment.appointment_owner
                          ?.expert_physical_location
                      }
                    </h1>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    <AiTwotoneMail className="text-color-main opacity-80" />
                    <h1 className="text-color-dark-primary opacity-80">
                      {props.appointment.appointment_owner?.expert_email}
                    </h1>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    <AiFillPhone className="text-color-main opacity-80" />
                    <h1 className="text-color-dark-primary opacity-80">
                      {props.appointment.appointment_owner?.expert_tel}
                    </h1>
                  </div>
                </div>
              ) : (
                <div
                  className="flex justify-start items-center gap-2
                 p-1 px-3 rounded-[15px] bg-color-warning-primary"
                >
                  <AiFillLock className="font-bold text-color-white" />
                  <h1 className="font-bold text-color-white">
                    Bilgiler gizlidir.
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div
            className="relative w-[200px] h-full"
            style={{
              backgroundImage:
                "linear-gradient(to right top, #EBF7F6 0%, #EBF7F6 50%, #ffffff 50%, #ffffff 100%)",
            }}
          ></div>
        </div>
        <div className="flex justify-center items-center gap-10 place-items-center py-10">
          <div className="flex justify-start items-center">
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
          </div>
          <div className="flex justify-start items-center">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="flex justify-center items-center gap-1">
                <AiFillCalendar className="text-color-main text-[20px]" />
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
          <div className="flex justify-start items-center">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="flex justify-center items-center gap-1">
                <AiFillClockCircle className="text-color-main text-[20px]" />
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
          <div className="flex justify-start items-center">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="flex justify-center items-center gap-1">
                <MdPeopleAlt className="text-color-main text-[20px]" />
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
          <div className="flex justify-start items-center">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="flex justify-center items-center gap-1">
                <AiOutlineFieldTime className="text-color-main text-[20px]" />
                <h1 className="text-color-dark-primary">Seans süresi</h1>
              </div>
              <h1 className="text-color-dark-primary opacity-50">
                {props.appointment.appointment_time} dk.
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-color-danger-primary h-full px-4 flex flex-col justify-center items-center rounded-r-[15px]">
        <AiFillCloseCircle className="text-color-white text-[24px]" />
      </div>
    </div>
  );
}

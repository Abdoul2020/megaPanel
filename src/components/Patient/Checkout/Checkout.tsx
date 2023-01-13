import React, { useState, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {
  AiFillCalendar,
  AiFillCheckCircle,
  AiFillClockCircle,
  AiOutlineFieldTime,
} from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MdPeopleAlt } from "react-icons/md";
import { Doctor } from "../../../common/types/Doctor.entity";
import {
  fetchExpert,
  fetchExpertProfilePicture,
} from "../../../features/doctorSlice/doctorAPI";
import { BiLoaderAlt } from "react-icons/bi";
import { CreateAppointmentDto } from "../../../common/dtos/createAppointmentDto";
import { fetchAppointmentTypes } from "../../../features/appointmentTypes/appointmentTypesAPI";
import { AppointmentType } from "../../../common/types/AppointmentType.entity";
import { getCookie } from "../../../helpers/authHelper";
import { fetchClient } from "../../../features/clients/clientsAPI";
import { authGetProfile } from "../../../features/auth/authAPI";
import { Client } from "../../../common/types/Client.entity";
import { createAppointment } from "../../../features/appointments/appointmentsAPI";
import { Alert } from "../../../common/types/Alert";
import { updateAlert } from "../../../features/options/optionsSlice";
import { useAppDispatch } from "../../../app/hooks";
import { addAuthObject } from "../../../features/auth/authSlice";
import { authExpertGetProfile } from "../../../features/authExpert/authExpertAPI";

type Props = {};

export default function Checkout({}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [expert, setExpert] = useState<Doctor | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [clientExpert, setClientExpert] = useState<Doctor | null>(null);
  const [online, setOnline] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [appointmentTypes, setAppointmentTypes] = useState<
    AppointmentType[] | null
  >(null);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardLed, setCardLed] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const [focus, setFocus] = useState("");

  const [loader, setLoader] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);

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
    const paramExpertID = searchParams.get("expertID");
    const paramAppointmentDate = searchParams.get("date") || "";
    const paramOnline = searchParams.get("online");

    setAppointmentDate(editDate(paramAppointmentDate));
    setOnline(paramOnline && paramOnline == "true" ? true : false);

    async function fetchData() {
      const token = getCookie("m_t");
      const tokenExpert = getCookie("m_e_t");
      const fetchAppointmentTypesResponse = await fetchAppointmentTypes();

      const fetchExpertResponse = await fetchExpert(paramExpertID || "");
      const getClientResponse = await authGetProfile(token);

      const getExpertProfileResponse = await authExpertGetProfile(tokenExpert);

      const fetchExpertSuccess = fetchExpertResponse.success;
      const fetchAppointmentTypesSuccess =
        fetchAppointmentTypesResponse.success;
      const getClientProfileSuccess = getClientResponse.success;
      const getExpertProfileSuccess = getExpertProfileResponse.success;

      if (fetchExpertSuccess) {
        setExpert(fetchExpertResponse.data.data);
      } else {
        console.log({ fetchExpertResponse });
      }

      if (fetchAppointmentTypesSuccess) {
        setAppointmentTypes(fetchAppointmentTypesResponse.data.data);
      } else {
        console.log({ fetchAppointmentTypesResponse });
      }

      if (getClientProfileSuccess) {
        setClient(getClientResponse.data.data);
      } else {
        console.log({ getClientResponse });
      }
      if (getExpertProfileSuccess) {
        setClientExpert(getExpertProfileResponse.data.data);
      } else {
        console.log({ getExpertProfileResponse });
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchProfileImageData() {
      if (expert && expert.expert_avatar_path !== "") {
        setProfileImageLoader(true);
        const authExpertDownloadProfilePictureResponse =
          await fetchExpertProfilePicture(expert?._id);
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

    fetchProfileImageData();
  }, [expert]);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    async function fetchData() {
      const token = getCookie("m_t");
      const body: CreateAppointmentDto = {
        appointment_date: appointmentDate?.toLocaleString(),
        appointment_time:
          expert?.expert_appointment_schedule.appointment_duration,
        appointment_owner: expert,
        appointment_client_client: client,
        appointment_type: appointmentTypes?.filter((appointmentType) => {
          return online
            ? appointmentType.appointment_type_title === "online"
            : appointmentType.appointment_type_title === "physical";
        })[0],
      };
      setLoader(true);
      setSubmitDisable(true);
      const createAppointmentResponse = await createAppointment(token, body);
      setLoader(false);
      setSubmitDisable(false);
      const createAppointmentSuccess = createAppointmentResponse.success;
      if (createAppointmentSuccess) {
        navigate("/dashboard/appointments");
        const alert: Alert = {
          type: "success",
          text: "Randevu Oluşturuldu",
          active: true,
          statusCode: createAppointmentResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
      } else {
        const message = createAppointmentResponse.data.response.data.message;
        const alert: Alert = {
          type: "danger",
          text: message,
          active: true,
          statusCode: createAppointmentResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
      }
    }
    async function fetchDataExpert() {
      const tokenExpert = getCookie("m_e_t");
      const body: CreateAppointmentDto = {
        appointment_date: appointmentDate?.toLocaleString(),
        appointment_time:
          expert?.expert_appointment_schedule.appointment_duration,
        appointment_owner: expert,
        appointment_client_expert: clientExpert,
        appointment_type: appointmentTypes?.filter((appointmentType) => {
          return online
            ? appointmentType.appointment_type_title === "online"
            : appointmentType.appointment_type_title === "physical";
        })[0],
      };
      setLoader(true);
      setSubmitDisable(true);
      const createAppointmentResponse = await createAppointment(
        tokenExpert,
        body
      );
      setLoader(false);
      setSubmitDisable(false);
      console.log({ createAppointmentResponse });
      const createAppointmentSuccess = createAppointmentResponse.success;
      if (createAppointmentSuccess) {
        if (client) {
          navigate("/dashboard/appointments");
        } else if (clientExpert) {
          navigate("/for-doctors/dashboard/myappointments");
        }
        const alert: Alert = {
          type: "success",
          text: "Randevu Oluşturuldu",
          active: true,
          statusCode: createAppointmentResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
      } else {
        const message = createAppointmentResponse.data.response.data.message;
        const alert: Alert = {
          type: "danger",
          text: message,
          active: true,
          statusCode: createAppointmentResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
      }
    }
    if (client && clientExpert) {
      window.prompt("asad");
    } else if (client) {
      fetchData();
    } else if (clientExpert) {
      fetchDataExpert();
    }
  };

  const handleCardNameChange = (e: any) => {
    const value = e.target.value;
    setCardName(value);
  };
  const handleCardNumberChange = (e: any) => {
    const value = e.target.value;
    if (value.length <= 16) {
      setCardNumber(value);
    }
  };
  const handleCardLedChange = (e: any) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setCardLed(value);
    }
  };
  const handleCardCVVChange = (e: any) => {
    const value = e.target.value;
    if (value.length <= 3) {
      setCardCVV(value);
    }
  };

  const doctor = {
    id: 1,
    name: "Dr. Julia Jhone",
    specialty: "MBBS, MS - General Surgery, MCh",
    location: "G87P, Birmingham, UK",
    available: true,
    rate: 32,
  };

  function isDigit(val: any) {
    console.log(`0${String(val)}`);
    if (String(val).length === 1) {
      return `0${String(val)}`;
    }
  }

  return (
    <div className="w-full bg-color-white-fourth flex flex-col justify-center items-center">
      <div className="w-full h-[100vh] bg-color-white-secondary flex justify-center items-center">
        <div className="w-2/3 flex flex-col justify-start items-center">
          <div className="flex flex-col justify-start items-start gap-2">
            <div
              className="flex justify-center items-center gap-2 opacity-80 hover:opacity-80 hover:cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <BsArrowLeft className="text-color-main text-xl" />
              <h1 className="font-bold text-lg text-color-main">Geri Dön</h1>
            </div>
            <div className="min-w-[400px] flex justify-center items-center">
              {/* <div className="flex flex-col justify-center items-start col-span-3 w-full bg-color-white rounded-[25px] p-6">
              <h1 className="text-color-dark-primary text-xl font-bold">
                Kart Bilgisi
              </h1>
              <form
                className="flex flex-col justify-center items-start w-full"
                onSubmit={handleSubmit}
              >
                <div
                  className="w-full grid grid-cols-2 gap-10 py-10 border-b-[1px]
                   border-solid border-color-dark-primary border-opacity-10"
                >
                  <div className="flex flex-col justify-between items-start gap-5 w-full">
                    <div className="flex flex-col justify-center items-start gap-1 w-full">
                      <label
                        htmlFor="email"
                        className="text-color-dark-primary text-sm opacity-50 font-bold"
                      >
                        Kart Üzerindeki İsim
                      </label>
                      <input
                        onChange={handleCardNameChange}
                        value={cardName}
                        onFocus={(e: any) => setFocus(e.target.name)}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Kart Üzerindeki İsim"
                        className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                      />
                    </div>
                    <div className="flex flex-col justify-between items-start gap-1 w-full">
                      <label
                        htmlFor="cardNumber"
                        className="text-color-dark-primary text-sm opacity-50 font-bold"
                      >
                        Kart Numarası
                      </label>
                      <input
                        onChange={handleCardNumberChange}
                        value={cardNumber}
                        onFocus={(e: any) => setFocus(e.target.name)}
                        type="number"
                        name="number"
                        id="cardNumber"
                        placeholder="Kart Numarası"
                        className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                      />
                    </div>
                  </div>
                  <div className="h-full w-full">
                    <Cards
                      placeholders={{ name: "İSİM SOYİSİM", expiry: "SKT" }}
                      number={cardNumber}
                      name={cardName}
                      expiry={cardLed}
                      cvc={cardCVV}
                      focused={focus}
                    />
                  </div>
                </div>
                <div className="py-10 grid grid-cols-2 gap-10 w-full">
                  <div className="flex flex-col justify-center items-start gap-1 w-full">
                    <label
                      htmlFor="led"
                      className="text-color-dark-primary text-sm opacity-50 font-bold"
                    >
                      Son Kullanma Tarihi
                    </label>
                    <input
                      onChange={handleCardLedChange}
                      value={cardLed}
                      onFocus={(e: any) => setFocus(e.target.name)}
                      type="number"
                      name="expiry"
                      id="led"
                      placeholder="Ay / Yıl"
                      className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                    />
                  </div>
                  <div className="flex flex-col justify-between items-start gap-1 w-full">
                    <label
                      htmlFor="cardCVV"
                      className="text-color-dark-primary text-sm opacity-50 font-bold"
                    >
                      CVV/CCV
                    </label>
                    <input
                      onChange={handleCardCVVChange}
                      value={cardCVV}
                      onFocus={(e: any) => setFocus(e.target.name)}
                      type="number"
                      name="cvc"
                      id="cardCVV"
                      placeholder="CVV"
                      className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                    />
                  </div>
                </div>
              </form>
            </div> */}
              <div className="flex flex-col justify-start gap-8 h-full items-start col-span-2 w-full bg-color-white rounded-[25px] p-6">
                <h1 className="text-color-dark-primary text-xl font-bold">
                  Randevu Özeti
                </h1>
                <div className="w-full flex flex-col justify-start items-start">
                  <div className="w-full flex justify-start items-start gap-4">
                    <div className="w-[75px] h-[75px] rounded-[15px] overflow-hidden">
                      {profileImageBase64 ? (
                        <img
                          src={`data:image/jpeg;base64,${profileImageBase64}`}
                          alt=""
                          className="w-full h-full rounded-[20px] hover:scale-110 transition-all duration-300"
                        />
                      ) : (
                        <img
                          src={require("../../../assets/images/doc_pp.jpg")}
                          alt=""
                          className="w-full h-full rounded-[20px]"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <Link to={`/doctors/${expert?._id}`}>
                        <h1 className="hover:text-color-main transition-all duration-300 hover:cursor-pointer text-lg font-bold text-color-dark-primary text-center">
                          {`${expert?.expert_title.title_title} ${expert?.expert_name}`}
                        </h1>
                      </Link>
                      <ul className="flex gap-y-0 justify-start items-start gap-4 flex-wrap max-w-[400px]">
                        {expert?.expert_branch.map((branch) => {
                          return (
                            <h1 className="font-bold text-color-dark-primary opacity-50">
                              {branch.branch_title}
                            </h1>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-2 grid-center gap-4 place-items-center w-full py-10 border-b-[1px] border-solid
             border-color-dark-primary border-opacity-10"
                  >
                    <div className="w-full flex justify-start items-center">
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
                    <div className="w-full flex justify-start items-center">
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
                    <div className="w-full flex justify-start items-center">
                      <div className="flex flex-col justify-center items-start gap-2">
                        <div className="flex justify-center items-center gap-1">
                          <MdPeopleAlt className="text-color-main text-[20px]" />
                          <h1 className="text-color-dark-primary">
                            Seans türü
                          </h1>
                        </div>
                        <h1 className="text-color-dark-primary opacity-50">
                          {online ? "Online" : "Yüz yüze"}
                        </h1>
                      </div>
                    </div>
                    <div className="w-full flex justify-start items-center">
                      <div className="flex flex-col justify-center items-start gap-2">
                        <div className="flex justify-center items-center gap-1">
                          <AiOutlineFieldTime className="text-color-main text-[20px]" />
                          <h1 className="text-color-dark-primary">
                            Seans süresi
                          </h1>
                        </div>
                        <h1 className="text-color-dark-primary opacity-50">
                          {
                            expert?.expert_appointment_schedule
                              .appointment_duration
                          }{" "}
                          dk.
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="w-full py-10 flex justify-between items-center">
                    <h1 className="font-bold text-color-dark-primary text-lg">
                      Toplam Tutar
                    </h1>
                    <h1 className="text-color-dark-primary text-3xl">
                      {expert?.expert_session_fee}
                    </h1>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full flex justify-center items-center gap-2 bg-color-third rounded-[15px]
           py-4 px-8 hover:opacity-80 hover:cursor-pointer transition-all duration-300"
                >
                  {loader ? (
                    <div className="animate-spin">
                      <BiLoaderAlt className="text-color-white text-[24px] text-opacity-80" />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <h1 className="text-color-white-secondary font-bold">
                        Randevu Al
                      </h1>
                      <BsArrowRight className="text-color-white-secondary text-[24px]" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

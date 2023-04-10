import { useEffect, useState } from "react";
import "react-credit-cards/es/styles-compiled.css";
import {
  AiFillCalendar,
  AiFillClockCircle,
  AiOutlineFieldTime,
} from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CreateAppointmentDto } from "../../../common/dtos/createAppointmentDto";
import { Alert } from "../../../common/types/Alert";
import { AppointmentType } from "../../../common/types/AppointmentType.entity";
import { Client } from "../../../common/types/Client.entity";
import { Doctor } from "../../../common/types/Doctor.entity";
import { createAppointment } from "../../../features/appointments/appointmentsAPI";
import { fetchAppointmentTypes } from "../../../features/appointmentTypes/appointmentTypesAPI";
import { authGetProfile } from "../../../features/auth/authAPI";
import { addAuthObject } from "../../../features/auth/authSlice";
import { authExpertGetProfile } from "../../../features/authExpert/authExpertAPI";
import {
  fetchExpert,
  fetchExpertProfilePicture,
} from "../../../features/doctorSlice/doctorAPI";
import { updateAlert } from "../../../features/options/optionsSlice";
import { getCookie, unauthenticate } from "../../../helpers/authHelper";
import Cards from "react-credit-cards";

type Props = {};

export default function Checkout({}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const authObject = useAppSelector((state) => state.auth.auth_object);

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

  const [purchaseState, setPurchaseState] = useState(0);

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
      if (
        tokenExpert !== null &&
        tokenExpert !== undefined &&
        tokenExpert !== ""
      ) {
        const getExpertProfileResponse = await authExpertGetProfile(
          tokenExpert
        );
        const getExpertProfileSuccess = getExpertProfileResponse.success;
        if (getExpertProfileSuccess) {
          setClientExpert(getExpertProfileResponse.data.data);
        } else {
          // console.log({ getExpertProfileResponse });
        }
      }

      const fetchExpertSuccess = fetchExpertResponse.success;
      const fetchAppointmentTypesSuccess =
        fetchAppointmentTypesResponse.success;
      const getClientProfileSuccess = getClientResponse.success;

      if (fetchExpertSuccess) {
        setExpert(fetchExpertResponse.data.data);
      } else {
        // console.log({ fetchExpertResponse });
      }

      if (fetchAppointmentTypesSuccess) {
        setAppointmentTypes(fetchAppointmentTypesResponse.data.data);
      } else {
        // console.log({ fetchAppointmentTypesResponse });
      }

      if (getClientProfileSuccess) {
        setClient(getClientResponse.data.data);
      } else {
        // console.log({ getClientResponse });
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
          // console.log({ authExpertDownloadProfilePictureResponse });
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
    if (authObject === undefined && authExpertObject === undefined) {
      navigate("/login");
    }
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
        if (
          createAppointmentResponse.data.response.data.message &&
          createAppointmentResponse.data.response.data.message ===
            "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode: createAppointmentResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthObject(undefined));
          unauthenticate(navigate("/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: createAppointmentResponse.data.response.data.message,
            active: true,
            statusCode: createAppointmentResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
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
      // console.log({ createAppointmentResponse });
      const createAppointmentSuccess = createAppointmentResponse.success;
      if (createAppointmentSuccess) {
        if (client) {
          navigate("/dashboard/appointments");
        } else if (clientExpert) {
          navigate("/experts/dashboard/myappointments");
        }
        const alert: Alert = {
          type: "success",
          text: "Randevu Oluşturuldu",
          active: true,
          statusCode: createAppointmentResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
      } else {
        if (
          createAppointmentResponse.data.response.data.message &&
          createAppointmentResponse.data.response.data.message ===
            "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode: createAppointmentResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthObject(undefined));
          unauthenticate(navigate("/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: createAppointmentResponse.data.response.data.message,
            active: true,
            statusCode: createAppointmentResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
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
    const value = e.target.value.replace(" ", "");
    console.log(value);
    if (value.length <= 16) {
      setCardNumber(value);
    }
  };
  const chunk = (e: any) => {
    var ret = [];
    var i;
    var len;

    for (i = 0, len = e.length; i < len; i += 4) {
      ret.push(e.substr(i, 4));
    }

    return ret.join(" ");
  };
  const handleCardLedChange = (e: any) => {
    const value = e.target.value.replace(" / ", "");
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
  const handlePurchaseState = (pState: any) => {
    if (purchaseState > pState) {
      setPurchaseState((value) => value - 1);
    }
  };
  return (
    <div className="flex w-full flex-col items-center justify-center bg-color-white-fourth">
      <div className="flex min-h-[100vh] w-full items-center justify-center bg-color-white-secondary pt-[90px]">
        <div className="flex w-2/3 flex-col items-center justify-start">
          <div className="flex flex-col items-start justify-start gap-2">
            <div
              className="flex items-center justify-center gap-2 opacity-80 hover:cursor-pointer hover:opacity-80"
              onClick={() => navigate(-1)}
            >
              <BsArrowLeft className="text-xl text-color-main" />
              <h1 className="text-lg font-bold text-color-main">Geri Dön</h1>
            </div>
            <div className="relative flex w-full items-center justify-between px-6 py-6 pb-10">
              <div className="absolute left-0 z-10 flex h-full w-full items-center justify-start px-6">
                <div
                  className={`h-[8px] bg-color-secondary ${
                    purchaseState === 0
                      ? "w-0"
                      : purchaseState === 1
                      ? "w-1/2"
                      : "w-full"
                  } transition-all duration-500 ease-in`}
                ></div>
              </div>
              <div className="absolute left-0 flex h-full w-full items-center justify-start px-6">
                <div className="border-secondary-main h-[10px] w-full border-solid bg-color-white"></div>
              </div>
              <div
                className="relative z-10 flex cursor-pointer flex-col items-center justify-center gap-2"
                onClick={() => handlePurchaseState(0)}
              >
                <div
                  className={`flex h-[40px] w-[40px] items-center justify-center rounded-full border-[2px] border-solid border-color-secondary ${
                    purchaseState >= 0 ? "bg-color-secondary" : "bg-color-white"
                  } transition-all duration-500 ease-in`}
                >
                  <h5
                    className={`${
                      purchaseState >= 0
                        ? "text-color-white"
                        : "text-color-secondary"
                    } transition-all duration-500 ease-in`}
                  >
                    1
                  </h5>
                </div>
                <h5 className="absolute top-full mt-1 whitespace-nowrap">
                  Randevu Özeti
                </h5>
              </div>
              <div
                className="relative z-10 flex cursor-pointer flex-col items-center justify-center gap-2"
                onClick={() => handlePurchaseState(0)}
              >
                <div
                  className={`flex h-[40px] w-[40px] items-center justify-center rounded-full border-[2px] border-solid border-color-secondary ${
                    purchaseState >= 1 ? "bg-color-secondary" : "bg-color-white"
                  } transition-all duration-500 ease-in`}
                >
                  <h5
                    className={`${
                      purchaseState >= 1
                        ? "text-color-white"
                        : "text-color-secondary"
                    } transition-all duration-500 ease-in`}
                  >
                    2
                  </h5>
                </div>
                <h5 className="absolute top-full mt-1 whitespace-nowrap">
                  Adres Bilgisi
                </h5>
              </div>
              <div
                className="relative z-10 flex cursor-pointer flex-col items-center justify-center gap-2"
                onClick={() => handlePurchaseState(0)}
              >
                <div
                  className={`flex h-[40px] w-[40px] items-center justify-center rounded-full border-[2px] border-solid border-color-secondary ${
                    purchaseState >= 2 ? "bg-color-secondary" : "bg-color-white"
                  } transition-all duration-500 ease-in`}
                >
                  <h5
                    className={`${
                      purchaseState >= 2
                        ? "text-color-white"
                        : "text-color-secondary"
                    } transition-all duration-500 ease-in`}
                  >
                    3
                  </h5>
                </div>
                <h5 className="absolute top-full mt-1 whitespace-nowrap">
                  Ödeme Yöntemi
                </h5>
              </div>
            </div>
            <div className="flex min-w-[500px] items-center justify-center">
              {purchaseState === 0 ? (
                <div className="flex h-full w-[700px] flex-col items-start justify-start gap-8 rounded-[25px] bg-color-white p-6">
                  <h1 className="text-xl font-bold text-color-dark-primary">
                    Randevu Özeti
                  </h1>
                  <div className="flex w-full flex-col items-start justify-start">
                    <div className="flex w-full items-start justify-start gap-4">
                      <div className="h-[75px] w-[75px] overflow-hidden rounded-[15px]">
                        {profileImageBase64 ? (
                          <img
                            src={`data:image/jpeg;base64,${profileImageBase64}`}
                            alt=""
                            className="h-full w-full rounded-[20px] transition-all duration-300 hover:scale-110"
                          />
                        ) : (
                          <img
                            src={require("../../../assets/images/doc_pp.jpg")}
                            alt=""
                            className="h-full w-full rounded-[20px]"
                          />
                        )}
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <Link to={`/doctors/${expert?._id}`}>
                          <h1 className="text-center text-lg font-bold text-color-dark-primary transition-all duration-300 hover:cursor-pointer hover:text-color-main">
                            {`${expert?.expert_title.title_title} ${expert?.expert_name}`}
                          </h1>
                        </Link>
                        <ul className="flex max-w-[400px] flex-wrap items-start justify-start gap-4 gap-y-0">
                          {expert?.expert_branch.map((branch) => {
                            return (
                              <h1
                                className="font-bold text-color-dark-primary opacity-50"
                                key={branch._id}
                              >
                                {branch.branch_title}
                              </h1>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div
                      className="grid-center grid w-full grid-cols-2 place-items-center gap-4 border-b-[1px] border-solid border-color-dark-primary
           border-opacity-10 py-10"
                    >
                      <div className="flex w-full items-center justify-start">
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
                      <div className="flex w-full items-center justify-start">
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
                                String(appointmentDate?.getMinutes()).length ===
                                1
                                  ? `0${appointmentDate?.getMinutes()}`
                                  : String(appointmentDate?.getMinutes())
                              }`}
                            </h1>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-start">
                        <div className="flex flex-col items-start justify-center gap-2">
                          <div className="flex items-center justify-center gap-1">
                            <MdPeopleAlt className="text-[20px] text-color-main" />
                            <h1 className="text-color-dark-primary">
                              Seans türü
                            </h1>
                          </div>
                          <h1 className="text-color-dark-primary opacity-50">
                            {online ? "Online" : "Yüz yüze"}
                          </h1>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-start">
                        <div className="flex flex-col items-start justify-center gap-2">
                          <div className="flex items-center justify-center gap-1">
                            <AiOutlineFieldTime className="text-[20px] text-color-main" />
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
                    <div className="flex w-full items-center justify-between pt-5">
                      <h1 className="text-lg font-bold text-color-dark-primary">
                        Toplam Tutar
                      </h1>
                      <h1 className="text-3xl text-color-dark-primary">
                        {expert?.expert_session_fee}
                      </h1>
                    </div>
                  </div>
                  <button
                    onClick={() => setPurchaseState(1)}
                    className="flex w-full items-center justify-center gap-2 rounded-[15px] bg-color-third
         py-4 px-8 transition-all duration-300 hover:cursor-pointer hover:opacity-80"
                  >
                    {loader ? (
                      <div className="animate-spin">
                        <BiLoaderAlt className="text-[24px] text-color-white text-opacity-80" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <h1 className="font-bold text-color-white-secondary">
                          Ödemeye Geç
                        </h1>
                        <BsArrowRight className="text-[24px] text-color-white-secondary" />
                      </div>
                    )}
                  </button>
                </div>
              ) : purchaseState === 1 ? (
                <div className="flex w-[700px] flex-col items-start justify-center rounded-[25px] bg-color-white p-6">
                  <h1 className="text-xl font-bold text-color-dark-primary">
                    Kart Bilgisi
                  </h1>
                  <form
                    className="flex w-full flex-col items-start justify-center"
                    onSubmit={handleSubmit}
                  >
                    <div
                      className="grid w-full grid-cols-2 gap-10 border-b-[1px] border-solid
                   border-color-dark-primary border-opacity-10 py-10"
                    >
                      <div className="flex w-full flex-col items-start justify-between gap-5">
                        <div className="flex w-full flex-col items-start justify-center gap-1">
                          <label
                            htmlFor="email"
                            className="text-sm font-bold text-color-dark-primary opacity-50"
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
                            className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                          />
                        </div>
                        <div className="flex w-full flex-col items-start justify-between gap-1">
                          <label
                            htmlFor="cardNumber"
                            className="text-sm font-bold text-color-dark-primary opacity-50"
                          >
                            Kart Numarası
                          </label>
                          <input
                            onChange={handleCardNumberChange}
                            value={
                              cardNumber.length === 16
                                ? chunk(cardNumber)
                                : cardNumber
                            }
                            onFocus={(e: any) => setFocus(e.target.name)}
                            type="text"
                            name="number"
                            id="cardNumber"
                            placeholder="Kart Numarası"
                            className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
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
                    <div className="grid w-full grid-cols-2 gap-10 py-10">
                      <div className="flex w-full flex-col items-start justify-center gap-1">
                        <label
                          htmlFor="led"
                          className="text-sm font-bold text-color-dark-primary opacity-50"
                        >
                          Son Kullanma Tarihi
                        </label>
                        <input
                          onChange={handleCardLedChange}
                          value={
                            cardLed.length === 4
                              ? cardLed.slice(0, 2) +
                                " / " +
                                cardLed.slice(2, 4)
                              : cardLed
                          }
                          onFocus={(e: any) => setFocus(e.target.name)}
                          type="text"
                          name="expiry"
                          id="led"
                          placeholder="Ay / Yıl"
                          className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                        />
                      </div>
                      <div className="flex w-full flex-col items-start justify-between gap-1">
                        <label
                          htmlFor="cardCVV"
                          className="text-sm font-bold text-color-dark-primary opacity-50"
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
                          className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import { FiSmartphone } from "react-icons/fi";
import { GiDoctorFace } from "react-icons/gi";
import { TbCalendarPlus } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { Alert } from "../../../common/types/Alert";
import { authClientRegister } from "../../../features/auth/authAPI";
import { updateAlert } from "../../../features/options/optionsSlice";
import { AuthClientRegisterDto } from "../../../common/dtos/auth/client/authClientRegisterDto.dto";
import { BiLoaderAlt } from "react-icons/bi";
import { isAuth } from "../../../helpers/authHelper";
import { isAuthExpert } from "../../../helpers/authExpertHelper";

type Props = {};

export default function Register({}: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthExpert() || isAuth()) {
      if (isAuthExpert()) {
        navigate("/for-doctors");
      }
      if (isAuth()) {
        navigate("/");
      }
    }
  }, []);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");

  const [passwordHide, setPasswordHide] = useState(true);
  const [passwordRetypeHide, setPasswordRetypeHide] = useState(true);

  const [loader, setLoader] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);

  const dispatch = useAppDispatch();

  // Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      name === "" ||
      surname === "" ||
      email === "" ||
      password === "" ||
      passwordRetype === ""
    ) {
      const alert: Alert = {
        type: "danger",
        text: "Boş alan bırakmayınız",
        active: true,
        statusCode: 400,
      };
      dispatch(updateAlert(alert));
    } else {
      if (password === passwordRetype) {
        const body: any = {
          client_name: name,
          client_surname: surname,
          client_email: email,
          client_password: password,
          client_retype_password: passwordRetype,
        };
        setLoader(true);
        setSubmitDisable(true);
        const response = await authClientRegister(body);
        setLoader(false);
        setSubmitDisable(false);
        if (response.success === true) {
          navigate("/login");
          const alert: Alert = {
            type: "success",
            text: "Kayıt Başarılı",
            active: true,
            statusCode: response.data.statusCode,
          };
          dispatch(updateAlert(alert));
        } else {
          const alert: Alert = {
            type: "danger",
            text: response.data.response.data.message,
            active: true,
            statusCode: response.data.response.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
      } else {
        const alert: Alert = {
          type: "danger",
          text: "Şifreler aynı olmalı",
          active: true,
          statusCode: 400,
        };
        dispatch(updateAlert(alert));
      }
    }
  };
  // Input Changes
  const handleNameChange = (e: any) => {
    const value = e.target.value;
    setName(value);
  };
  const handleSurnameChange = (e: any) => {
    const value = e.target.value;
    setSurname(value);
  };
  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);
  };
  const handlePasswordRetypeChange = (e: any) => {
    const value = e.target.value;
    setPasswordRetype(value);
  };
  // Password Hide
  const handlePasswordHide = () => {
    setPasswordHide((value) => !value);
  };
  const handlePasswordRetypeHide = () => {
    setPasswordRetypeHide((value) => !value);
  };
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-color-white-secondary py-20 px-10 pt-[170px] lg:px-0">
      <div className="z-20 flex w-full grid-cols-2 content-start items-start justify-start gap-10 lg:grid lg:w-2/3">
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <div className="flex w-full flex-col items-start justify-center gap-6 rounded-[25px] bg-color-white p-8 px-10 shadow-lg">
            <h1 className="text-xl font-bold text-color-dark-primary opacity-80">
              Kayıt Ol
            </h1>
            <form
              className="flex w-full flex-col items-start justify-center gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex w-full flex-col items-start justify-center gap-1">
                <label
                  htmlFor="name"
                  className="font-bold text-color-dark-primary opacity-50"
                >
                  Adı
                </label>
                <input
                  onChange={handleNameChange}
                  value={name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Adını Gir"
                  className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                />
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-1">
                <label
                  htmlFor="surname"
                  className="font-bold text-color-dark-primary opacity-50"
                >
                  Soyadı
                </label>
                <input
                  onChange={handleSurnameChange}
                  value={surname}
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Soyadını Gir"
                  className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                />
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-1">
                <label
                  htmlFor="email"
                  className="font-bold text-color-dark-primary opacity-50"
                >
                  E-posta
                </label>
                <input
                  autoComplete="off"
                  onChange={handleEmailChange}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-postanı Gir"
                  className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                />
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-1">
                <label
                  htmlFor="password"
                  className="font-bold text-color-dark-primary opacity-50"
                >
                  Şifreniz
                </label>
                <div className="relative w-full">
                  <input
                    onChange={handlePasswordChange}
                    value={password}
                    type={passwordHide ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder="Şifreniz"
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  />
                  <div className="absolute top-0 right-0 flex h-full items-center justify-center pr-4">
                    {passwordHide ? (
                      <AiFillEye
                        className="text-[24px] text-color-dark-primary opacity-50 transition-all duration-300 hover:cursor-pointer hover:opacity-80"
                        onClick={handlePasswordHide}
                      />
                    ) : (
                      <AiFillEye
                        className="text-[24px] text-color-main hover:cursor-pointer"
                        onClick={handlePasswordHide}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-1">
                <label
                  htmlFor="passwordRetype"
                  className="font-bold text-color-dark-primary opacity-50"
                >
                  Şifre Tekrar
                </label>
                <div className="relative w-full">
                  <input
                    onChange={handlePasswordRetypeChange}
                    value={passwordRetype}
                    type={passwordRetypeHide ? "password" : "text"}
                    name="passwordRetype"
                    id="passwordRetype"
                    placeholder="Şifre Tekrar"
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  />
                  <div className="absolute top-0 right-0 flex h-full items-center justify-center pr-4">
                    {passwordRetypeHide ? (
                      <AiFillEye
                        className="text-[24px] text-color-dark-primary opacity-50 transition-all duration-300 hover:cursor-pointer hover:opacity-80"
                        onClick={handlePasswordRetypeHide}
                      />
                    ) : (
                      <AiFillEye
                        className="text-[24px] text-color-main hover:cursor-pointer"
                        onClick={handlePasswordRetypeHide}
                      />
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitDisable}
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
                      Kayıt Ol
                    </h1>
                    <BsArrowRight className="text-[24px] text-color-white-secondary" />
                  </div>
                )}
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-base text-color-dark-primary opacity-50">
              Zaten üye misiniz?
            </h1>
            <Link to="/login">
              <h1 className="text-lg text-color-main opacity-80">Giriş Yap</h1>
            </Link>
          </div>
        </div>
        <div className="hidden flex-col items-start justify-start gap-10 rounded-[15px] p-4 lg:flex">
          <h1 className="text-xl font-bold">
            Her branştan alanında uzmanlar ile{" "}
            <span className="text-color-main">
              online olarak hemen görüşün!
            </span>
          </h1>
          <ul className="flex flex-col items-start justify-center gap-10">
            <li className="flex items-start justify-center gap-4">
              <div className="rounded-xl border-4 border-solid border-color-main p-2">
                <img
                  src={require("../../../assets/images/uzmansec.png")}
                  alt=""
                  className="w-[36px]"
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-xl font-bold text-color-dark-primary">
                  Uzman Seç
                </h1>
                <h1 className="text-color-dark-primary opacity-70">
                  Onlarca branş arasından istediğini seç.
                </h1>
              </div>
            </li>
            <li className="flex items-start justify-center gap-4">
              <div className="rounded-xl border-4 border-solid border-color-main p-2">
                <img
                  src={require("../../../assets/images/doktorbul.png")}
                  alt=""
                  className="w-[36px]"
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-xl font-bold text-color-dark-primary">
                  Uzman Bul
                </h1>
                <h1 className="text-color-dark-primary opacity-70">
                  Hastaların görüşlerini incele, uzmanlar arasından seçim yap.
                </h1>
              </div>
            </li>
            <li className="flex items-start justify-center gap-4">
              <div className="rounded-xl border-4 border-solid border-color-main p-2">
                <img
                  src={require("../../../assets/images/yuzyuzerandevu.png")}
                  alt=""
                  className="w-[36px]"
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-xl font-bold text-color-dark-primary">
                  Yüz Yüze Randevu
                </h1>
                <h1 className="text-color-dark-primary opacity-70">
                  Müsait saat aralıklarını görüntüle, muayene için randevu al.
                </h1>
              </div>
            </li>
            <li className="flex items-start justify-center gap-4">
              <div className="rounded-xl border-4 border-solid border-color-main p-2">
                <img
                  src={require("../../../assets/images/onlinegorusme.png")}
                  alt=""
                  className="w-[36px]"
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-xl font-bold text-color-dark-primary">
                  Online Görüşme
                </h1>
                <h1 className="text-color-dark-primary opacity-70">
                  Evinden ayrılmadan uzmanına ulaş, görüntülü görüşerek muayene
                  ol.
                </h1>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

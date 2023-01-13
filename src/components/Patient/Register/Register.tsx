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

type Props = {};

export default function Register({}: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth()) {
      navigate("/");
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
    <div className="relative h-screen w-full flex justify-center items-center bg-color-white-secondary pt-20">
      <div className="z-20 w-1/2 grid grid-cols-2 gap-10">
        <div className="flex flex-col justify-center items-center gap-8 w-full">
          <div className="flex flex-col justify-center items-start gap-6 p-8 px-10 bg-color-white shadow-lg rounded-[25px] w-full">
            <h1 className="text-xl text-color-dark-primary font-bold opacity-80">
              Kayıt Ol
            </h1>
            <form
              className="flex flex-col justify-center items-start gap-4 w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col justify-center items-start gap-1 w-full">
                <label
                  htmlFor="name"
                  className="text-color-dark-primary opacity-50 font-bold"
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
                  className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                />
              </div>
              <div className="flex flex-col justify-center items-start gap-1 w-full">
                <label
                  htmlFor="surname"
                  className="text-color-dark-primary opacity-50 font-bold"
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
                  className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                />
              </div>
              <div className="flex flex-col justify-center items-start gap-1 w-full">
                <label
                  htmlFor="email"
                  className="text-color-dark-primary opacity-50 font-bold"
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
                  className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                />
              </div>
              <div className="flex flex-col justify-center items-start gap-1 w-full">
                <label
                  htmlFor="password"
                  className="text-color-dark-primary opacity-50 font-bold"
                >
                  Şifreniz
                </label>
                <div className="w-full relative">
                  <input
                    onChange={handlePasswordChange}
                    value={password}
                    type={passwordHide ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder="Şifreniz"
                    className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                  />
                  <div className="absolute top-0 right-0 h-full flex justify-center items-center pr-4">
                    {passwordHide ? (
                      <AiFillEye
                        className="text-color-dark-primary opacity-50 hover:opacity-80 transition-all duration-300 hover:cursor-pointer text-[24px]"
                        onClick={handlePasswordHide}
                      />
                    ) : (
                      <AiFillEye
                        className="text-color-main hover:cursor-pointer text-[24px]"
                        onClick={handlePasswordHide}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start gap-1 w-full">
                <label
                  htmlFor="passwordRetype"
                  className="text-color-dark-primary opacity-50 font-bold"
                >
                  Şifre Tekrar
                </label>
                <div className="w-full relative">
                  <input
                    onChange={handlePasswordRetypeChange}
                    value={passwordRetype}
                    type={passwordRetypeHide ? "password" : "text"}
                    name="passwordRetype"
                    id="passwordRetype"
                    placeholder="Şifre Tekrar"
                    className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                  />
                  <div className="absolute top-0 right-0 h-full flex justify-center items-center pr-4">
                    {passwordRetypeHide ? (
                      <AiFillEye
                        className="text-color-dark-primary opacity-50 hover:opacity-80 transition-all duration-300 hover:cursor-pointer text-[24px]"
                        onClick={handlePasswordRetypeHide}
                      />
                    ) : (
                      <AiFillEye
                        className="text-color-main hover:cursor-pointer text-[24px]"
                        onClick={handlePasswordRetypeHide}
                      />
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitDisable}
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
                      Kayıt Ol
                    </h1>
                    <BsArrowRight className="text-color-white-secondary text-[24px]" />
                  </div>
                )}
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-color-dark-primary opacity-50 text-base">
              Zaten üye misiniz?
            </h1>
            <Link to="/login">
              <h1 className="text-lg text-color-main opacity-80">Giriş Yap</h1>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-10 p-4 rounded-[15px]">
          <h1 className="text-xl font-bold">
            Her branştan alanında uzmanlar ile{" "}
            <span className="text-color-main">
              online olarak hemen görüşün!
            </span>
          </h1>
          <ul className="flex flex-col justify-center items-start gap-10">
            <li className="flex justify-center items-start gap-4">
              <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                <BsPlusLg className="text-[36px] text-color-main" />
              </div>
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-xl text-color-dark-primary font-bold">
                  Branş Seç
                </h1>
                <h1 className="text-color-dark-primary opacity-70">
                  Onlarca branş arasından istediğini seç.
                </h1>
              </div>
            </li>
            <li className="flex justify-center items-start gap-4">
              <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                <GiDoctorFace className="text-[36px] text-color-main" />
              </div>
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-xl text-color-dark-primary font-bold">
                  Uzman Bul
                </h1>
                <h1 className="text-color-dark-primary opacity-70">
                  Hastaların görüşlerini incele, uzmanlar arasından seçim yap.
                </h1>
              </div>
            </li>
            <li className="flex justify-center items-start gap-4">
              <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                <TbCalendarPlus className="text-[36px] text-color-main" />
              </div>
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-xl text-color-dark-primary font-bold">
                  Yüz Yüze Randevu
                </h1>
                <h1 className="text-color-dark-primary opacity-70">
                  Müsait saat aralıklarını görüntüle, muayene için randevu al.
                </h1>
              </div>
            </li>
            <li className="flex justify-center items-start gap-4">
              <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                <FiSmartphone className="text-[36px] text-color-main" />
              </div>
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-xl text-color-dark-primary font-bold">
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

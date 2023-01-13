import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { AuthClientLoginDto } from "../../../common/dtos/auth/client/authClientLoginDto.dto";
import { Alert } from "../../../common/types/Alert";
import {
  authClientLogin,
  authGetProfile,
} from "../../../features/auth/authAPI";
import { addAuthObject, addAuthToken } from "../../../features/auth/authSlice";
import { updateAlert } from "../../../features/options/optionsSlice";
import { authenticate, getCookie, isAuth } from "../../../helpers/authHelper";

type Props = {};

export default function Login({}: Props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordHide, setPasswordHide] = useState(true);

  const [loader, setLoader] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth()) {
      navigate("/");
    }
  }, []);

  // Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email === "" || password === "") {
      const alert: Alert = {
        type: "danger",
        text: "Boş alan bırakmayınız",
        active: true,
        statusCode: 400,
      };
      dispatch(updateAlert(alert));
    } else {
      const body: AuthClientLoginDto = {
        client_email: email,
        client_password: password,
      };
      setLoader(true);
      setSubmitDisable(true);
      const response = await authClientLogin(body);
      setLoader(false);
      setSubmitDisable(false);
      if (response.success === true) {
        const alert: Alert = {
          type: "success",
          text: "Giriş Başarılı",
          active: true,
          statusCode: response.data.statusCode,
        };
        dispatch(addAuthObject(response.data.data.user));
        dispatch(updateAlert(alert));
        dispatch(addAuthToken(response.data.data.token));
        authenticate(response.data, () => {
          navigate("/dashboard");
        });
      } else {
        const alert: Alert = {
          type: "danger",
          text: response.data.response.data.message,
          active: true,
          statusCode: response.data.response.data.statusCode,
        };
        dispatch(updateAlert(alert));
      }
    }
  };
  // Input Changes
  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);
  };
  // Password Hide
  const handlePasswordHide = () => {
    setPasswordHide((value) => !value);
  };
  return (
    <div className="relative h-screen w-full flex justify-center items-center bg-color-white-secondary pt-20">
      <div className="z-20 w-1/4 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-8 w-full">
          <div className="flex flex-col justify-center items-start gap-8 p-8 px-10 bg-color-white shadow-lg rounded-[25px] w-full">
            <h1 className="text-xl text-color-dark-primary font-bold opacity-80">
              Danışman Girişi
            </h1>
            <form
              className="flex flex-col justify-center items-start gap-8 w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col justify-center items-start gap-1 w-full">
                <label
                  htmlFor="email"
                  className="text-color-dark-primary opacity-50 font-bold"
                >
                  E-posta
                </label>
                <input
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
                  className="w-full flex justify-between items-center"
                >
                  <h1 className="text-color-dark-primary opacity-50 font-bold">
                    Şifreniz
                  </h1>
                  <Link to="/forgot-password">
                    <h1 className="text-color-main opacity-80">
                      Şifremi unuttum
                    </h1>
                  </Link>
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
              <div className="flex justify-center items-center gap-2">
                <input
                  className="form-check-input focus:outline-none
                   bg-no-repeat bg-center bg-contain float-left cursor-pointer
                   appearance-none h-6 w-6 border border-solid border-color-main rounded-md
                   checked:border-none
                   transition-all duration-300 checked:bg-color-main bg-color-white"
                  type="checkbox"
                  value=""
                  id="remindme"
                />
                <label htmlFor="remindme">
                  <h1 className="text-color-dark-primary font-semibold text opacity-80">
                    Beni hatırla
                  </h1>
                </label>
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
                      Giriş Yap
                    </h1>
                    <BsArrowRight className="text-color-white-secondary text-[24px]" />
                  </div>
                )}
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-color-dark-primary opacity-50 text-base">
              Hesabın yok mu?
            </h1>
            <Link to="/register">
              <h1 className="text-lg text-color-main opacity-80">
                Hemen Kaydol
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

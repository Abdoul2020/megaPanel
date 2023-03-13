import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { BsArrowRight, BsFillPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { AuthClientLoginDto } from "../../../common/dtos/auth/client/authClientLoginDto.dto";
import { Alert } from "../../../common/types/Alert";
import { authClientLogin } from "../../../features/auth/authAPI";
import { addAuthObject, addAuthToken } from "../../../features/auth/authSlice";
import { addAuthExpertObject } from "../../../features/authExpert/authExpertSlice";
import { updateAlert } from "../../../features/options/optionsSlice";
import { isAuthExpert } from "../../../helpers/authExpertHelper";
import {
  authenticate,
  getCookie,
  getLocalStorage,
  isAuth,
  setLocalStorage,
} from "../../../helpers/authHelper";

type Props = {};

export default function Login({}: Props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordHide, setPasswordHide] = useState(true);

  const [loader, setLoader] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);

  const [remindMe, setRemindMe] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthExpert() || isAuth()) {
      if (isAuthExpert()) {
        navigate("/experts");
      }
      if (isAuth()) {
        navigate("/");
      }
    }
    const token = getCookie("m_t");
    const rmm = getLocalStorage("rmm_c");
    if (
      rmm !== undefined &&
      rmm !== null &&
      token !== undefined &&
      token !== null
    ) {
      const rmm_revised = JSON.parse(rmm);
      if (rmm_revised.rmm !== undefined && rmm_revised.rmm !== null) {
        setRemindMe(rmm_revised.rmm);
      }
      if (
        rmm_revised.rmm_t !== undefined &&
        rmm_revised.rmm_t !== "" &&
        rmm_revised.rmm
      ) {
        setTimeout(() => {
          handleSubmitWithoutForm(rmm_revised.rmm_t);
        }, 2000);
      }
    }
  }, []);
  const handleSubmitWithoutForm = async (token: string) => {
    const body: AuthClientLoginDto = {
      client_remind_me_token: token,
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
      dispatch(addAuthExpertObject(undefined));
      dispatch(addAuthObject(response.data.data.user));
      dispatch(updateAlert(alert));
      dispatch(addAuthToken(response.data.data.token));
      authenticate(
        response.data,
        () => {
          navigate("/dashboard");
        },
        true
      );
    } else {
      const alert: Alert = {
        type: "warning",
        text: response.data.response.data.message,
        active: true,
        statusCode: response.data.statusCode,
      };
      dispatch(updateAlert(alert));
    }
  };
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
        dispatch(addAuthExpertObject(undefined));
        dispatch(addAuthObject(response.data.data.user));
        dispatch(updateAlert(alert));
        dispatch(addAuthToken(response.data.data.token));
        authenticate(
          response.data,
          () => {
            navigate("/dashboard");
          },
          remindMe
        );
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
  const handleRemindMeChange = () => {
    let rmm = getLocalStorage("rmm_c");
    if (rmm !== null && rmm !== undefined) {
      let rmm_revised = JSON.parse(rmm);
      rmm_revised.rmm = !remindMe;
      setLocalStorage("rmm_c", rmm_revised);
    } else {
      setLocalStorage("rmm_c", { rmm: !remindMe, rmm_t: undefined });
    }
    setRemindMe((value) => !value);
  };
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-color-white-secondary py-10 px-10 lg:px-0">
      <div className="z-20 flex w-full items-center justify-center lg:w-1/2 xl:w-1/4">
        <div className="relative flex w-full flex-col items-center justify-center gap-8">
          <div className="absolute top-[15px] right-[15px] rounded-full bg-color-main p-2">
            <BsFillPersonFill className="text-[12px] text-color-white" />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-8 rounded-[25px] bg-color-white p-8 px-10 shadow-lg">
            <h1 className="text-xl font-bold text-color-dark-primary opacity-80">
              <span className="text-color-main">Danışan</span> Girişi
            </h1>
            <form
              className="flex w-full flex-col items-start justify-center gap-8"
              onSubmit={handleSubmit}
            >
              <div className="flex w-full flex-col items-start justify-center gap-1">
                <label
                  htmlFor="email"
                  className="font-bold text-color-dark-primary opacity-50"
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
                  className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                />
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-1">
                <label
                  htmlFor="password"
                  className="flex w-full items-center justify-between"
                >
                  <h1 className="font-bold text-color-dark-primary opacity-50">
                    Şifreniz
                  </h1>
                  <Link to="/forgot-password">
                    <h1 className="text-color-main opacity-80">
                      Şifremi unuttum
                    </h1>
                  </Link>
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
              <div className="flex items-center justify-center gap-2">
                <input
                  onChange={handleRemindMeChange}
                  className="form-check-input float-left
                   h-6 w-6 cursor-pointer appearance-none rounded-md
                   border border-solid border-color-main bg-color-white bg-contain bg-center bg-no-repeat
                   transition-all
                   duration-300 checked:border-none checked:bg-color-main focus:outline-none"
                  type="checkbox"
                  checked={remindMe}
                  id="remindme"
                />
                <label htmlFor="remindme">
                  <h1 className="text font-semibold text-color-dark-primary opacity-80">
                    Beni hatırla
                  </h1>
                </label>
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
                      Giriş Yap
                    </h1>
                    <BsArrowRight className="text-[24px] text-color-white-secondary" />
                  </div>
                )}
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-base text-color-dark-primary opacity-50">
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

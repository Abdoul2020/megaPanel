import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../app/hooks";
import { AuthExpertUpdatePasswordDto } from "../../../../../common/dtos/auth/expert/authExpertUpdatePassword.dto";
import { Alert } from "../../../../../common/types/Alert";
import { authExpertUpdatePassword } from "../../../../../features/authExpert/authExpertAPI";
import { addAuthExpertObject } from "../../../../../features/authExpert/authExpertSlice";
import { updateAlert } from "../../../../../features/options/optionsSlice";
import {
  getCookie,
  unauthenticateExpert
} from "../../../../../helpers/authExpertHelper";

type Props = {};

export default function DashboardSettingsChangePasswordExpert({}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [submitDisable, setSubmitDisable] = useState(false);
  const [loader, setLoader] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");

  const [oldPasswordHide, setOldPasswordHide] = useState(true);
  const [passwordHide, setPasswordHide] = useState(true);
  const [passwordRetypeHide, setPasswordRetypeHide] = useState(true);

  const handleOldPasswordChange = (e: any) => {
    const value = e.target.value;
    setOldPassword(value);
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
  const handleOldPasswordHide = () => {
    setOldPasswordHide((value) => !value);
  };
  const handlePasswordHide = () => {
    setPasswordHide((value) => !value);
  };
  const handlePasswordRetypeHide = () => {
    setPasswordRetypeHide((value) => !value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    async function fetchData() {
      const authExpertUpdatePasswordDto: AuthExpertUpdatePasswordDto = {
        expert_old_password: oldPassword,
        expert_new_password: password,
        expert_new_retype_password: passwordRetype,
      };
      const token = getCookie("m_e_t");
      setLoader(true);
      setSubmitDisable(true);
      const authExpertUpdateProfileResponse = await authExpertUpdatePassword(
        token,
        authExpertUpdatePasswordDto
      );
      setLoader(false);
      setSubmitDisable(false);
      const success = authExpertUpdateProfileResponse.success;
      if (success) {
        const alert: Alert = {
          type: "success",
          text: "Şifreniz Güncellendi.",
          active: true,
          statusCode: authExpertUpdateProfileResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
        dispatch(
          addAuthExpertObject(authExpertUpdateProfileResponse.data.data)
        );
        navigate("/experts/dashboard/settings");
      } else {
        if (
          authExpertUpdateProfileResponse.data.response.data.message &&
          authExpertUpdateProfileResponse.data.response.data.message ===
            "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode: authExpertUpdateProfileResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthExpertObject(undefined));
          unauthenticateExpert(navigate("/experts/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: authExpertUpdateProfileResponse.data.response.data.message,
            active: true,
            statusCode: authExpertUpdateProfileResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
      }
    }
    if (oldPassword === "" || password === "" || passwordRetype === "") {
      const alert: Alert = {
        type: "danger",
        text: "Boş alan bırakmayınız",
        active: true,
        statusCode: 400,
      };
      dispatch(updateAlert(alert));
    } else {
      if (password === passwordRetype) {
        fetchData();
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
  useEffect(() => {}, []);
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <div className="flex w-full flex-col items-start justify-start gap-12">
        <h1 className="font-bold text-color-dark-primary">Şifre Değiştirme</h1>
        <div className="flex w-full flex-col items-start justify-start rounded-[25px] bg-color-white p-5 shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-start justify-start gap-4"
          >
            <div className="flex w-full flex-col items-start justify-center gap-1">
              <label
                htmlFor="oldPassword"
                className="font-bold text-color-dark-primary opacity-50"
              >
                Eski Şifre
              </label>
              <div className="relative">
                <input
                  onChange={handleOldPasswordChange}
                  value={oldPassword}
                  type={oldPasswordHide ? "password" : "text"}
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Şifreniz"
                  className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                />
                <div className="absolute top-0 right-0 flex h-full items-center justify-center pr-4">
                  {passwordHide ? (
                    <AiFillEye
                      className="text-[24px] text-color-dark-primary opacity-50 transition-all duration-300 hover:cursor-pointer hover:opacity-80"
                      onClick={handleOldPasswordHide}
                    />
                  ) : (
                    <AiFillEye
                      className="text-[24px] text-color-main hover:cursor-pointer"
                      onClick={handleOldPasswordHide}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-1">
              <label
                htmlFor="password"
                className="font-bold text-color-dark-primary opacity-50"
              >
                Yeni Şifre
              </label>
              <div className="relative">
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
                Yeni Şifre Tekrar
              </label>
              <div className="relative">
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
            <div className="flex w-full items-center justify-end">
              <button
                disabled={submitDisable}
                type="submit"
                className="flex h-[60px] w-[200px] items-center justify-center rounded-[15px] bg-color-third p-4 transition-all 
                duration-300 hover:bg-color-secondary"
              >
                {loader ? (
                  <div className="animate-spin">
                    <BiLoaderAlt className="text-[24px] text-color-white text-opacity-80" />
                  </div>
                ) : (
                  <h1 className="text-lg text-color-white">Şifreyi Güncelle</h1>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

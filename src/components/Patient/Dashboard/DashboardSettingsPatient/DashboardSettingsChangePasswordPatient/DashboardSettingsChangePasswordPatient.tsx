import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../app/hooks";
import { AuthClientUpdatePasswordDto } from "../../../../../common/dtos/auth/client/authClientUpdatePasswordDto.dto";
import { AuthExpertUpdatePasswordDto } from "../../../../../common/dtos/auth/expert/authExpertUpdatePassword.dto";
import { Alert } from "../../../../../common/types/Alert";
import { authClientUpdatePassword } from "../../../../../features/auth/authAPI";
import { addAuthObject } from "../../../../../features/auth/authSlice";
import { addAuthExpertObject } from "../../../../../features/authExpert/authExpertSlice";
import { updateAlert } from "../../../../../features/options/optionsSlice";
import { getCookie } from "../../../../../helpers/authExpertHelper";
import { unauthenticate } from "../../../../../helpers/authHelper";

type Props = {};

export default function DashboardSettingsChangePasswordPatient({}: Props) {
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
      const authClientUpdatePasswordDto: AuthClientUpdatePasswordDto = {
        client_old_password: oldPassword,
        client_new_password: password,
        client_new_retype_password: passwordRetype,
      };
      const token = getCookie("m_t");
      setLoader(true);
      setSubmitDisable(true);
      const authClientUpdateProfileResponse = await authClientUpdatePassword(
        token,
        authClientUpdatePasswordDto
      );
      setLoader(false);
      setSubmitDisable(false);
      const success = authClientUpdateProfileResponse.success;
      if (success) {
        const alert: Alert = {
          type: "success",
          text: "Şifreniz Güncellendi.",
          active: true,
          statusCode: authClientUpdateProfileResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
        dispatch(
          addAuthExpertObject(authClientUpdateProfileResponse.data.data)
        );
        navigate("/dashboard/settings");
      } else {
        if (
          authClientUpdateProfileResponse.data.response.data.message &&
          authClientUpdateProfileResponse.data.response.data.message ===
            "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode: authClientUpdateProfileResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthObject(undefined));
          unauthenticate(navigate("/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: authClientUpdateProfileResponse.data.response.data.message,
            active: true,
            statusCode: authClientUpdateProfileResponse.data.statusCode,
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
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <div className="w-full flex flex-col justify-start items-start gap-12">
        <h1 className="text-color-dark-primary font-bold">Şifre Değiştirme</h1>
        <div className="w-full flex flex-col justify-start items-start shadow-lg bg-color-white rounded-[25px] p-5">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-start items-start gap-4"
          >
            <div className="flex flex-col justify-center items-start gap-1 w-full">
              <label
                htmlFor="oldPassword"
                className="text-color-dark-primary opacity-50 font-bold"
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
                  className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                />
                <div className="absolute top-0 right-0 h-full flex justify-center items-center pr-4">
                  {passwordHide ? (
                    <AiFillEye
                      className="text-color-dark-primary opacity-50 hover:opacity-80 transition-all duration-300 hover:cursor-pointer text-[24px]"
                      onClick={handleOldPasswordHide}
                    />
                  ) : (
                    <AiFillEye
                      className="text-color-main hover:cursor-pointer text-[24px]"
                      onClick={handleOldPasswordHide}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-1 w-full">
              <label
                htmlFor="password"
                className="text-color-dark-primary opacity-50 font-bold"
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
            <div className="w-full flex justify-end items-center">
              <button
                disabled={submitDisable}
                type="submit"
                className="w-[200px] h-[60px] flex justify-center items-center p-4 rounded-[15px] bg-color-third hover:bg-color-secondary 
                transition-all duration-300"
              >
                {loader ? (
                  <div className="animate-spin">
                    <BiLoaderAlt className="text-color-white text-[24px] text-opacity-80" />
                  </div>
                ) : (
                  <h1 className="text-color-white text-lg">Şifreyi Güncelle</h1>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

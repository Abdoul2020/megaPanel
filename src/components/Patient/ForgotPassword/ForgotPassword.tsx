import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import { FiSmartphone } from "react-icons/fi";
import { GiDoctorFace } from "react-icons/gi";
import { TbCalendarPlus } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { AuthClientForgotPasswordDto } from "../../../common/dtos/auth/client/authClientForgotPassword.dto";
import { Alert } from "../../../common/types/Alert";
import { authClientForgotPassword } from "../../../features/auth/authAPI";
import { updateAlert } from "../../../features/options/optionsSlice";
import { isAuth } from "../../../helpers/authHelper";

type Props = {};

export default function ForgotPassword({}: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

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
    const body: AuthClientForgotPasswordDto = {
      client_forgot_password_email: email,
    };
    setLoader(true);
    setSubmitDisable(true);
    const response = await authClientForgotPassword(body);
    setSubmitDisable(false);
    setLoader(false);
    if (response.success) {
      const alert: Alert = {
        type: "success",
        text: "E-postanıza Gönderildi.",
        active: true,
        statusCode: response.data.statusCode,
      };
      dispatch(updateAlert(alert));
      navigate("/reset-password");
    } else {
      const alert: Alert = {
        type: "danger",
        text: response.data.response.data.message,
        active: true,
        statusCode: response.data.response.data.statusCode,
      };
      dispatch(updateAlert(alert));
    }
  };
  // Input Changes
  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
  };
  return (
    <div className="relative h-screen w-full flex justify-center items-center bg-color-white-secondary pt-20">
      <div className="z-20 w-1/4 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-8 w-full">
          <div className="flex flex-col justify-center items-start gap-6 p-8 px-10 bg-color-white shadow-lg rounded-[25px] w-full">
            <h1 className="text-xl text-color-dark-primary font-bold opacity-80">
              Şifremi Unuttum
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
                      Gönder
                    </h1>
                    <BsArrowRight className="text-color-white-secondary text-[24px]" />
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

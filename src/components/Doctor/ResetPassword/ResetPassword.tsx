import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { AuthExpertResetPasswordDto } from "../../../common/dtos/auth/expert/authExpertResetPassword.dto";
import { Alert } from "../../../common/types/Alert";
import { authExpertResetPassword } from "../../../features/authExpert/authExpertAPI";
import { updateAlert } from "../../../features/options/optionsSlice";
import { isAuthExpert } from "../../../helpers/authExpertHelper";

type Props = {};

export default function ResetPassword({}: Props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");

  const [loader, setLoader] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthExpert()) {
      navigate("/for-doctors/");
    }
  }, []);

  useEffect(() => {
    const resetPasswordToken = searchParams.get("resetpasswordtoken");
  }, []);

  // Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newPassword === "" || retypeNewPassword === "") {
      const alert: Alert = {
        type: "danger",
        text: "Boş alan bırakmayınız",
        active: true,
        statusCode: 400,
      };
      dispatch(updateAlert(alert));
    } else if (newPassword !== retypeNewPassword) {
      const alert: Alert = {
        type: "danger",
        text: "Şifreler aynı olmalı.",
        active: true,
        statusCode: 400,
      };
      dispatch(updateAlert(alert));
    } else {
      const body: AuthExpertResetPasswordDto = {
        expert_reset_password: newPassword,
        expert_reset_retype_password: retypeNewPassword,
      };
      const resetPasswordToken = searchParams.get("resetpasswordtoken") || "";
      setLoader(true);
      setSubmitDisable(true);
      const response = await authExpertResetPassword(body, resetPasswordToken);
      setLoader(false);
      setSubmitDisable(false);
      if (response.success) {
        const alert: Alert = {
          type: "success",
          text: "Şifreniz Sıfırlandı",
          active: true,
          statusCode: response.data.statusCode,
        };
        dispatch(updateAlert(alert));
        navigate("/for-doctors/login");
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
  const handleNewPasswordChange = (e: any) => {
    const value = e.target.value;
    setNewPassword(value);
  };
  const handleRetypeNewPasswordChange = (e: any) => {
    const value = e.target.value;
    setRetypeNewPassword(value);
  };
  return (
    <div className="relative min-h-screen w-full flex justify-center items-center bg-color-white-secondary py-20 pt-[170px] px-10 lg:px-0">
      <div className="z-20  w-full lg:w-1/2 xl:w-1/4 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-8 w-full">
          <div className="flex flex-col justify-center items-start gap-6 p-8 px-10 bg-color-white shadow-lg rounded-[25px] w-full">
            <h1 className="text-xl text-color-dark-primary font-bold opacity-80">
              Şifre Sıfırla
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
                  Yeni Şifre
                </label>
                <input
                  onChange={handleNewPasswordChange}
                  value={newPassword}
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Yeni Şifre"
                  className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                />
              </div>
              <div className="flex flex-col justify-center items-start gap-1 w-full">
                <label
                  htmlFor="retypeNewPassword"
                  className="text-color-dark-primary opacity-50 font-bold"
                >
                  Şifre Tekrar
                </label>
                <input
                  onChange={handleRetypeNewPasswordChange}
                  value={retypeNewPassword}
                  type="password"
                  name="retypeNewPassword"
                  id="retypeNewPassword"
                  placeholder="Şifre Tekrar"
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
                      Sıfırla
                    </h1>
                    {/* <BsArrowRight className="text-color-white-secondary text-[24px]" /> */}
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

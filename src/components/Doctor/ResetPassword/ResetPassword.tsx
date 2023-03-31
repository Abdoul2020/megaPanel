import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FaStethoscope } from "react-icons/fa";
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
      navigate("/experts/");
    }
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
        navigate("/experts/login");
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
    <div className="relative flex min-h-screen w-full items-center justify-center bg-color-white-secondary py-20 px-10 pt-[170px] lg:px-0">
      <div className="z-20  flex w-full items-center justify-center lg:w-1/2 xl:w-1/4">
        <div className="relative flex w-full flex-col items-center justify-center gap-8">
          <div className="absolute top-[15px] right-[15px] rounded-full bg-doctor-color-main p-2">
            <FaStethoscope className="text-[12px] text-color-white" />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-6 rounded-[25px] bg-color-white p-8 px-10 shadow-lg">
            <h1 className="text-xl font-bold text-color-dark-primary opacity-80">
              Şifre Sıfırla
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
                  Yeni Şifre
                </label>
                <input
                  onChange={handleNewPasswordChange}
                  value={newPassword}
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Yeni Şifre"
                  className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                />
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-1">
                <label
                  htmlFor="retypeNewPassword"
                  className="font-bold text-color-dark-primary opacity-50"
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
                  className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                />
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

import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { AuthExpertForgotPasswordDto } from "../../../common/dtos/auth/expert/authExpertForgotPassword.dto";
import { Alert } from "../../../common/types/Alert";
import { authExpertForgotPassword } from "../../../features/authExpert/authExpertAPI";
import { updateAlert } from "../../../features/options/optionsSlice";
import { isAuthExpert } from "../../../helpers/authExpertHelper";

type Props = {};

export default function ForgotPassword({}: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [loader, setLoader] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthExpert()) {
      navigate("/");
    }
  }, []);
  // Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const body: AuthExpertForgotPasswordDto = {
      expert_forgot_password_email: email,
    };
    setLoader(true);
    setSubmitDisable(true);
    const response = await authExpertForgotPassword(body);
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
      navigate("/for-doctors/reset-password");
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
    <div className="relative flex px-10 lg:px-0 min-h-screen w-full items-center justify-center bg-color-white-secondary py-20 pt-[170px]">
      <div className="z-20 flex w-full lg:w-1/2 xl:w-1/4 items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <div className="flex w-full flex-col items-start justify-center gap-6 rounded-[25px] bg-color-white p-8 px-10 shadow-lg">
            <h1 className="text-xl font-bold text-color-dark-primary opacity-80">
              Şifremi Unuttum
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
                      Gönder
                    </h1>
                    <BsArrowRight className="text-[24px] text-color-white-secondary" />
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

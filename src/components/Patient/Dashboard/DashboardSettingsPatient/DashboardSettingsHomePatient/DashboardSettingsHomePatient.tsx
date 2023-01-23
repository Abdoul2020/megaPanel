import React, { useState, ChangeEvent, useEffect } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { MdModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { AuthClientUpdateProfileDto } from "../../../../../common/dtos/auth/client/authClientUpdateProfileDto.dto";
import { Alert } from "../../../../../common/types/Alert";
import {
  authClientDownloadProfilePicture,
  authClientUpdateProfile,
  authClientUploadProfilePicture,
} from "../../../../../features/auth/authAPI";
import { addAuthObject } from "../../../../../features/auth/authSlice";
import { updateAlert } from "../../../../../features/options/optionsSlice";
import { getCookie, unauthenticate } from "../../../../../helpers/authHelper";

type Props = {};

export default function DashboardSettingsHomePatient({}: Props) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const [submitDisable, setSubmitDisable] = useState(false);
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();
  const authObject = useAppSelector((state) => state.auth.auth_object);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const theFile = e.target.files[0];
      if (theFile.type === "image/jpeg" && theFile.size < 20000000) {
        setFile(theFile);
      } else {
        const alert: Alert = {
          type: "danger",
          text: "yüklenecek dosya jpeg olup 20MB'ı geçmemelidir.",
          active: true,
          statusCode: 400,
        };
        dispatch(updateAlert(alert));
      }
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const authClientUpdateProfileDto: AuthClientUpdateProfileDto = {
      client_name: name,
      client_surname: surname,
      client_email: email,
    };
    const token = getCookie("m_t");
    setLoader(true);
    setSubmitDisable(true);
    const authClientUpdatePasswordResponse = await authClientUpdateProfile(
      token,
      authClientUpdateProfileDto
    );
    setLoader(false);
    setSubmitDisable(false);
    const success = authClientUpdatePasswordResponse.success;
    if (success) {
      const alert: Alert = {
        type: "success",
        text: "Profiliniz Güncellendi.",
        active: true,
        statusCode: authClientUpdatePasswordResponse.data.statusCode,
      };
      dispatch(updateAlert(alert));
      dispatch(addAuthObject(authClientUpdatePasswordResponse.data.data));
    } else {
      if (
        authClientUpdatePasswordResponse.data.response.data.message &&
        authClientUpdatePasswordResponse.data.response.data.message ===
          "error:TokenExpiredError: jwt expired"
      ) {
        const alert: Alert = {
          type: "warning",
          text: "Oturum zaman aşımına uğradı",
          active: true,
          statusCode: authClientUpdatePasswordResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
        dispatch(addAuthObject(undefined));
        unauthenticate(navigate("/login"));
      } else {
        const alert: Alert = {
          type: "danger",
          text: authClientUpdatePasswordResponse.data.response.data.message,
          active: true,
          statusCode: authClientUpdatePasswordResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
      }
    }
  };
  useEffect(() => {
    async function fetchData() {
      const token = getCookie("m_t");
      const authClientDownloadProfilePictureResponse =
        await authClientDownloadProfilePicture(token);
      const authClientDownloadProfilePictureSuccess =
        authClientDownloadProfilePictureResponse.success;

      if (authClientDownloadProfilePictureSuccess) {
        const base64 = authClientDownloadProfilePictureResponse.data.data;
        setProfileImageBase64(base64);
      } else {
        if (
          authClientDownloadProfilePictureResponse.data.response.data.message &&
          authClientDownloadProfilePictureResponse.data.response.data
            .message === "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode:
              authClientDownloadProfilePictureResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthObject(undefined));
          unauthenticate(navigate("/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: authClientDownloadProfilePictureResponse.data.response.data
              .message,
            active: true,
            statusCode:
              authClientDownloadProfilePictureResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
      }
    }
    setName(authObject ? authObject.client_name : "");
    setSurname(authObject ? authObject.client_surname : "");
    setEmail(authObject ? authObject.client_email : "");
    if (
      authObject &&
      authObject?.client_avatar_path !== "" &&
      authObject?.client_avatar_path !== undefined
    ) {
      fetchData();
    }
  }, [authObject]);
  useEffect(() => {
    async function postData() {
      const token = getCookie("m_t");
      setProfileImageLoader(true);
      const uploadProfileImageResponse = await authClientUploadProfilePicture(
        token,
        file
      );
      const uploadProfileImageSuccess = uploadProfileImageResponse.success;
      if (uploadProfileImageSuccess) {
        const authClientDownloadProfilePictureResponse =
          await authClientDownloadProfilePicture(token);
        const authExpertDownloadProfilePictureSuccess =
          authClientDownloadProfilePictureResponse.success;

        if (authExpertDownloadProfilePictureSuccess) {
          const base64 = authClientDownloadProfilePictureResponse.data.data;
          setProfileImageBase64(base64);
          const alert: Alert = {
            type: "success",
            text: "Profil fotoğrafı güncellendi",
            active: true,
            statusCode: 200,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthObject(uploadProfileImageResponse.data.data));
        } else {
          if (
            uploadProfileImageResponse.data.response.data.message &&
            uploadProfileImageResponse.data.response.data.message ===
              "error:TokenExpiredError: jwt expired"
          ) {
            const alert: Alert = {
              type: "warning",
              text: "Oturum zaman aşımına uğradı",
              active: true,
              statusCode: uploadProfileImageResponse.data.statusCode,
            };
            dispatch(updateAlert(alert));
            dispatch(addAuthObject(undefined));
            unauthenticate(navigate("/login"));
          } else {
            const alert: Alert = {
              type: "danger",
              text: uploadProfileImageResponse.data.response.data.message,
              active: true,
              statusCode: uploadProfileImageResponse.data.statusCode,
            };
            dispatch(updateAlert(alert));
          }
        }
      } else {
        if (
          uploadProfileImageResponse.data.response.data.message &&
          uploadProfileImageResponse.data.response.data.message ===
            "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode: uploadProfileImageResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthObject(undefined));
          unauthenticate(navigate("/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: uploadProfileImageResponse.data.response.data.message,
            active: true,
            statusCode: uploadProfileImageResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
      }
      setProfileImageLoader(false);
    }
    if (file !== null) {
      postData();
    }
  }, [file]);
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4 overflow-x-hidden">
      <div className="flex w-full flex-col items-start justify-start gap-12">
        <h1 className="font-bold text-color-dark-primary">
          Hesap Bilgilerim & Ayarlarım
        </h1>
      </div>
      <div className="flex w-full items-start justify-start gap-10 rounded-[25px] bg-color-white p-5 shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-start justify-start"
        >
          <div className="flex flex-col justify-start items-start xl:grid w-full grid-cols-2 gap-10">
            <div className="flex flex-col justify-center items-center md:grid grid-cols-2 gap-4">
              <div className="flex w-full flex-col items-start justify-start gap-1">
                <label
                  htmlFor="name"
                  className="font-bold text-color-dark-primary opacity-50"
                >
                  Adı(*)
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
              <div className="flex w-full flex-col items-start justify-start gap-1">
                <label
                  htmlFor="surname"
                  className="font-bold text-color-dark-primary opacity-50"
                >
                  Soyadı(*)
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
              <div className="flex w-full flex-col items-start justify-start gap-1">
                <label
                  htmlFor="email"
                  className="font-bold text-color-dark-primary opacity-50"
                >
                  E-posta(*)
                </label>
                <input
                  onChange={handleEmailChange}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-posta"
                  className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                />
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-1">
                <label
                  htmlFor="password"
                  className="font-bold text-color-dark-primary opacity-50"
                >
                  Şifreniz
                </label>
                <div className="relative w-full">
                  <Link to="change-password">
                    <button
                      type="button"
                      className="h-full rounded-[15px] bg-color-secondary p-4 transition-all duration-300 group-hover:bg-color-third"
                    >
                      <h1 className="font-bold text-color-white">
                        Şifreni Değiştir
                      </h1>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-start justify-start gap-4">
              <div className="flex w-full items-start justify-start gap-10">
                <div className="relative h-[200px] w-[200px] rounded-[20px]">
                  {profileImageBase64 ? (
                    <img
                      src={`data:image/jpeg;base64,${profileImageBase64}`}
                      alt=""
                      className="h-full w-full rounded-[20px]"
                    />
                  ) : (
                    <img
                      src={require("../../../../../assets/images/client_pp.jpg")}
                      alt=""
                      className="h-full w-full rounded-[20px]"
                    />
                  )}
                  <div
                    className="absolute bottom-[90%] left-[90%] flex w-full 
              flex-col items-start justify-start gap-1"
                  >
                    <label
                      htmlFor="pp"
                      className="rounded-full border-[1px] border-solid border-color-dark-primary border-opacity-10
                  bg-color-white p-2 shadow-lg hover:cursor-pointer"
                    >
                      <MdModeEdit className="text-[18px] text-color-main" />
                    </label>
                    <input
                      type="file"
                      name="pp"
                      id="pp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
                {/* <div className="flex flex-col justify-start items-start gap-2">
                  <div className="flex justify-center items-center gap-2">
                    <h1 className="text-color-dark-primary uppercase text-lg font-bold text-opacity-50">
                      {authExpertObject && authExpertObject?.expert_title
                        ? authExpertObject?.expert_title.title_title
                        : ""}
                    </h1>
                    <h1 className="text-color-dark-primary uppercase text-base">
                      {authExpertObject?.expert_name}
                    </h1>
                  </div>
                  <h1 className="text-color-dark-primary uppercase text-base font-bold">
                    {authExpertObject && authExpertObject.expert_expertise
                      ? authExpertObject.expert_expertise.expertise_title
                      : ""}
                  </h1>
                  <p className="text-color-dark-primary font-bold text-opacity-50">
                    {authExpertObject && authExpertObject?.expert_about_me
                      ? authExpertObject?.expert_about_me
                      : ""}
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-end pt-10">
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
                <h1 className="text-lg text-color-white">Bilgilerimi Kaydet</h1>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

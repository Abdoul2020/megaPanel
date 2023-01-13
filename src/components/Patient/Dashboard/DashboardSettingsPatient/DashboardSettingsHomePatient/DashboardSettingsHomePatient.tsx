import React, { useState, ChangeEvent, useEffect } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
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
import { getCookie } from "../../../../../helpers/authHelper";

type Props = {};

export default function DashboardSettingsHomePatient({}: Props) {
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
        console.log({ authClientDownloadProfilePictureResponse });
      }
    }
    setName(authObject ? authObject.client_name : "");
    setSurname(authObject ? authObject.client_surname : "");
    setEmail(authObject ? authObject.client_email : "");
    if (authObject?.client_avatar_path !== "") {
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
          console.log({ authClientDownloadProfilePictureResponse });
        }
      } else {
        const alert: Alert = {
          type: "danger",
          text: "Bir sorun oluştu.",
          active: true,
          statusCode: 500,
        };
        dispatch(updateAlert(alert));
      }
      setProfileImageLoader(false);
    }
    if (file !== null) {
      postData();
    }
  }, [file]);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <div className="w-full flex flex-col justify-start items-start gap-12">
        <h1 className="text-color-dark-primary font-bold">
          Hesap Bilgilerim & Ayarlarım
        </h1>
      </div>
      <div className="gap-10 w-full flex justify-start items-start shadow-lg bg-color-white rounded-[25px] p-5">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-start items-start"
        >
          <div className="w-full grid grid-cols-2 gap-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col justify-start items-start gap-1 w-full">
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
              <div className="flex flex-col justify-start items-start gap-1 w-full">
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
              <div className="flex flex-col justify-start items-start gap-1 w-full">
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
                  placeholder="E-posta"
                  className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-1 w-full">
                <label
                  htmlFor="password"
                  className="text-color-dark-primary opacity-50 font-bold"
                >
                  Şifreniz
                </label>
                <div className="w-full relative">
                  <Link to="change-password">
                    <button
                      type="button"
                      className="h-full p-4 rounded-[15px] bg-color-secondary group-hover:bg-color-third transition-all duration-300"
                    >
                      <h1 className="text-color-white font-bold">
                        Şifreni Değiştir
                      </h1>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start w-full gap-4">
              <div className="w-full flex justify-start items-start gap-10">
                <div className="h-[200px] w-[200px] rounded-[20px] relative">
                  {profileImageBase64 ? (
                    <img
                      src={`data:image/jpeg;base64,${profileImageBase64}`}
                      alt=""
                      className="w-full h-full rounded-[20px]"
                    />
                  ) : (
                    <img
                      src={require("../../../../../assets/images/client_pp.jpg")}
                      alt=""
                      className="w-full h-full rounded-[20px]"
                    />
                  )}
                  <div
                    className="absolute bottom-[90%] left-[90%] flex flex-col 
              justify-start items-start gap-1 w-full"
                  >
                    <label
                      htmlFor="pp"
                      className="p-2 rounded-full bg-color-white shadow-lg border-[1px]
                  border-solid border-color-dark-primary border-opacity-10 hover:cursor-pointer"
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
                <h1 className="text-color-white text-lg">Bilgilerimi Kaydet</h1>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

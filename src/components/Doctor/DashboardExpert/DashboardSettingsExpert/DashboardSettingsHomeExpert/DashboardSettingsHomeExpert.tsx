import React, { useEffect, useState, ChangeEvent } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import * as CurrencyFormat from "react-currency-format";
import { Branch } from "../../../../../common/types/Branch.entity";
import { Expertise } from "../../../../../common/types/Expertise.entity";
import { Title } from "../../../../../common/types/Title.entity";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { AuthExpertUpdateProfileDto } from "../../../../../common/dtos/auth/expert/authExpertUpdateProfileDto.dto";
import { Alert } from "../../../../../common/types/Alert";
import { getCookie } from "../../../../../helpers/authExpertHelper";
import {
  authExpertDownloadProfilePicture,
  authExpertUpdateProfile,
  authExpertUploadProfilePicture,
} from "../../../../../features/authExpert/authExpertAPI";
import { updateAlert } from "../../../../../features/options/optionsSlice";
import { addAuthExpertObject } from "../../../../../features/authExpert/authExpertSlice";
import AlertHeaderWarning from "../../../../Common/AlertHeaderWarning/AlertHeaderWarning";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";

type Props = {};

export default function DashboardSettingsHomeExpert({}: Props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [tel, setTel] = useState("");
  const [physicalLocation, setPhysicalLocation] = useState("");
  const [sessionFee, setSessionFee] = useState("");
  const [currentBranches, setCurrentBranches] = useState<Branch[] | []>([]);
  const [expertise, setExpertise] = useState<Expertise | undefined>(undefined);
  const [title, setTitle] = useState<Title | undefined>(undefined);
  const [operatingType, setOperatingType] = useState(1);
  const [city, setCity] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [expertiseDropdownOpen, setExpertiseDropdownOpen] = useState(false);
  const [titleDropdownOpen, setTitleDropdownOpen] = useState(false);

  const [submitDisable, setSubmitDisable] = useState(false);
  const [loader, setLoader] = useState(false);

  const branches = useAppSelector((state) => state.branches.branchesList);
  const titles = useAppSelector((state) => state.titles.titlesList);
  const specializations = useAppSelector(
    (state) => state.specializations.specializationsList
  );
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const cities = useAppSelector((state) => state.cities.citiesList);

  const dispatch = useAppDispatch();

  const handleTelChange = (e: any) => {
    const value = e.target.value;
    setTel(value);
  };
  const handlePhysicalLocationChange = (e: any) => {
    const value = e.target.value;
    setPhysicalLocation(value);
  };

  const handleSessionFeeChange = (e: any) => {
    const value = e.formattedValue;
    setSessionFee(value);
  };

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
  const handleCompanyChange = (e: any) => {
    const value = e.target.value;
    setCompany(value);
  };
  const handleAboutMeChange = (e: any) => {
    const value = e.target.value;
    setAboutMe(value);
  };
  const handleRemoveBranch = (id: string) => {
    setCurrentBranches((oldArray) =>
      oldArray.filter((branch) => branch._id !== id)
    );
  };
  const onBranchChange = (e: any) => {
    const valueRaw = e.target.value;
    if (valueRaw !== "") {
      if (currentBranches.length < 5) {
        const value = JSON.parse(valueRaw);
        const existingValue = currentBranches.find(
          (branch) => branch._id === value._id
        );
        if (!existingValue) {
          setCurrentBranches((oldArray) => [...oldArray, value]);
        }
      } else {
        const alert: Alert = {
          type: "danger",
          text: "Maksimum branş sayısına ulaştınız.",
          active: true,
          statusCode: 400,
        };
        dispatch(updateAlert(alert));
      }
    }
    console.log(currentBranches);
  };
  const onTitleChange = (e: any) => {
    const valueRaw = e.target.value;
    if (valueRaw !== "") {
      const value = JSON.parse(valueRaw);
      setTitle(value);
      console.log(title?.title_title);
      console.log(value.title_title);
    }
  };
  const onExpertiseChange = (e: any) => {
    const valueRaw = e.target.value;
    if (valueRaw !== "") {
      const value = JSON.parse(valueRaw);
      setExpertise(value);
    }
  };
  const onOperatingTypeChange = (e: any) => {
    const valueRaw = e.target.value;
    setOperatingType(parseInt(valueRaw));
  };

  const onCityChange = (e: any) => {
    const value = e.target.value;
    setCity(value);
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

  useEffect(() => {
    async function postData() {
      const tokenExpert = getCookie("m_e_t");
      setProfileImageLoader(true);
      const uploadProfileImageResponse = await authExpertUploadProfilePicture(
        tokenExpert,
        file
      );
      const uploadProfileImageSuccess = uploadProfileImageResponse.success;
      if (uploadProfileImageSuccess) {
        const authExpertDownloadProfilePictureResponse =
          await authExpertDownloadProfilePicture(tokenExpert);
        const authExpertDownloadProfilePictureSuccess =
          authExpertDownloadProfilePictureResponse.success;

        if (authExpertDownloadProfilePictureSuccess) {
          const base64 = authExpertDownloadProfilePictureResponse.data.data;
          setProfileImageBase64(base64);
          const alert: Alert = {
            type: "success",
            text: "Profil fotoğrafı güncellendi",
            active: true,
            statusCode: 200,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthExpertObject(uploadProfileImageResponse.data.data));
        } else {
          console.log({ authExpertDownloadProfilePictureResponse });
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const authExpertUpdateProfileDto: AuthExpertUpdateProfileDto = {
      expert_name: name,
      expert_surname: surname,
      expert_email: email,
      expert_expertise: expertise,
      expert_title: title,
      expert_branch: currentBranches,
      expert_company: company,
      expert_physical_location: physicalLocation,
      expert_session_fee: sessionFee,
      expert_tel: tel,
      expert_operating_type: operatingType,
      expert_about_me: aboutMe,
      expert_city_location: city,
    };
    const token = getCookie("m_e_t");
    setLoader(true);
    setSubmitDisable(true);
    const authExpertUpdatePasswordResponse = await authExpertUpdateProfile(
      token,
      authExpertUpdateProfileDto
    );
    setLoader(false);
    setSubmitDisable(false);
    const success = authExpertUpdatePasswordResponse.success;
    if (success) {
      const alert: Alert = {
        type: "success",
        text: "Profiliniz Güncellendi.",
        active: true,
        statusCode: authExpertUpdatePasswordResponse.data.statusCode,
      };
      dispatch(updateAlert(alert));
      dispatch(addAuthExpertObject(authExpertUpdatePasswordResponse.data.data));
    }
  };

  useEffect(() => {
    async function fetchData() {
      const tokenExpert = getCookie("m_e_t");
      const authExpertDownloadProfilePictureResponse =
        await authExpertDownloadProfilePicture(tokenExpert);
      const authExpertDownloadProfilePictureSuccess =
        authExpertDownloadProfilePictureResponse.success;

      if (authExpertDownloadProfilePictureSuccess) {
        const base64 = authExpertDownloadProfilePictureResponse.data.data;
        setProfileImageBase64(base64);
      } else {
        console.log({ authExpertDownloadProfilePictureResponse });
      }
    }
    setName(authExpertObject ? authExpertObject.expert_name : "");
    setSurname(authExpertObject ? authExpertObject.expert_surname : "");
    setEmail(authExpertObject ? authExpertObject.expert_email : "");
    setCompany(authExpertObject ? authExpertObject.expert_company : "");
    setTitle(authExpertObject?.expert_title);
    setExpertise(authExpertObject?.expert_expertise);
    setTel(
      authExpertObject && authExpertObject?.expert_tel
        ? authExpertObject?.expert_tel
        : ""
    );
    setPhysicalLocation(
      authExpertObject && authExpertObject?.expert_physical_location
        ? authExpertObject?.expert_physical_location
        : ""
    );
    setSessionFee(
      authExpertObject && authExpertObject?.expert_session_fee
        ? authExpertObject?.expert_session_fee
        : ""
    );
    setOperatingType(
      authExpertObject && authExpertObject?.expert_operating_type
        ? authExpertObject?.expert_operating_type
        : 1
    );
    setAboutMe(
      authExpertObject && authExpertObject?.expert_about_me
        ? authExpertObject?.expert_about_me
        : ""
    );
    setCity(
      authExpertObject && authExpertObject?.expert_city_location
        ? authExpertObject?.expert_city_location
        : ""
    );
    setCurrentBranches(
      authExpertObject && authExpertObject?.expert_branch
        ? authExpertObject?.expert_branch
        : []
    );
    if (authExpertObject?.expert_avatar_path !== "") {
      fetchData();
    }
  }, [authExpertObject]);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <div className="w-full bg-color-warning-primary rounded-[15px]">
        {authExpertObject?.expert_name !== undefined &&
        authExpertObject?.expert_name !== "" &&
        authExpertObject?.expert_surname !== undefined &&
        authExpertObject?.expert_surname !== "" &&
        authExpertObject?.expert_email !== undefined &&
        authExpertObject?.expert_email !== "" &&
        authExpertObject?.expert_title !== undefined &&
        authExpertObject?.expert_expertise !== undefined &&
        authExpertObject?.expert_physical_location !== undefined &&
        authExpertObject?.expert_physical_location !== "" &&
        authExpertObject?.expert_session_fee !== undefined &&
        authExpertObject?.expert_session_fee !== "" &&
        authExpertObject?.expert_company !== undefined &&
        authExpertObject?.expert_company !== "" &&
        authExpertObject?.expert_tel !== undefined &&
        authExpertObject?.expert_tel !== "" &&
        authExpertObject?.expert_operating_type !== undefined &&
        authExpertObject?.expert_about_me !== undefined &&
        authExpertObject?.expert_about_me !== "" &&
        authExpertObject?.expert_city_location !== undefined &&
        authExpertObject?.expert_avatar_path !== undefined &&
        authExpertObject?.expert_avatar_path !== "" ? (
          <div></div>
        ) : (
          <AlertHeaderWarning
            alertHeader={{
              type: "warning",
              text: "Randevu almaya başlamanız için hesap bilgilerinizi tamamlamanız gerekmektedir.",
            }}
          />
        )}
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-12">
        <h1 className="text-color-dark-primary font-bold">
          Hesap Bilgilerim & Ayarlarım
        </h1>
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
                <div className="w-full flex flex-col justify-start items-start">
                  <div className="relative flex flex-col justify-start items-start gap-1 w-full">
                    <label
                      htmlFor="branch"
                      className="text-color-dark-primary opacity-50 font-bold"
                    >
                      Branş
                    </label>
                    <div
                      className="w-full transition-all duration-300 focus:border-color-main py-[15px] px-[22px] min-w-4 border-solid
              border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                    >
                      <select
                        name=""
                        id=""
                        className="outline-none text-lg w-full text-opacity-50 cursor-pointer"
                        onChange={onBranchChange}
                      >
                        <option value="" selected>
                          Branş Seç
                        </option>
                        {branches.map((Branch) => {
                          return (
                            <option
                              key={Branch._id}
                              value={JSON.stringify(Branch)}
                            >
                              {Branch.branch_title}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="relative flex flex-col justify-start items-start gap-1 w-full">
                  <label
                    htmlFor="title"
                    className="text-color-dark-primary opacity-50 font-bold"
                  >
                    Unvan
                  </label>

                  <div
                    className="w-full transition-all duration-300 focus:border-color-main py-[15px] px-[22px] min-w-4 border-solid
              border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                  >
                    <select
                      name=""
                      id=""
                      className="outline-none text-lg w-full text-opacity-50 cursor-pointer"
                      onChange={onTitleChange}
                    >
                      <option value="" selected>
                        Unvan Seç
                      </option>
                      {titles.map((Title) => {
                        return (
                          <option
                            key={Title._id}
                            selected={title?.title_title === Title.title_title}
                            value={JSON.stringify(Title)}
                          >
                            {Title.title_title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-start gap-1 w-full">
                  <label
                    htmlFor="sessionFee"
                    className="text-color-dark-primary opacity-50 font-bold"
                  >
                    Seans Ücretiniz
                  </label>
                  <div
                    className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                  >
                    <CurrencyFormat
                      thousandSeparator={true}
                      prefix={"₺"}
                      value={sessionFee}
                      onValueChange={handleSessionFeeChange}
                      className="outline-none w-full"
                    />
                  </div>
                </div>
                <div className="relative flex flex-col justify-start items-start gap-1 w-full">
                  <label
                    htmlFor="expertise"
                    className="text-color-dark-primary opacity-50 font-bold"
                  >
                    Uzmanlık
                  </label>
                  <div
                    className="w-full transition-all duration-300 focus:border-color-main py-[15px] px-[22px] min-w-4 border-solid
              border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                  >
                    <select
                      name=""
                      id=""
                      className="outline-none text-lg w-full text-opacity-50 cursor-pointer"
                      onChange={onExpertiseChange}
                    >
                      <option value="" selected>
                        Uzmanlık Seç
                      </option>
                      {specializations.map((Expertise) => {
                        return (
                          <option
                            key={Expertise._id}
                            selected={
                              expertise?.expertise_title ===
                              Expertise.expertise_title
                            }
                            value={JSON.stringify(Expertise)}
                          >
                            {Expertise.expertise_title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="relative flex flex-col justify-start items-start gap-1 w-full">
                  <label
                    htmlFor="expertise"
                    className="text-color-dark-primary opacity-50 font-bold"
                  >
                    Operasyon Tipi
                  </label>
                  <div
                    className="w-full transition-all duration-300 focus:border-color-main py-[15px] px-[22px] min-w-4 border-solid
              border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                  >
                    <select
                      name=""
                      id=""
                      className="outline-none text-lg w-full text-opacity-50 cursor-pointer"
                      onChange={onOperatingTypeChange}
                    >
                      <option value={1} selected={operatingType === 1}>
                        Yüz Yüze
                      </option>
                      <option value={0} selected={operatingType === 0}>
                        İkisi de
                      </option>
                      <option value={2} selected={operatingType === 2}>
                        Online
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-1 w-full">
                  <label
                    htmlFor="tel"
                    className="text-color-dark-primary opacity-50 font-bold"
                  >
                    Telefon Numarası
                  </label>
                  <input
                    onChange={handleTelChange}
                    value={tel}
                    type="tel"
                    name="tel"
                    id="tel"
                    placeholder="Telefon Numarası"
                    className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                  />
                </div>
                <div className="relative flex flex-col justify-start items-start gap-1 w-full">
                  <label
                    htmlFor="title"
                    className="text-color-dark-primary opacity-50 font-bold"
                  >
                    Şehir
                  </label>
                  <div
                    className="w-full transition-all duration-300 focus:border-color-main py-[15px] px-[22px] min-w-4 border-solid
              border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                  >
                    <select
                      name=""
                      id=""
                      className="outline-none text-lg w-full text-opacity-50 cursor-pointer"
                      onChange={onCityChange}
                    >
                      <option value="" selected>
                        Şehir Seç
                      </option>
                      {cities.map((City, index) => {
                        return (
                          <option
                            key={index}
                            selected={city === City}
                            value={City}
                          >
                            {City}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-1 w-full">
                  <label
                    htmlFor="company"
                    className="text-color-dark-primary opacity-50 font-bold"
                  >
                    Firma Adı
                  </label>
                  <input
                    onChange={handleCompanyChange}
                    value={company}
                    type="text"
                    name="company"
                    id="company"
                    placeholder="Firma Adı"
                    className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                  />
                </div>
                <div className="flex flex-col justify-center items-start gap-1 w-full">
                  <label
                    htmlFor="physicalLocation"
                    className="text-color-dark-primary opacity-50 font-bold"
                  >
                    Açık Adres
                  </label>
                  <textarea
                    onChange={handlePhysicalLocationChange}
                    value={physicalLocation}
                    rows={4}
                    cols={50}
                    name="physicalLocation"
                    id="physicalLocation"
                    placeholder="Fiziksel Lokasyon"
                    className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                  />
                </div>
                <div className="flex flex-col justify-center items-start gap-1 w-full">
                  <label
                    htmlFor="aboutMe"
                    className="text-color-dark-primary opacity-50 font-bold"
                  >
                    Hakkımda
                  </label>
                  <textarea
                    onChange={handleAboutMeChange}
                    value={aboutMe}
                    rows={4}
                    cols={50}
                    name="aboutMe"
                    id="aboutMe"
                    placeholder="Hakkımda"
                    className="w-full transition-all duration-300 focus:border-color-main font-medium outline-none bg-color-white-third text-[16px]
                py-[15px] px-[22px] border-[1px] border-color-dark-primary rounded-[20px] border-opacity-10"
                  />
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
                        src={require("../../../../../assets/images/doc_pp.jpg")}
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
                  <div className="flex flex-col justify-start items-start gap-2">
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
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                  <h1 className="text-color-dark-primary opacity-50 font-bold">
                    Branşlarım
                  </h1>
                  {currentBranches.length === 0 ? (
                    <h1>Henüz bir şey yok.</h1>
                  ) : (
                    <ul className="flex justify-start items-start gap-2 flex-wrap max-w-[450px]">
                      {currentBranches.map((branch) => {
                        return (
                          <li
                            className="flex justify-center items-center gap-2 p-2 px-6 bg-color-gray-primary
                        rounded-[15px] hover:bg-color-main group
                        transition-all duration-300 cursor-pointer"
                            onClick={() => handleRemoveBranch(branch._id)}
                          >
                            <h1
                              className="group-hover:text-color-white text-color-dark-primary 
                                    transition-all duration-300
                                  font-bold text-opacity-80 text-sm"
                            >
                              {branch.branch_title}
                            </h1>
                            <AiOutlineCloseCircle className="text-color-dark-primary group-hover:text-color-white transition-all duration-300" />
                          </li>
                        );
                      })}
                    </ul>
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
                  <h1 className="text-color-white text-lg">
                    Bilgilerimi Kaydet
                  </h1>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

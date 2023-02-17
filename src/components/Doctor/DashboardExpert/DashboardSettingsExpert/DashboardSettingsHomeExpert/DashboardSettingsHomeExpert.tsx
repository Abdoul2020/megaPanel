import { ChangeEvent, useEffect, useState } from "react";
import * as CurrencyFormat from "react-currency-format";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { MdModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { AuthExpertUpdateProfileDto } from "../../../../../common/dtos/auth/expert/authExpertUpdateProfileDto.dto";
import { FirmFilterDto } from "../../../../../common/filters/FirmFilter.dto";
import { Alert } from "../../../../../common/types/Alert";
import { Branch } from "../../../../../common/types/Branch.entity";
import { City } from "../../../../../common/types/City.entity";
import { Country } from "../../../../../common/types/Country.entity";
import { Expertise } from "../../../../../common/types/Expertise.entity";
import { Firm } from "../../../../../common/types/Firm.entity";
import { Region } from "../../../../../common/types/Region";
import { State } from "../../../../../common/types/State.entity";
import { Title } from "../../../../../common/types/Title.entity";
import {
  authExpertDownloadProfilePicture,
  authExpertUpdateProfile,
  authExpertUploadProfilePicture,
} from "../../../../../features/authExpert/authExpertAPI";
import { addAuthExpertObject } from "../../../../../features/authExpert/authExpertSlice";
import { fetchFirms } from "../../../../../features/firms/firmsAPI";
import { addFirms } from "../../../../../features/firms/firmsSlice";
import { updateAlert } from "../../../../../features/options/optionsSlice";
import { getCookie } from "../../../../../helpers/authExpertHelper";
import { unauthenticate } from "../../../../../helpers/authHelper";
import AlertHeaderWarning from "../../../../Common/AlertHeaderWarning/AlertHeaderWarning";
import { VscReferences } from "react-icons/vsc";

type Props = {};

export default function DashboardSettingsHomeExpert({}: Props) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [tel, setTel] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [physicalLocation, setPhysicalLocation] = useState("");
  const [sessionFee, setSessionFee] = useState("");
  const [socials, setSocials] = useState<String[]>();
  const [currentBranches, setCurrentBranches] = useState<Branch[] | []>([]);
  const [companyObject, setCompanyObject] = useState<Firm | undefined>(
    undefined
  );
  const [experience, setExperience] = useState("");
  const [training, setTraining] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [expertise, setExpertise] = useState<Expertise | undefined>(undefined);
  const [title, setTitle] = useState<Title | undefined>(undefined);
  const [operatingType, setOperatingType] = useState(1);
  const [city, setCity] = useState<City>();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const [social, setSocial] = useState("");
  const [firms, setFirms] = useState<Firm[] | []>([]);

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
  const countries = useAppSelector((state) => state.countries.countriesList);

  const states = useAppSelector((state) => state.states.statesList);

  const cities = useAppSelector((state) => state.cities.citiesList);

  const [filteredStates, setFilteredStates] = useState<State[]>();
  const [filteredCities, setFilteredCities] = useState<City[]>();

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
  const handlePostalCodeChange = (e: any) => {
    const value = e.target.value;
    setPostalCode(value);
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
    if (companyObject) {
      setCompanyObject(undefined);
    }
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
  const handleExperienceChange = (e: any) => {
    const value = e.target.value;
    setExperience(value);
  };
  const handleAdditionalInformationChange = (e: any) => {
    const value = e.target.value;
    setAdditionalInformation(value);
  };
  const handleTrainingChange = (e: any) => {
    const value = e.target.value;
    setTraining(value);
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
    // console.log(currentBranches);
  };

  // Firm
  const onFirmChange = (e: any) => {
    const valueRaw = e.target.value;
    const value: Firm = JSON.parse(valueRaw);
    setCompanyObject(value);
    setCompany(value.firm_title);
  };
  const onTitleChange = (e: any) => {
    const valueRaw = e.target.value;
    if (valueRaw !== "") {
      const value = JSON.parse(valueRaw);
      setTitle(value);
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
    const valueRaw = e.target.value;
    const value = JSON.parse(valueRaw);
    setCity(value);
  };
  const onStateChange = (e: any) => {
    const valueRaw = e.target.value;
    const value = JSON.parse(valueRaw);
    setState(value.name);
    // setFilteredCities(cities.filter((city) => city.state_id == value.id));
  };
  const onCountryChange = (e: any) => {
    const valueRaw = e.target.value;
    const value = JSON.parse(valueRaw);
    setCountry(value.name);
    setFilteredStates(states.filter((state) => state.country_id == value.id));
  };

  const handleSocialChange = (e: any) => {
    const value = e.target.value;
    setSocial(value);
  };

  const handleAddSocial = () => {
    setSocials((oldArray: any) => [...oldArray, social]);
  };

  const handleRemoveSocial = (Social: any) => {
    setSocials((oldArray: any) => oldArray?.filter((el: any) => el !== Social));
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
            dispatch(addAuthExpertObject(undefined));
            unauthenticate(navigate("/for-doctors/login"));
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
  useEffect(() => {
    async function fetchData() {
      const query: FirmFilterDto = {
        page: 1,
        size: 5,
        sort: "ASC",
        sort_by: "branch_title",
        query_text: "",
        firmType: "klinik",
      };
      const fetchFirmsResponse = await fetchFirms(query);
      const successFirms = fetchFirmsResponse.success;
      if (successFirms) {
        const statusCodeFirms = fetchFirmsResponse.data.status;
        const data = fetchFirmsResponse.data.data;
        setFirms(data);
      } else {
        // console.log(fetchFirmsResponse);
      }
    }
    fetchData();
  }, []);
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
      expert_city: state,
      expert_postal_code: postalCode,
      expert_country: country,
      expert_socials: socials,
      expert_training: training,
      expert_additional_information: additionalInformation,
      expert_experience: experience,
    };
    const token = getCookie("m_e_t");
    setLoader(true);
    setSubmitDisable(true);
    const authExpertUpdateProfileResponse = await authExpertUpdateProfile(
      token,
      authExpertUpdateProfileDto
    );
    setLoader(false);
    setSubmitDisable(false);
    const success = authExpertUpdateProfileResponse.success;
    if (success) {
      const alert: Alert = {
        type: "success",
        text: "Profiliniz Güncellendi.",
        active: true,
        statusCode: authExpertUpdateProfileResponse.data.statusCode,
      };
      dispatch(updateAlert(alert));
      dispatch(addAuthExpertObject(authExpertUpdateProfileResponse.data.data));
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
        unauthenticate(navigate("/for-doctors/login"));
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
        if (
          authExpertDownloadProfilePictureResponse.data.response.data.message &&
          authExpertDownloadProfilePictureResponse.data.response.data
            .message === "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode:
              authExpertDownloadProfilePictureResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthExpertObject(undefined));
          unauthenticate(navigate("/for-doctors/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: authExpertDownloadProfilePictureResponse.data.response.data
              .message,
            active: true,
            statusCode:
              authExpertDownloadProfilePictureResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
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
      authExpertObject?.expert_operating_type !== undefined
        ? authExpertObject?.expert_operating_type
        : 1
    );
    setAboutMe(
      authExpertObject && authExpertObject?.expert_about_me
        ? authExpertObject?.expert_about_me
        : ""
    );
    setCurrentBranches(
      authExpertObject && authExpertObject?.expert_branch
        ? authExpertObject?.expert_branch
        : []
    );
    setSocials(
      authExpertObject && authExpertObject?.expert_socials
        ? authExpertObject.expert_socials
        : []
    );
    setExperience(
      authExpertObject && authExpertObject?.expert_experience
        ? authExpertObject.expert_experience
        : ""
    );
    setAdditionalInformation(
      authExpertObject && authExpertObject?.expert_additional_information
        ? authExpertObject.expert_additional_information
        : ""
    );
    setTraining(
      authExpertObject && authExpertObject?.expert_training
        ? authExpertObject.expert_training
        : ""
    );
    setPostalCode(
      authExpertObject && authExpertObject?.expert_postal_code
        ? authExpertObject.expert_postal_code
        : ""
    );
    setCountry(
      authExpertObject && authExpertObject?.expert_country
        ? authExpertObject.expert_country
        : ""
    );
    const countryId: any = countries.find(
      (Ct) => Ct.name === authExpertObject?.expert_country
    )?.id;
    setFilteredStates(states.filter((state) => state.country_id == countryId));

    setState(
      authExpertObject && authExpertObject?.expert_city
        ? authExpertObject.expert_city
        : ""
    );
    if (
      authExpertObject &&
      authExpertObject?.expert_avatar_path !== "" &&
      authExpertObject?.expert_avatar_path !== undefined
    ) {
      fetchData();
    }
  }, [authExpertObject]);

  return (
    <div className="flex w-full flex-col items-start justify-start gap-4 overflow-x-hidden">
      <div className="w-full rounded-[15px] bg-color-warning-primary">
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
        authExpertObject?.expert_city !== undefined &&
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
      <div className="flex w-full flex-col items-start justify-start gap-12">
        <h1 className="font-bold text-color-dark-primary">
          Hesap Bilgilerim & Ayarlarım
        </h1>
        <div className="flex w-full items-start justify-start gap-10 rounded-[25px] bg-color-white p-5 shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-start justify-start"
          >
            <div className="flex w-full grid-cols-2 flex-col items-start justify-start gap-10 xl:grid">
              <div className="flex grid-cols-2 flex-col items-center justify-center gap-4 md:grid">
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
                <div className="flex w-full flex-col items-start justify-start">
                  <div className="relative flex w-full flex-col items-start justify-start gap-1">
                    <label
                      htmlFor="branch"
                      className="font-bold text-color-dark-primary opacity-50"
                    >
                      Branş(*)
                    </label>
                    <div
                      className="min-w-4 w-full rounded-[20px] border-[1px] border-solid border-color-dark-primary border-opacity-10 py-[15px]
              px-[22px] transition-all duration-300 focus:border-color-main"
                    >
                      <select
                        name=""
                        id=""
                        className="w-full cursor-pointer text-lg text-opacity-50 outline-none"
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
                <div className="relative flex w-full flex-col items-start justify-start gap-1">
                  <label
                    htmlFor="title"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Unvan(*)
                  </label>

                  <div
                    className="min-w-4 w-full rounded-[20px] border-[1px] border-solid border-color-dark-primary border-opacity-10 py-[15px]
              px-[22px] transition-all duration-300 focus:border-color-main"
                  >
                    <select
                      name=""
                      id=""
                      className="w-full cursor-pointer text-lg text-opacity-50 outline-none"
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
                <div className="flex w-full flex-col items-start justify-center gap-1">
                  <label
                    htmlFor="sessionFee"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Seans Ücretiniz(*)
                  </label>
                  <div
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  >
                    <CurrencyFormat
                      thousandSeparator={true}
                      prefix={"₺"}
                      value={sessionFee}
                      onValueChange={handleSessionFeeChange}
                      className="w-full outline-none"
                    />
                  </div>
                </div>
                <div className="relative flex w-full flex-col items-start justify-start gap-1">
                  <label
                    htmlFor="expertise"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Uzmanlık(*)
                  </label>
                  <div
                    className="min-w-4 w-full rounded-[20px] border-[1px] border-solid border-color-dark-primary border-opacity-10 py-[15px]
              px-[22px] transition-all duration-300 focus:border-color-main"
                  >
                    <select
                      name=""
                      id=""
                      className="w-full cursor-pointer text-lg text-opacity-50 outline-none"
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
                <div className="relative flex w-full flex-col items-start justify-start gap-1">
                  <label
                    htmlFor="expertise"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Operasyon Tipi(*)
                  </label>
                  <div
                    className="min-w-4 w-full rounded-[20px] border-[1px] border-solid border-color-dark-primary border-opacity-10 py-[15px]
              px-[22px] transition-all duration-300 focus:border-color-main"
                  >
                    <select
                      name=""
                      id=""
                      className="w-full cursor-pointer text-lg text-opacity-50 outline-none"
                      onChange={onOperatingTypeChange}
                    >
                      <option value={1} selected={operatingType === 1}>
                        Yüz Yüze
                      </option>
                      <option value={0} selected={operatingType === 0}>
                        Online/Yüz Yüze
                      </option>
                      <option value={2} selected={operatingType === 2}>
                        Online
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-1">
                  <label
                    htmlFor="tel"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Telefon Numarası(*)
                  </label>
                  <input
                    onChange={handleTelChange}
                    value={tel}
                    type="tel"
                    name="tel"
                    id="tel"
                    placeholder="Telefon Numarası"
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  />
                </div>
                <div className="relative flex w-full flex-col items-start justify-start gap-1">
                  <label
                    htmlFor="title"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Ülke(*)
                  </label>
                  <div
                    className="min-w-4 w-full rounded-[20px] border-[1px] border-solid border-color-dark-primary border-opacity-10 py-[15px]
              px-[22px] transition-all duration-300 focus:border-color-main"
                  >
                    <select
                      name=""
                      id=""
                      className="w-full cursor-pointer text-lg text-opacity-50 outline-none"
                      onChange={onCountryChange}
                    >
                      <option value="" selected>
                        Ülke Seç
                      </option>
                      {countries.map((Country) => {
                        return (
                          <option
                            key={Country.id}
                            selected={country === Country.name}
                            value={JSON.stringify(Country)}
                          >
                            {Country.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="relative flex w-full flex-col items-start justify-start gap-1">
                  <label
                    htmlFor="title"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Şehir(*)
                  </label>
                  <div
                    className="min-w-4 w-full rounded-[20px] border-[1px] border-solid border-color-dark-primary border-opacity-10 py-[15px]
              px-[22px] transition-all duration-300 focus:border-color-main"
                  >
                    <select
                      name=""
                      id=""
                      className="w-full cursor-pointer text-lg text-opacity-50 outline-none"
                      onChange={onStateChange}
                    >
                      <option value="" selected>
                        Şehir Seç
                      </option>
                      {filteredStates?.map((State) => {
                        return (
                          <option
                            key={State.id}
                            selected={state === State.name}
                            value={JSON.stringify(State)}
                          >
                            {State.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                {/* <div className="relative flex w-full flex-col items-start justify-start gap-1">
                  <label
                    htmlFor="title"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Şehir(*)
                  </label>
                  <div
                    className="min-w-4 w-full rounded-[20px] border-[1px] border-solid border-color-dark-primary border-opacity-10 py-[15px]
              px-[22px] transition-all duration-300 focus:border-color-main"
                  >
                    <select
                      name=""
                      id=""
                      className="w-full cursor-pointer text-lg text-opacity-50 outline-none"
                      onChange={onCityChange}
                    >
                      <option value="" selected>
                        Şehir Seç
                      </option>
                      {filteredCities?.map((City) => {
                        return (
                          <option
                            key={City.id}
                            selected={city === City}
                            value={JSON.stringify(City)}
                          >
                            {City.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div> */}

                <div className="flex w-full flex-col items-start justify-start gap-1">
                  <label
                    htmlFor="postalCode"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Posta Kodu(*)
                  </label>
                  <input
                    onChange={handlePostalCodeChange}
                    value={postalCode}
                    type="number"
                    name="postalCode"
                    id="postalCode"
                    placeholder="Posta Kodu"
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  />
                </div>
                <div className="flex w-full flex-col items-start justify-center gap-1">
                  <div className="flex w-full flex-col items-start justify-center gap-1">
                    <label
                      htmlFor="company"
                      className="font-bold text-color-dark-primary opacity-50"
                    >
                      Firma Adı
                    </label>
                    {company !== "" && company !== undefined ? (
                      <div
                        className="group flex cursor-pointer items-center justify-center gap-2 rounded-[15px]
                    bg-color-gray-primary p-2 px-6
                    transition-all duration-300 hover:bg-color-main"
                        onClick={() => {
                          setCompany("");
                          setCompanyObject(undefined);
                        }}
                      >
                        <h1
                          className="text-sm font-bold 
                                    text-color-dark-primary text-opacity-80
                                  transition-all duration-300 group-hover:text-color-white"
                        >
                          {company}
                        </h1>
                        <AiOutlineCloseCircle className="text-color-dark-primary transition-all duration-300 group-hover:text-color-white" />
                      </div>
                    ) : (
                      <div
                        className="min-w-4 w-full rounded-[20px] border-[1px] border-solid border-color-dark-primary border-opacity-10 py-[15px]
              px-[22px] transition-all duration-300 focus:border-color-main"
                      >
                        <select
                          name=""
                          id=""
                          className="w-full cursor-pointer text-lg text-opacity-50 outline-none"
                          onChange={onFirmChange}
                        >
                          <option value="" selected>
                            Firma Seç
                          </option>
                          {firms.map((Firm) => {
                            return (
                              <option
                                key={Firm._id}
                                value={JSON.stringify(Firm)}
                              >
                                {Firm.firm_title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    )}
                  </div>
                  {companyObject === undefined ? (
                    <div className="flex w-full flex-col items-start justify-center gap-1">
                      <label
                        htmlFor="company"
                        className="font-bold text-color-dark-primary opacity-50"
                      >
                        Firma Adı(Diğer)
                      </label>
                      <input
                        onChange={handleCompanyChange}
                        value={company}
                        type="text"
                        name="company"
                        id="company"
                        placeholder="Firma Adı"
                        className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="flex w-full flex-col items-start justify-center gap-1">
                  <label
                    htmlFor="physicalLocation"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Açık Adres(*)
                  </label>
                  <textarea
                    onChange={handlePhysicalLocationChange}
                    value={physicalLocation}
                    rows={4}
                    cols={50}
                    name="physicalLocation"
                    id="physicalLocation"
                    placeholder="Fiziksel Lokasyon"
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  />
                </div>
                <div className="flex w-full flex-col items-start justify-center gap-1">
                  <label
                    htmlFor="aboutMe"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Hakkımda(*)
                  </label>
                  <textarea
                    onChange={handleAboutMeChange}
                    value={aboutMe}
                    rows={4}
                    cols={50}
                    name="aboutMe"
                    id="aboutMe"
                    placeholder="Hakkımda"
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  />
                </div>
                <div className="flex w-full flex-col items-start justify-center gap-1">
                  <label
                    htmlFor="extraInformation"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Ekstra Bilgi(*)
                  </label>
                  <textarea
                    onChange={handleAdditionalInformationChange}
                    value={additionalInformation}
                    rows={4}
                    cols={50}
                    name="extraInformation"
                    id="extraInformation"
                    placeholder="Ekstra Bilgi"
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  />
                </div>
                <div className="flex w-full flex-col items-start justify-center gap-1">
                  <label
                    htmlFor="training"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Eğitim Geçmişi(*)
                  </label>
                  <textarea
                    onChange={handleTrainingChange}
                    value={training}
                    rows={4}
                    cols={50}
                    name="training"
                    id="training"
                    placeholder="Eğitim Geçmişi"
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  />
                </div>
                <div className="flex w-full flex-col items-start justify-center gap-1">
                  <label
                    htmlFor="aboutMe"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Tecrübeler(*)
                  </label>
                  <textarea
                    onChange={handleExperienceChange}
                    value={experience}
                    rows={4}
                    cols={50}
                    name="experience"
                    id="experience"
                    placeholder="Tecrübeler"
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  />
                </div>
                <div className="flex items-end justify-center gap-4">
                  <div className="flex w-full flex-col items-start justify-start gap-1">
                    <label
                      htmlFor="social"
                      className="font-bold text-color-dark-primary opacity-50"
                    >
                      Sosyal Medya
                    </label>
                    <input
                      onChange={handleSocialChange}
                      value={social}
                      type="text"
                      name="social"
                      id="social"
                      placeholder="Sosyal Medya"
                      className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSocial}
                    className="flex items-center justify-center rounded-[10px] bg-color-secondary p-4 transition-all 
                duration-300 hover:bg-opacity-80"
                  >
                    <h1 className="text-sm font-bold text-color-white">Ekle</h1>
                  </button>
                </div>
              </div>

              <div className="flex w-full flex-col items-start justify-start gap-4">
                <div className="flex w-full flex-col items-start justify-start gap-10 md:flex-row">
                  <div className="relative h-[200px] min-w-[200px] rounded-[20px]">
                    {profileImageBase64 ? (
                      <img
                        src={`data:image/jpeg;base64,${profileImageBase64}`}
                        alt=""
                        className="h-full w-full rounded-[20px]"
                      />
                    ) : (
                      <img
                        src={require("../../../../../assets/images/doc_pp.jpg")}
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
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex items-center justify-center gap-1">
                        <h1 className="text-lg font-bold uppercase text-color-dark-primary text-opacity-50">
                          {authExpertObject && authExpertObject?.expert_title
                            ? authExpertObject?.expert_title.title_title
                            : ""}
                        </h1>
                        <h1 className="text-base uppercase text-color-dark-primary">
                          {authExpertObject?.expert_name}
                        </h1>
                      </div>
                      {authExpertObject?.expert_reference_from !== undefined ? (
                        <div className="flex items-center justify-center gap-2">
                          <VscReferences className="text-[18px] text-color-main" />
                          <Link
                            to={`/doctors/${authExpertObject?.expert_reference_from._id}`}
                            className="text-color-link"
                            target="_blank"
                          >
                            <h1 className="">{`${authExpertObject?.expert_reference_from.expert_name} ${authExpertObject?.expert_reference_from.expert_surname}`}</h1>
                          </Link>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <h1 className="font-bold text-color-dark-primary opacity-50">
                        Uzmanlık:
                      </h1>
                      <h1 className="text-base font-bold uppercase text-color-dark-primary">
                        {authExpertObject && authExpertObject.expert_expertise
                          ? authExpertObject.expert_expertise.expertise_title
                          : ""}
                      </h1>
                    </div>
                    <p className="font-bold text-color-dark-primary text-opacity-50">
                      {authExpertObject && authExpertObject?.expert_about_me
                        ? authExpertObject?.expert_about_me
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <h1 className="font-bold text-color-dark-primary opacity-50">
                    Branşlarım
                  </h1>
                  {currentBranches.length === 0 ? (
                    <h1>Henüz bir şey yok.</h1>
                  ) : (
                    <ul className="flex max-w-[450px] flex-wrap items-start justify-start gap-2">
                      {currentBranches.map((branch) => {
                        return (
                          <li
                            className="group flex cursor-pointer items-center justify-center gap-2 rounded-[15px]
                        bg-color-gray-primary p-2 px-6
                        transition-all duration-300 hover:bg-color-main"
                            onClick={() => handleRemoveBranch(branch._id)}
                          >
                            <h1
                              className="text-sm font-bold 
                                    text-color-dark-primary text-opacity-80
                                  transition-all duration-300 group-hover:text-color-white"
                            >
                              {branch.branch_title}
                            </h1>
                            <AiOutlineCloseCircle className="text-color-dark-primary transition-all duration-300 group-hover:text-color-white" />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <h1 className="font-bold text-color-dark-primary opacity-50">
                    Sosyal Medyalarım
                  </h1>
                  {socials?.length === 0 ? (
                    <h1>Henüz bir şey yok.</h1>
                  ) : (
                    <ul className="flex max-w-[450px] flex-wrap items-start justify-start gap-2">
                      {socials?.map((Social) => {
                        return (
                          <li
                            className="group flex cursor-pointer items-center justify-center gap-4 rounded-[15px]
                            bg-color-gray-primary p-2 px-6
                            transition-all duration-300 hover:bg-color-main"
                            onClick={() => handleRemoveSocial(Social)}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <SocialIcon
                                url={`${Social}`}
                                style={{ height: "25px", width: "25px" }}
                              />
                              <h1
                                className="text-sm font-bold 
                                    text-color-dark-primary text-opacity-80
                                  transition-all duration-300 group-hover:text-color-white"
                              >
                                {Social}
                              </h1>
                            </div>
                            <AiOutlineCloseCircle className="text-[24px] text-color-dark-primary transition-all duration-300 group-hover:text-color-white" />
                          </li>
                        );
                      })}
                    </ul>
                  )}
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
                  <h1 className="text-lg text-color-white">
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

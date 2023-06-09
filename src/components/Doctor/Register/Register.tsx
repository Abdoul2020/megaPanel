import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { AiFillEye, AiOutlineCloseCircle } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { FaStethoscope } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AuthExpertRegisterDto } from "../../../common/dtos/auth/expert/authExpertRegisterDto.dto";
import { FirmFilterDto } from "../../../common/filters/FirmFilter.dto";
import { Alert } from "../../../common/types/Alert";
import { Branch } from "../../../common/types/Branch.entity";
import { Firm } from "../../../common/types/Firm.entity";
import { authExpertRegister } from "../../../features/authExpert/authExpertAPI";
import { fetchFirms } from "../../../features/firms/firmsAPI";
import { updateAlert } from "../../../features/options/optionsSlice";
import { isAuthExpert } from "../../../helpers/authExpertHelper";
import { isAuth } from "../../../helpers/authHelper";

type Props = {};

export default function Register({}: Props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companyObject, setCompanyObject] = useState<Firm | undefined>(
    undefined
  );
  const [accountType, setAccountType] = useState(0);
  const [currentBranches, setCurrentBranches] = useState<Branch[] | []>([]);
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");

  const [loader, setLoader] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);

  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

  const [referenceId, setReferenceId] = useState("");

  const branches = useAppSelector((state) => state.branches.branchesList);
  const [firms, setFirms] = useState<Firm[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthExpert() || isAuth()) {
      if (isAuthExpert()) {
        navigate("/experts");
      }
      if (isAuth()) {
        navigate("/");
      }
    }
    const paramName = searchParams.get("name");
    const paramSurname = searchParams.get("surname");
    const paramCompany = searchParams.get("company");
    setName(paramName !== null ? paramName : "");
    setSurname(paramSurname !== null ? paramSurname : "");
    setCompany(paramCompany !== null ? paramCompany : "");
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

  const [passwordHide, setPasswordHide] = useState(true);
  const [passwordRetypeHide, setPasswordRetypeHide] = useState(true);

  // Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      name === "" ||
      surname === "" ||
      email === "" ||
      currentBranches.length === 0 ||
      password === "" ||
      passwordRetype === "" ||
      accountType === 0 ||
      (accountType === 2 && company === "")
    ) {
      const alert: Alert = {
        type: "danger",
        text: "Boş alan bırakmayınız",
        active: true,
        statusCode: 400,
      };
      dispatch(updateAlert(alert));
    } else {
      if (password === passwordRetype) {
        const body: AuthExpertRegisterDto = {
          expert_name: name,
          expert_surname: surname,
          expert_company: company,
          expert_branch: currentBranches,
          expert_email: email,
          expert_password: password,
          expert_retype_password: passwordRetype,
          expert_reference_from: referenceId !== "" ? referenceId : undefined,
          expert_account_type: accountType,
        };
        setLoader(true);
        setSubmitDisable(true);
        const response = await authExpertRegister(body);
        setLoader(false);
        setSubmitDisable(false);
        if (response.success === true) {
          navigate("/experts/login");
          const alert: Alert = {
            type: "success",
            text: "Kayıt Başarılı",
            active: true,
            statusCode: response.data.statusCode,
          };
          dispatch(updateAlert(alert));
        } else {
          const alert: Alert = {
            type: "danger",
            text: response.data.response.data.message,
            active: true,
            statusCode: response.data.response.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
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

  // Input Changes
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
    if (companyObject !== undefined) {
      setCompanyObject(undefined);
    }
    const value = e.target.value;
    setCompany(value);
  };
  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);
  };
  const handlePasswordRetypeChange = (e: any) => {
    const value = e.target.value;
    setPasswordRetype(value);
  };
  const handleReferenceIdChange = (e: any) => {
    const value = e.target.value;
    setReferenceId(value);
  };
  // Password Hide
  const handlePasswordHide = () => {
    setPasswordHide((value) => !value);
  };
  const handlePasswordRetypeHide = () => {
    setPasswordRetypeHide((value) => !value);
  };

  const handleRemoveBranch = (id: string) => {
    setCurrentBranches((oldArray) =>
      oldArray.filter((branch) => branch._id !== id)
    );
  };
  // Branch
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
  };
  // Firm
  const onFirmChange = (e: any) => {
    const valueRaw = e.target.value;
    const value: Firm = JSON.parse(valueRaw);
    setCompanyObject(value);
    setCompany(value.firm_title);
  };
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-color-white-secondary py-10 px-10 pt-[130px] xl:px-0">
      <div className="z-20 flex w-full grid-cols-2 items-start justify-start gap-10 lg:grid xl:w-2/3">
        <div className="relative flex w-full flex-col items-center justify-center gap-8">
          <div className="absolute top-[15px] right-[15px] rounded-full bg-doctor-color-main p-2">
            <FaStethoscope className="text-[12px] text-color-white" />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-6 rounded-[25px] bg-color-white p-8 px-10 shadow-lg">
            <h1 className="text-xl font-bold text-color-dark-primary opacity-80">
              <span className="text-color-main">Uzman</span> Olarak Kayıt Ol
            </h1>
            <form
              className="flex w-full flex-col items-start justify-center gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="flex w-full flex-col items-start justify-center gap-1">
                  <label
                    htmlFor="name"
                    className="font-bold text-color-dark-primary opacity-50"
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
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  />
                </div>
                <div className="flex w-full flex-col items-start justify-center gap-1">
                  <label
                    htmlFor="surname"
                    className="font-bold text-color-dark-primary opacity-50"
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
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  />
                </div>
              </div>
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
              <div className="flex w-full grid-cols-2 flex-col items-start justify-center gap-4 gap-y-4 sm:flex-row">
                <div className="relative flex w-full flex-col items-start justify-start gap-1">
                  <label
                    htmlFor="branch"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Branş
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
                <div className="flex w-full flex-col items-start justify-start gap-2">
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
                            key={branch._id}
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
              </div>
              <div className="flex flex-col items-start justify-start gap-2">
                <label className="font-bold text-color-dark-primary opacity-50">
                  Hesap Türü
                </label>

                <div className="flex items-center justify-center gap-2">
                  <input
                    onClick={() => setAccountType(1)}
                    className="form-check-input float-left
                   h-6 w-6 cursor-pointer appearance-none rounded-md
                   border border-solid border-color-main bg-color-white bg-contain bg-center bg-no-repeat
                   transition-all
                   duration-300 checked:border-none checked:bg-color-main focus:outline-none"
                    type="checkbox"
                    checked={accountType === 1}
                    id="remindme"
                  />
                  <label htmlFor="remindme">
                    <h1 className="font-bold text-color-dark-primary opacity-50">
                      Bireysel
                    </h1>
                  </label>
                  <input
                    onClick={() => setAccountType(2)}
                    className="form-check-input float-left
                   h-6 w-6 cursor-pointer appearance-none rounded-md
                   border border-solid border-color-main bg-color-white bg-contain bg-center bg-no-repeat
                   transition-all
                   duration-300 checked:border-none checked:bg-color-main focus:outline-none"
                    type="checkbox"
                    checked={accountType === 2}
                    id="remindme"
                  />
                  <label htmlFor="remindme">
                    <h1 className="font-bold text-color-dark-primary opacity-50">
                      Kurumsal
                    </h1>
                  </label>
                </div>
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-4">
                {accountType === 2 ? (
                  <div className="flex w-full flex-col items-start justify-center gap-1">
                    <label
                      htmlFor="company"
                      className="font-bold text-color-dark-primary opacity-50"
                    >
                      Kurumsal Adınız
                    </label>
                    <input
                      onChange={handleCompanyChange}
                      value={company}
                      type="text"
                      name="company"
                      id="company"
                      placeholder="Kurumsal Adınız"
                      className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                    />
                  </div>
                ) : (
                  <div className="hidden"></div>
                )}
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-1">
                <label
                  htmlFor="password"
                  className="font-bold text-color-dark-primary opacity-50"
                >
                  Şifreniz
                </label>
                <div className="relative w-full">
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
                  Şifre Tekrar
                </label>
                <div className="relative w-full">
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
              <div className="flex w-full items-start justify-start">
                <div className="flex flex-col items-start justify-center gap-1">
                  <label
                    htmlFor="referenceId"
                    className="font-bold text-color-dark-primary opacity-50"
                  >
                    Referans Kodu (Opsiyonel)
                  </label>
                  <input
                    onChange={handleReferenceIdChange}
                    value={referenceId}
                    type="text"
                    name="referenceId"
                    id="referenceId"
                    placeholder="Referans Kodunu Gir"
                    className="w-full rounded-[20px] border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
                text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
                  />
                </div>
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
                      Kayıt Ol
                    </h1>
                    <BsArrowRight className="text-[24px] text-color-white-secondary" />
                  </div>
                )}
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-base text-color-dark-primary opacity-50">
              Zaten üye misiniz?
            </h1>
            <Link to="/experts/login">
              <h1 className="text-lg text-color-main opacity-80">Giriş Yap</h1>
            </Link>
          </div>
        </div>
        <div className="hidden flex-col items-start justify-start gap-10 rounded-[15px] p-4 lg:flex">
          <h1 className="text-xl font-bold">
            Dünyanın her yerinden danışanlara ulaşmak için{" "}
            <span className="text-color-main">hemen kayıt olun!</span>
          </h1>
          <ul className="flex flex-col items-start justify-center gap-10">
            <li className="flex flex-col items-start justify-center gap-4">
              <div className="flex items-center justify-center gap-6">
                <div className="rounded-xl border-4 border-solid border-color-main p-2">
                  <img
                    src={require("../../../assets/images/doktorbul.png")}
                    alt=""
                    className="w-[36px]"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-xl font-bold text-color-dark-primary">
                    <CountUp end={8712} duration={1} />
                  </h1>
                  <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      ease: "backInOut",
                      duration: 0.3,
                      reapat: 1,
                    }}
                    viewport={{ once: true }}
                    className="text-color-dark-primary opacity-70"
                  >
                    Aktif Uzman
                  </motion.h1>
                </div>
              </div>
              <h1 className="text-color-dark-primary opacity-70">
                Hizmet veren aktif uzman sayımız.
              </h1>
            </li>
            <li className="flex flex-col items-start justify-center gap-4">
              <div className="flex items-center justify-center gap-6">
                <div className="rounded-xl border-4 border-solid border-color-main p-2">
                  <IoIosPerson className="text-[36px] text-color-main" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-xl font-bold text-color-dark-primary">
                    <CountUp end={2790270} duration={1} />
                  </h1>
                  <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      ease: "backInOut",
                      duration: 0.3,
                      reapat: 1,
                    }}
                    viewport={{ once: true }}
                    className="text-color-dark-primary opacity-70"
                  >
                    Danışan
                  </motion.h1>
                </div>
              </div>
              <h1 className="text-color-dark-primary opacity-70">
                Her geçen gün artan danışan sayımız.
              </h1>
            </li>
            <li className="flex flex-col items-start justify-center gap-4">
              <div className="flex items-center justify-center gap-6">
                <div className="rounded-xl border-4 border-solid border-color-main p-2">
                  <img
                    src={require("../../../assets/images/yuzyuzerandevu.png")}
                    alt=""
                    className="w-[36px]"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-xl font-bold text-color-dark-primary">
                    <CountUp end={2270127} duration={1} />
                  </h1>
                  <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      ease: "backInOut",
                      duration: 0.3,
                      reapat: 1,
                    }}
                    viewport={{ once: true }}
                    className="text-color-dark-primary opacity-70"
                  >
                    Planlı Randevu
                  </motion.h1>
                </div>
              </div>
              <h1 className="text-color-dark-primary opacity-70">
                Gerçekleşecek görüşme sayısı.
              </h1>
            </li>
            <li className="flex flex-col items-start justify-center gap-4">
              <div className="flex items-center justify-center gap-6">
                <div className="rounded-xl border-4 border-solid border-color-main p-2">
                  <img
                    src={require("../../../assets/images/onlinegorusme.png")}
                    alt=""
                    className="w-[36px]"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-xl font-bold text-color-dark-primary">
                    <CountUp end={41568} duration={1} />
                  </h1>
                  <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      ease: "backInOut",
                      duration: 0.3,
                      reapat: 1,
                    }}
                    viewport={{ once: true }}
                    className="text-color-dark-primary opacity-70"
                  >
                    Seans
                  </motion.h1>
                </div>
              </div>
              <h1 className="text-color-dark-primary opacity-70">
                Şu ana kadar gerçekleştirilen seans sayısı.
              </h1>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

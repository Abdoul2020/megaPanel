import React, { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import {
  FaClinicMedical,
  FaFilePrescription,
  FaHeartbeat,
} from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { AiFillEye, AiOutlineCloseCircle } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Alert } from "../../../common/types/Alert";
import { updateAlert } from "../../../features/options/optionsSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { isAuthExpert } from "../../../helpers/authExpertHelper";
import { BiLoaderAlt } from "react-icons/bi";
import { AuthExpertRegisterDto } from "../../../common/dtos/auth/expert/authExpertRegisterDto.dto";
import { authExpertRegister } from "../../../features/authExpert/authExpertAPI";
import { Branch } from "../../../common/types/Branch.entity";

type Props = {};

export default function Register({}: Props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [currentBranches, setCurrentBranches] = useState<Branch[] | []>([]);
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");

  const [loader, setLoader] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);

  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

  const branches = useAppSelector((state) => state.branches.branchesList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthExpert()) {
      navigate("/for-doctors");
    }
    const paramName = searchParams.get("name");
    const paramSurname = searchParams.get("surname");
    const paramCompany = searchParams.get("company");
    setName(paramName !== null ? paramName : "");
    setSurname(paramSurname !== null ? paramSurname : "");
    setCompany(paramCompany !== null ? paramCompany : "");
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
      company === "" ||
      currentBranches.length === 0 ||
      password === "" ||
      passwordRetype === ""
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
        };
        setLoader(true);
        setSubmitDisable(true);
        const response = await authExpertRegister(body);
        setLoader(false);
        setSubmitDisable(false);
        if (response.success === true) {
          navigate("/for-doctors/login");
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
    console.log(currentBranches);
  };
  return (
    <div className="relative h-screen w-full flex justify-center items-center bg-color-white-secondary pt-20">
      <div className="z-20 w-2/3 grid grid-cols-2 gap-10">
        <div className="flex flex-col justify-center items-center gap-8 w-full">
          <div className="flex flex-col justify-center items-start gap-6 p-8 px-10 bg-color-white shadow-lg rounded-[25px] w-full">
            <h1 className="text-xl text-color-dark-primary font-bold opacity-80">
              Ücretsiz Dene
            </h1>
            <form
              className="flex flex-col justify-center items-start gap-4 w-full"
              onSubmit={handleSubmit}
            >
              <div className="w-full flex justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-start gap-1 w-full">
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
                <div className="flex flex-col justify-center items-start gap-1 w-full">
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
              </div>
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
              <div className="grid grid-cols-2 w-full">
                <div className="flex flex-col justify-start items-start gap-2 py-4">
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
              <div className="flex flex-col justify-center items-start gap-1 w-full">
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
                  htmlFor="password"
                  className="text-color-dark-primary opacity-50 font-bold"
                >
                  Şifreniz
                </label>
                <div className="w-full relative">
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
                  Şifre Tekrar
                </label>
                <div className="w-full relative">
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
                      Kayıt Ol
                    </h1>
                    <BsArrowRight className="text-color-white-secondary text-[24px]" />
                  </div>
                )}
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-color-dark-primary opacity-50 text-base">
              Zaten üye misiniz?
            </h1>
            <Link to="/for-doctors/login">
              <h1 className="text-lg text-color-main opacity-80">Giriş Yap</h1>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-10 p-4 rounded-[15px]">
          <h1 className="text-xl font-bold">
            Her branştan alanında uzmanlar ile{" "}
            <span className="text-color-main">
              online olarak hemen görüşün!
            </span>
          </h1>
          <ul className="flex flex-col justify-center items-start gap-10">
            <li className="flex flex-col justify-center items-start gap-4">
              <div className="flex justify-center items-center gap-6">
                <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                  <FaClinicMedical className="text-[36px] text-color-main" />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <h1 className="text-xl text-color-dark-primary font-bold">
                    8712
                  </h1>
                  <h1 className="text-color-dark-primary opacity-70">
                    Aktif Klinik
                  </h1>
                </div>
              </div>
              <h1 className="text-color-dark-primary opacity-70">
                Hizmet vermiş olduğumuz klinik sayısı.
              </h1>
            </li>
            <li className="flex flex-col justify-center items-start gap-4">
              <div className="flex justify-center items-center gap-6">
                <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                  <IoIosPerson className="text-[36px] text-color-main" />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <h1 className="text-xl text-color-dark-primary font-bold">
                    2790270
                  </h1>
                  <h1 className="text-color-dark-primary opacity-70">Hasta</h1>
                </div>
              </div>
              <h1 className="text-color-dark-primary opacity-70">
                Hekimlerimiz tarafından işlem yapılan hasta sayısı.
              </h1>
            </li>
            <li className="flex flex-col justify-center items-start gap-4">
              <div className="flex justify-center items-center gap-6">
                <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                  <FaFilePrescription className="text-[36px] text-color-main" />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <h1 className="text-xl text-color-dark-primary font-bold">
                    227172
                  </h1>
                  <h1 className="text-color-dark-primary opacity-70">Reçete</h1>
                </div>
              </div>
              <h1 className="text-color-dark-primary opacity-70">
                e-Reçete sistemine gönderilen reçete sayısı.
              </h1>
            </li>
            <li className="flex flex-col justify-center items-start gap-4">
              <div className="flex justify-center items-center gap-6">
                <div className="p-2 border-4 border-solid border-color-main rounded-xl">
                  <FaHeartbeat className="text-[36px] text-color-main" />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <h1 className="text-xl text-color-dark-primary font-bold">
                    418866
                  </h1>
                  <h1 className="text-color-dark-primary opacity-70">
                    SağlıkNet
                  </h1>
                </div>
              </div>
              <h1 className="text-color-dark-primary opacity-70">
                Sağlık Bakanlığ'ına gönderilen hasta sayısı.
              </h1>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

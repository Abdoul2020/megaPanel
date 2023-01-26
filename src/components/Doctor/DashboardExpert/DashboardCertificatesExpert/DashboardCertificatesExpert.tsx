import Dialog from "@mui/material/Dialog";
import { ChangeEvent, useEffect, useState } from "react";
import { AiFillFilePdf, AiOutlineCloseCircle } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Alert } from "../../../../common/types/Alert";
import { Firm } from "../../../../common/types/Firm.entity";
import { authExpertUploadCertificatePdf } from "../../../../features/authExpert/authExpertAPI";
import {
  addAuthExpertCertificates,
  addAuthExpertObject
} from "../../../../features/authExpert/authExpertSlice";
import { fetchCertificates } from "../../../../features/certificates/certificatesAPI";
import { updateAlert } from "../../../../features/options/optionsSlice";
import {
  getCookie,
  unauthenticateExpert
} from "../../../../helpers/authExpertHelper";
import DashboardCertificateExpert from "./DashboardCertificateExpert/DashboardCertificateExpert";

type Props = {};

export default function DashboardCertificatesExpert({}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const authExpertCertificates = useAppSelector(
    (state) => state.authexpert.auth_expert_certificates
  );
  const firms = useAppSelector((state) => state.firms.firmsList);

  useEffect(() => {
    async function fetchData() {
      const authExpertCertificatesResponse = await fetchCertificates(
        authExpertObject?._id
      );
      const authExpertCertificatesSuccess =
        authExpertCertificatesResponse.success;
      if (authExpertCertificatesSuccess) {
        dispatch(
          addAuthExpertCertificates(authExpertCertificatesResponse.data.data)
        );
      } else {
        // console.log({ authExpertCertificatesResponse });
        const alert: Alert = {
          type: "danger",
          text: "Bir sorun oluştu.",
          active: true,
          statusCode: 500,
        };
        dispatch(updateAlert(alert));
      }
    }
    fetchData();
  }, [authExpertObject]);

  const [file, setFile] = useState<File | null>(null);
  const [fileLoader, setFileLoader] = useState(false);
  const [fileSubmitDisable, setFileSubmitDisable] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [companyObject, setCompanyObject] = useState<Firm | undefined>(
    undefined
  );
  const [certificateTitle, setCertificateTitle] = useState("");
  const [loader, setLoader] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);

  const handleCompanyChange = (e: any) => {
    if (companyObject !== undefined) {
      setCompanyObject(undefined);
    }
    const value = e.target.value;
    setCompany(value);
  };

  const onFirmChange = (e: any) => {
    const valueRaw = e.target.value;
    const value: Firm = JSON.parse(valueRaw);
    setCompanyObject(value);
    setCompany(value.firm_title);
  };

  const handleCertificateTitleChange = (e: any) => {
    const value = e.target.value;
    setCertificateTitle(value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const theFile = e.target.files[0];
      if (theFile.type === "application/pdf") {
        setFile(theFile);
      } else {
        const alert: Alert = {
          type: "danger",
          text: "Yüklenecek dosya pdf olmalıdır.",
          active: true,
          statusCode: 400,
        };
        dispatch(updateAlert(alert));
      }
    }
    e.target.value = "";
  };
  // useEffect(() => {
  //   async function postData() {
  //     const tokenExpert = getCookie("m_e_t");
  //     setFileLoader(true);
  //     setFileSubmitDisable(true);
  //     const uploadCertificatePdfResponse = await authExpertUploadCertificatePdf(
  //       tokenExpert,
  //       file
  //     );
  //     setFileLoader(false);
  //     setFileSubmitDisable(false);
  //     const uploadCertificateSuccess = uploadCertificatePdfResponse.success;
  //     if (uploadCertificateSuccess) {
  //       const alert: Alert = {
  //         type: "success",
  //         text: "Sertifika başarıyla yüklendi.",
  //         active: true,
  //         statusCode: 200,
  //       };
  //       dispatch(updateAlert(alert));
  //       dispatch(addAuthExpertObject(uploadCertificatePdfResponse.data.data));
  //     } else {
  //       const alert: Alert = {
  //         type: "danger",
  //         text: uploadCertificatePdfResponse.data.response.data.message,
  //         active: true,
  //         statusCode: 500,
  //       };
  //       dispatch(updateAlert(alert));
  //     }
  //   }
  //   if (file !== null) {
  //     postData();
  //     setFile(null);
  //   }
  // }, [file]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    async function postData() {
      const tokenExpert = getCookie("m_e_t");
      setLoader(true);
      setSubmitDisable(true);
      const uploadCertificatePdfResponse = await authExpertUploadCertificatePdf(
        tokenExpert,
        file,
        company,
        certificateTitle
      );
      setLoader(false);
      setSubmitDisable(false);
      setDialogOpen(false);
      const uploadCertificateSuccess = uploadCertificatePdfResponse.success;
      if (uploadCertificateSuccess) {
        const alert: Alert = {
          type: "success",
          text: "Sertifika başarıyla yüklendi.",
          active: true,
          statusCode: 200,
        };
        dispatch(updateAlert(alert));
        dispatch(addAuthExpertObject(uploadCertificatePdfResponse.data.data));
      } else {
        if (
          uploadCertificatePdfResponse.data.response.data.message &&
          uploadCertificatePdfResponse.data.response.data.message ===
            "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode: uploadCertificatePdfResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthExpertObject(undefined));
          unauthenticateExpert(navigate("/for-doctors/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: uploadCertificatePdfResponse.data.response.data.message,
            active: true,
            statusCode: uploadCertificatePdfResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
      }
    }
    if (file !== null && company !== "" && certificateTitle !== "") {
      postData();
      setFile(null);
    } else {
      const alert: Alert = {
        type: "danger",
        text: "Boş alan bırakmayınız.",
        active: true,
        statusCode: 500,
      };
      dispatch(updateAlert(alert));
    }
  };
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      {/* <div className="w-full rounded-[15px] bg-color-warning-primary">
        {authExpertObject?.expert_certificates !== undefined &&
        authExpertObject?.expert_certificates.length > 0 ? (
          <div></div>
        ) : (
          <AlertHeaderWarning
            alertHeader={{
              type: "warning",
              text: "Randevu almaya başlamanız için hesap bilgilerinizi tamamlamanız gerekmektedir.",
            }}
          />
        )}
      </div> */}
      <div className="flex w-full flex-col items-start justify-start gap-12">
        <h1 className="font-bold text-color-dark-primary">Sertifikalarım</h1>
        <div className="flex min-h-[85vh] w-full flex-col items-start justify-start gap-6 rounded-[25px] bg-color-white p-5 shadow-lg">
          <button
            disabled={fileSubmitDisable}
            onClick={handleDialogOpen}
            className="flex items-center justify-center gap-2 rounded-[15px] bg-color-main p-2 px-4"
          >
            <BsPlusLg
              className="text-[18px] text-color-white
    hover:cursor-pointer font-bold"
            />
            <h1 className="text-color-white">Dosya Yükle</h1>
          </button>
          <ul className="flex w-full flex-col items-start justify-start gap-10">
            {authExpertCertificates.map((certificate) => {
              return (
                <DashboardCertificateExpert
                  key={certificate._id}
                  certificate={certificate}
                />
              );
            })}
          </ul>
        </div>
      </div>
      <Dialog onClose={handleDialogClose} open={dialogOpen}>
        <div className="flex flex-col items-start justify-start gap-4 rounded-[15px] bg-color-white p-10">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-start justify-start gap-4"
          >
            <div className="flex w-full flex-col items-start justify-center gap-1">
              <label
                htmlFor="certificateTitle"
                className="font-bold text-color-dark-primary opacity-50"
              >
                Sertifika Başlık
              </label>
              <input
                onChange={handleCertificateTitleChange}
                value={certificateTitle}
                type="text"
                name="certificateTitle"
                id="certificateTitle"
                placeholder="Sertifika Başlığı"
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
                {company !== "" ? (
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
                          <option key={Firm._id} value={JSON.stringify(Firm)}>
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
            <div>
              <label htmlFor="pdf" className="hover:cursor-pointer">
                {fileLoader ? (
                  <div className="animate-spin">
                    <BiLoaderAlt className="text-[24px] text-color-main text-opacity-80 opacity-80" />
                  </div>
                ) : (
                  <div className="flex items-end justify-center gap-2">
                    <AiFillFilePdf
                      className={`text-[48px] ${
                        file !== null
                          ? "text-color-main opacity-80"
                          : "text-color-dark-primary opacity-50"
                      }`}
                    />
                    {file ? (
                      <h1 className="text-color-dark-primary">{file.name}</h1>
                    ) : (
                      <h1 className="text-color-dark-primary">
                        Sertifika yükleyin.
                      </h1>
                    )}
                  </div>
                )}
              </label>
              <input
                type="file"
                name="pdf"
                id="pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className="flex w-full items-center justify-center py-4">
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
      </Dialog>
    </div>
  );
}

import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../app/hooks";
import { Alert } from "../../../../../common/types/Alert";
import { Certificate } from "../../../../../common/types/Certificate.entity";
import {
  addAuthExpertObject,
  removeAuthExpertCertificate
} from "../../../../../features/authExpert/authExpertSlice";
import {
  fetchCertificatePdf,
  removeCertificatePdf
} from "../../../../../features/certificates/certificatesAPI";
import { updateAlert } from "../../../../../features/options/optionsSlice";
import { unauthenticateExpert } from "../../../../../helpers/authExpertHelper";
import { getCookie } from "../../../../../helpers/authHelper";

type Props = {
  key: string;
  certificate: Certificate;
};

export default function DashboardCertificateExpert(props: Props) {
  const navigate = useNavigate();

  const [certificatePdf, setCertificatePdf] = useState();
  const [certificatePdfLoader, setCertificatePdfLoader] = useState(false);
  const [removeButtonDisable, setRemoveButtonDisable] = useState(false);

  const dispatch = useAppDispatch();

  const handleOpenPdf = () => {
    let blob = new Blob([certificatePdf || ""], {
        type: "application/pdf",
      }),
      url = window.URL.createObjectURL(blob);
    window.open(url);
  };

  useEffect(() => {
    const tokenExpert = getCookie("m_e_t");
    async function fetchData() {
      setCertificatePdfLoader(true);
      const authExpertDownloadCertificatePdfResponse =
        await fetchCertificatePdf(props.certificate._id, tokenExpert);
      setCertificatePdfLoader(true);
      const authExpertCertificatePdfSuccess =
        authExpertDownloadCertificatePdfResponse.success;

      if (authExpertCertificatePdfSuccess) {
        const base64 = authExpertDownloadCertificatePdfResponse.data.data;
        setCertificatePdf(base64);
      } else {
        if (
          authExpertDownloadCertificatePdfResponse.data.response.data.message &&
          authExpertDownloadCertificatePdfResponse.data.response.data
            .message === "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode:
              authExpertDownloadCertificatePdfResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthExpertObject(undefined));
          unauthenticateExpert(navigate("/experts/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: authExpertDownloadCertificatePdfResponse.data.response.data
              .message,
            active: true,
            statusCode:
              authExpertDownloadCertificatePdfResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
      }
    }
    if (props.certificate && props.certificate.certificate_file_path !== "") {
      fetchData();
    }
  }, []);
  const handleRemoveCertificate = () => {
    async function fetchData() {
      const tokenExpert = getCookie("m_e_t");
      setRemoveButtonDisable(true);
      const removeCertificatePdfResponse = await removeCertificatePdf(
        props.certificate._id,
        tokenExpert
      );
      setRemoveButtonDisable(false);
      const removeCertificatePdfSuccess = removeCertificatePdfResponse.success;
      if (removeCertificatePdfSuccess) {
        dispatch(
          removeAuthExpertCertificate(removeCertificatePdfResponse.data.data)
        );
        const alert: Alert = {
          type: "success",
          text: "Sertifika başarıyla silindi.",
          active: true,
          statusCode: 200,
        };
        dispatch(updateAlert(alert));
      } else {
        if (
          removeCertificatePdfResponse.data.response.data.message &&
          removeCertificatePdfResponse.data.response.data.message ===
            "error:TokenExpiredError: jwt expired"
        ) {
          const alert: Alert = {
            type: "warning",
            text: "Oturum zaman aşımına uğradı",
            active: true,
            statusCode: removeCertificatePdfResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
          dispatch(addAuthExpertObject(undefined));
          unauthenticateExpert(navigate("/experts/login"));
        } else {
          const alert: Alert = {
            type: "danger",
            text: removeCertificatePdfResponse.data.response.data.message,
            active: true,
            statusCode: removeCertificatePdfResponse.data.statusCode,
          };
          dispatch(updateAlert(alert));
        }
      }
    }
    if (window.confirm("Bu sertifikayı silmek istediğinize emin misiniz?")) {
      fetchData();
    }
  };
  return (
    <div
      className={`flex w-full items-center justify-center
    border-[5px] border-solid p-4
   ${
     props.certificate.certificate_status === 0
       ? "border-color-warning-primary"
       : props.certificate.certificate_status === 1
       ? "border-color-success-primary"
       : "border-color-danger-primary"
   } rounded-[15px]`}
    >
      <div className="relative flex w-full items-start justify-start gap-10">
        <img
          src={require("../../../../../assets/images/PDF_file_icon.svg.png")}
          className="h-[150px] w-[150px] 
          hover:cursor-pointer"
          alt=""
          onClick={handleOpenPdf}
        />
        <div className="flex flex-col items-start justify-start gap-6">
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex flex-wrap items-start justify-start gap-2">
              <h1 className="font-bold text-color-dark-primary opacity-50">
                Başlık:
              </h1>
              <h1 className="font-bold text-color-dark-primary opacity-80">
                {props.certificate.certificate_title}
              </h1>
            </div>
            <div className="flex flex-wrap items-start justify-start gap-2">
              <h1 className="font-bold text-color-dark-primary opacity-50">
                Kurum:
              </h1>
              <h1 className="font-bold text-color-dark-primary opacity-80">
                {props.certificate.certificate_company}
              </h1>
            </div>
          </div>
          {props.certificate.certificate_status === 0 ? (
            <div className="rounded-[15px] bg-color-warning-primary p-1 px-3">
              <h1 className="font-bold text-color-white">Onay Bekleniyor</h1>
            </div>
          ) : props.certificate.certificate_status === 1 ? (
            <div className="rounded-[15px] bg-color-success-primary p-1 px-3">
              <h1 className="font-bold text-color-white">Onaylandı</h1>
            </div>
          ) : (
            <div className="rounded-[15px] bg-color-danger-primary p-1 px-3">
              <h1 className="font-bold text-color-white">Reddedildi</h1>
            </div>
          )}
          <button
            className={`absolute bottom-full left-full flex items-center
          justify-center rounded-full bg-color-white p-1 hover:cursor-pointer
          ${removeButtonDisable ? "opacity-80" : "opacity-100"}`}
            onClick={handleRemoveCertificate}
            disabled={removeButtonDisable}
          >
            <AiFillCloseCircle className="text-[28px] text-color-danger-dark" />
          </button>
        </div>
      </div>
    </div>
  );
}

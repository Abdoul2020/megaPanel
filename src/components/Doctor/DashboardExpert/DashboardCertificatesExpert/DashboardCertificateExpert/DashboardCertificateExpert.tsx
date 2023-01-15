import React, { useEffect, useState } from "react";
import { Certificate } from "../../../../../common/types/Certificate.entity";
import { Document, Page, Viewer } from "react-pdf";
import {
  fetchCertificatePdf,
  removeCertificatePdf,
} from "../../../../../features/certificates/certificatesAPI";
import { getCookie } from "../../../../../helpers/authHelper";
import { AiFillCloseCircle } from "react-icons/ai";
import { Alert } from "../../../../../common/types/Alert";
import { updateAlert } from "../../../../../features/options/optionsSlice";
import { useAppDispatch } from "../../../../../app/hooks";
import { removeAuthExpertCertificate } from "../../../../../features/authExpert/authExpertSlice";

type Props = {
  key: string;
  certificate: Certificate;
};

export default function DashboardCertificateExpert(props: Props) {
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
        console.log({ authExpertDownloadCertificatePdfResponse });
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
        console.log({ removeCertificatePdfResponse });
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
  };
  return (
    <div
      className={`min-w-[190px] p-4 border-[5px] border-solid
    flex justify-center items-center
   ${
     props.certificate.certificate_status === 0
       ? "border-color-warning-primary"
       : props.certificate.certificate_status === 1
       ? "border-color-success-primary"
       : "border-color-danger-primary"
   } rounded-[15px]`}
    >
      <div className="w-full relative flex flex-col justify-start items-center gap-2">
        <img
          src={require("../../../../../assets/images/PDF_file_icon.svg.png")}
          className="w-[75px] h-[75px] 
          hover:cursor-pointer"
          alt=""
          onClick={handleOpenPdf}
        />
        <h1 className="text-color-dark-primary opacity-80 font-bold">
          {props.certificate.certificate_title}
        </h1>
        {props.certificate.certificate_status === 0 ? (
          <div className="p-1 px-3 rounded-[15px] bg-color-warning-primary">
            <h1 className="font-bold text-color-white">Onay Bekleniyor</h1>
          </div>
        ) : props.certificate.certificate_status === 1 ? (
          <div className="p-1 px-3 rounded-[15px] bg-color-success-primary">
            <h1 className="font-bold text-color-white">Onaylandı</h1>
          </div>
        ) : (
          <div className="p-1 px-3 rounded-[15px] bg-color-danger-primary">
            <h1 className="font-bold text-color-white">Reddedildi</h1>
          </div>
        )}
        <button
          className={`absolute bottom-full left-full flex justify-center
          items-center p-1 rounded-full bg-color-white hover:cursor-pointer
          ${removeButtonDisable ? "opacity-80" : "opacity-100"}`}
          onClick={handleRemoveCertificate}
          disabled={removeButtonDisable}
        >
          <AiFillCloseCircle className="text-[24px] text-color-danger-dark" />
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useParams } from "react-router-dom";
import { Alert } from "../../../../common/types/Alert";
import { updateAlert } from "../../../../features/options/optionsSlice";
import { useAppDispatch } from "../../../../app/hooks";
import { fetchCertificatePdf } from "../../../../features/certificates/certificatesAPI";

type Props = {};

export default function DashboardCertificateDetailExpert({}: Props) {
  const [certificatePdfLoader, setCertificatePdfLoader] = useState(false);

  const { id } = useParams();
  const [certificatePdf, setCertificatePdf] = useState();
  const dispatch = useAppDispatch();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }
  useEffect(() => {
    async function fetchData() {
      setCertificatePdfLoader(true);
      const authExpertDownloadCertificatePdfResponse =
        await fetchCertificatePdf(id);
      setCertificatePdfLoader(false);
      const authExpertCertificatePdfSuccess =
        authExpertDownloadCertificatePdfResponse.success;

      if (authExpertCertificatePdfSuccess) {
        const base64 = authExpertDownloadCertificatePdfResponse.data.data;
        setCertificatePdf(base64);
      } else {
        const alert: Alert = {
          type: "danger",
          text: authExpertDownloadCertificatePdfResponse.data.response.data
            .message,
          active: true,
          statusCode: authExpertDownloadCertificatePdfResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
      }
    }
    fetchData();
  }, []);
  return (
    <div className="relative flex w-full flex-col items-start justify-start gap-4">
      <div
        className={`top-0 w-full ${certificatePdfLoader ? "fixed" : "hidden"}`}
      >
        <LinearProgress color="info" />
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-12">
        <h1 className="font-bold text-color-dark-primary">
          Sertifika Detayı: {id}
        </h1>
        <div className="flex w-full items-start justify-start gap-10 rounded-[25px] bg-color-white p-5 shadow-lg">
          <embed
            className="min-h-screen w-full rounded-[25px]"
            src={`data:application/pdf;base64,${certificatePdf}`}
          />
        </div>
      </div>
    </div>
  );
}

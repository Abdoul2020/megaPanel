import React, { ChangeEvent, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Alert } from "../../../../common/types/Alert";
import { authExpertUploadCertificatePdf } from "../../../../features/authExpert/authExpertAPI";
import {
  addAuthExpertCertificates,
  addAuthExpertObject,
} from "../../../../features/authExpert/authExpertSlice";
import { fetchCertificates } from "../../../../features/certificates/certificatesAPI";
import { updateAlert } from "../../../../features/options/optionsSlice";
import { getCookie } from "../../../../helpers/authExpertHelper";
import AlertHeaderWarning from "../../../Common/AlertHeaderWarning/AlertHeaderWarning";
import DashboardCertificateExpert from "./DashboardCertificateExpert/DashboardCertificateExpert";

type Props = {};

export default function DashboardCertificatesExpert({}: Props) {
  const dispatch = useAppDispatch();
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const authExpertCertificates = useAppSelector(
    (state) => state.authexpert.auth_expert_certificates
  );

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
        console.log({ authExpertCertificatesResponse });
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
  };
  useEffect(() => {
    async function postData() {
      const tokenExpert = getCookie("m_e_t");
      const uploadCertificatePdfResponse = await authExpertUploadCertificatePdf(
        tokenExpert,
        file
      );
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
        console.log({ uploadCertificatePdfResponse });
        const alert: Alert = {
          type: "danger",
          text: uploadCertificatePdfResponse.data.response.data.message,
          active: true,
          statusCode: 500,
        };
        dispatch(updateAlert(alert));
      }
    }
    if (file !== null) {
      postData();
    }
  }, [file]);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <div className="w-full bg-color-warning-primary rounded-[15px]">
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
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-12">
        <h1 className="text-color-dark-primary font-bold">Sertifikalarım</h1>
        <div className="w-full min-h-[85vh]  shadow-lg bg-color-white rounded-[25px] p-5">
          <ul className="w-full flex justify-start items-center flex-wrap gap-10">
            {authExpertCertificates.map((certificate) => {
              return (
                <DashboardCertificateExpert
                  key={certificate._id}
                  certificate={certificate}
                />
              );
            })}
            <div
              className="p-4 min-w-[190px]
      flex justify-center items-center gap-2
      hover:cursor-pointer"
            >
              <label htmlFor="pdf">
                <BsPlusLg
                  className="text-color-dark-primary opacity-80 text-[48px]
      hover:cursor-pointer"
                />
              </label>
              <input
                type="file"
                name="pdf"
                id="pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

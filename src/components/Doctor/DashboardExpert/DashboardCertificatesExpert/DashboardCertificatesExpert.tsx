import React from "react";
import { useAppSelector } from "../../../../app/hooks";
import DashboardCertificateExpert from "./DashboardCertificateExpert/DashboardCertificateExpert";

type Props = {};

export default function DashboardCertificatesExpert({}: Props) {
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  console.log(authExpertObject);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <div className="w-full flex flex-col justify-start items-start gap-12">
        <h1 className="text-color-dark-primary font-bold">Sertifikalarım</h1>
        <div className="w-full flex flex-col justify-start items-start shadow-lg bg-color-white rounded-[25px] p-5"></div>
      </div>
      <ul>
        {authExpertObject?.expert_certificates.map((certificate) => {
          return (
            <DashboardCertificateExpert
              key={certificate._id}
              certificate={certificate}
            />
          );
        })}
      </ul>
    </div>
  );
}

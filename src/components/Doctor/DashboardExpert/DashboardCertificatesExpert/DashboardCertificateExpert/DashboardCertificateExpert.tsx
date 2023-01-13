import React from "react";
import { Certificate } from "../../../../../common/types/Certificate.entity";

type Props = {
  key: string;
  certificate: Certificate;
};

export default function DashboardCertificateExpert(props: Props) {
  return (
    <div>
      <h1>{props.certificate.certificate_file_path}</h1>
    </div>
  );
}

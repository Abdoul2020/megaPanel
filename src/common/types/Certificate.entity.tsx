import { Doctor } from "./Doctor.entity";

export type Certificate = {
  _id: string;
  certificate_title: string;
  certificate_file_path: string;
  certificate_owner: Doctor;
  certificate_status: number;
  certificate_company: string;
};

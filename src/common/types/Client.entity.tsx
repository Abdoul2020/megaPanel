import { Doctor } from "./Doctor.entity";

export type Client = {
  _id: string;
  client_name: string;
  client_surname: string;
  client_email: string;
  client_role: string;
  client_avatar_path: string;
  client_creation_date: string;
  client_reference_from: Doctor;
};

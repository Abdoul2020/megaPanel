import { AppointmentType } from "./AppointmentType.entity";
import { Client } from "./Client.entity";
import { Doctor } from "./Doctor.entity";

export type Appointment = {
  _id: string;
  appointment_date?: string;
  appointment_time?: number;
  appointment_owner?: Doctor;
  appointment_client_client?: Client;
  appointment_client_expert?: Doctor;
  appointment_status?: number;
  appointment_type?: AppointmentType;
};

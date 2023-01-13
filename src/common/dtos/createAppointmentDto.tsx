import { AppointmentType } from "../types/AppointmentType.entity";
import { Client } from "../types/Client.entity";
import { Doctor } from "../types/Doctor.entity";

export interface CreateAppointmentDto {
  appointment_date?: string;
  appointment_time?: number;
  appointment_owner?: Doctor | null;
  appointment_client_client?: Client | null;
  appointment_client_expert?: Doctor | null;
  appointment_type?: AppointmentType;
  appointment_status?: string;
}

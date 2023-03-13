import { Branch } from "../../../types/Branch.entity";
import { AppointmentSchedule } from "../../../types/expert/AppointmentSchedule.entity";
import { Expertise } from "../../../types/Expertise.entity";
import { Title } from "../../../types/Title.entity";

export interface AuthExpertUpdateProfileDto {
  expert_name?: string;
  expert_surname?: string;
  expert_email?: string;
  expert_expertise?: Expertise;
  expert_title?: Title;
  expert_branch?: Branch[];
  expert_appointment_schedule?: AppointmentSchedule;
  expert_operating_type?: number;
  expert_company?: string;
  expert_physical_location?: string;
  expert_city?: string;
  expert_country?: string;
  expert_postal_code?: string;
  expert_session_fee?: string;
  expert_tel?: string;
  expert_about_me?: string;
  expert_socials?: String[];
  expert_additional_information?: string;
  expert_experience?: string;
  expert_training?: string;
  expert_account_type?: number;
}
